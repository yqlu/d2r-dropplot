import { range, sum, map, max, clone, reduce } from "lodash-es";
import { readFile } from "fs/promises";
import Fraction from "fraction.js";
const json = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/atomic.json", import.meta.url)
  )
);

const atomicDict = {};

for (var entry of Object.entries(json)) {
  const atomicTc = entry[0];
  const items = entry[1];
  if (Object.entries(items).length == 0) {
    continue;
  }
  for (var [itemCode, itemProb] of Object.entries(items)) {
    items[itemCode] = new Fraction(itemProb).simplify(1e-5);
  }
  const denom = max(
    map(Object.values(items), (prob) => {
      return prob.inverse().valueOf();
    })
  );
  atomicDict[atomicTc] = {
    nodrop: 0,
    picks: 1,
    qualityRatios: [0, 0, 0, 0],
    tcs: map(Object.entries(items), (entry) => [
      entry[0],
      entry[1].mul(denom).valueOf(),
    ]),
  };
}

// This becomes src/atomic-dict.ts
console.log(JSON.stringify(atomicDict));
