import * as child from "child_process";
import Fraction from "fraction.js";
import { readFile } from "fs/promises";

import {
  BaseItemResultAggregator,
  BaseItemDistributionAggregator,
} from "../dist/resultAggregator.js";
import { makeLookupTcFunction, TcCalculator } from "../dist/tc.js";
import { TCDict } from "../dist/tc-dict.js";
import { AtomicDict } from "../dist/atomic-dict.js";

const treasureClasses = JSON.parse(
  await readFile(
    new URL(
      "../node_modules/d2-data/json/treasureclassex.json",
      import.meta.url
    )
  )
);

const items = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/items.json", import.meta.url)
  )
);

/*
Test accuracy of package against github.com/realmonster/diablo2_drop_calc
Caveats:
- need to use expected value
- need to ignore set / uniques bumping down if they don't exist

If so, validated consistency for P1 0MF except for
- Countess (should test against larger player counts)
- Duriel
- ROP / ROP (N) / ROP (H) --> need to account for Annihilus


test that if I break rarity aggregation, Hephesto or Griswold or Smith fail
*/

const ERROR = 1.001;
const ZERO = new Fraction(0);
const RARITY_MAPPING = [0, 2, 1, 3];
const PLAYER_COUNT = 8;

function format(str) {
  const res = {};
  for (var line of str.split("\n")) {
    const parts = line.split(" ");
    if (Number.isFinite(parseInt(parts[0]))) {
      let tc = parts[0];
      if (parts.length == 2) {
        res[parts[0]] = [
          new Fraction(parts[1].trim()),
          [ZERO, ZERO, ZERO, ZERO],
        ]; //parseFloat(parts[1]);
      } else if (parts.length == 3 && parseInt(parts[1]) >= 4) {
        // 4 = magic, 5 = set, 6 = rare, 7 = unique
        let idx = RARITY_MAPPING[parseInt(parts[1]) - 4];
        res[parts[0]][1][idx] = new Fraction(parts[2].trim()).div(
          res[parts[0]][0]
        );
      }
    }
  }
  return res;
}

function compute(tc, mlvl) {
  const compare = format(
    child
      .execSync(
        `python3 ../diablo2_drop_calc/113d/treasure_classes.py ${
          treasureClasses[tc].lineNumber + 161
        } ${mlvl} --fraction --players_mod ${PLAYER_COUNT} `
      )
      .toString()
  );

  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  const experiment = true;
  let tcs;
  if (experiment) {
    const tcCalculator = new TcCalculator(
      tcLookup,
      () => new BaseItemDistributionAggregator(mlvl, 0)
    );
    tcs = tcCalculator
      .getAtomicTCs(tc, PLAYER_COUNT, PLAYER_COUNT)
      .result()
      .map((tuple) => {
        tuple[1] = tuple[1].eval().expectation();
        return tuple;
      });
  } else {
    const tcCalculator = new TcCalculator(
      tcLookup,
      () => new BaseItemResultAggregator(mlvl, 0)
    );
    tcs = tcCalculator.getAtomicTCs(tc, PLAYER_COUNT, PLAYER_COUNT).result();
  }
  let passed = 0;
  let failed = 0;
  let errors = [];
  for (const [tc, prob, qualityObj] of tcs) {
    if (!items[tc]) {
      if (tc.substring(0, 3) != "gld") {
        errors.push(`Could not find ${tc}`);
      }
    } else {
      // First check base item probability
      const ratio = prob.div(compare[items[tc].classid][0]);
      if (Math.max(ratio.valueOf(), ratio.inverse().valueOf()) > ERROR) {
        failed += 1;
        // errors.push(`${tc} error of ${ratio.valueOf()}`);

        errors.push(
          `${tc} error of ${ratio.valueOf()} - ${prob.valueOf()} vs ${compare[
            items[tc].classid
          ][0].valueOf()}`
        );
      } else {
        // Now check item rarity
        let failedBefore = failed;
        // console.log(tc, qualityObj.quality, compare[items[tc].classid][1]);
        qualityObj.quality.forEach(function (qualityRatio, idx) {
          const rarity = ["Magic", "Rare", "Set", "Unique"][idx];
          const other = compare[items[tc].classid][1][idx];
          const error = `${tc} ${rarity} discrepancy of ${JSON.stringify(
            qualityRatio
          )} - ${JSON.stringify(other)}`;
          if (qualityRatio.valueOf() == 0) {
            if (other.valueOf() == 0) {
              return;
            }
            failed += 1;
            errors.push(error);
          } else if (other.valueOf() == 0) {
            failed += 1;
            errors.push(error);
          } else {
            const ratio = qualityRatio.div(other);
            if (Math.max(ratio.valueOf(), ratio.inverse().valueOf()) > ERROR) {
              failed += 1;
              errors.push(error);
            }
          }
        });
        if (failed == failedBefore) {
          passed += 1;
        }
      }
    }
  }
  if (Object.keys(compare).length > tcs.length) {
    errors.push(
      `More items (${Object.keys(compare).length} vs ${
        tcs.length
      }) in Python output.`
    );
  }
  return { passed, failed, errors };
}

function test(tc, mlvl) {
  let res = compute(tc, mlvl);
  if (res.errors.length > 0) {
    console.log(tc, res.errors.slice(0, 10));
  } else {
    console.log(`${tc} passed`);
  }
}

// test("Countess Item (H)", 99);

Object.keys(TCDict).forEach(function (tc, idx) {
  if (tc.substring(0, 3) === "Act") {
    return;
  }
  test(tc, 99);
});
