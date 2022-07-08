import { makeLookupTcFunction, TcCalculator, getAdjustedDenom } from "./tc";
import { TCDict, TCDictType } from "./tc-dict";
import { filter } from "lodash-es";

import { expect } from "chai";
import { TCProbTuple, TCResultAggregator } from "./resultAggregator";

describe("getAdjustedDenom", () => {
  it("works with base cases", () => {
    expect(getAdjustedDenom(0, 15)).to.equal(15);
    expect(getAdjustedDenom(50, 15)).to.equal(50 + 15);
  });

  it("works with increased party size", () => {
    // Increase party count and total player count in tandem
    // Mephisto test cases
    expect(getAdjustedDenom(65, 15, 1, 1)).to.equal(80);
    expect(getAdjustedDenom(65, 15, 2, 2)).to.equal(67);
    expect(getAdjustedDenom(65, 15, 3, 3)).to.equal(65);

    // Act 1 H2H A examples
    expect(getAdjustedDenom(60, 100, 1, 1)).to.equal(160);
    expect(getAdjustedDenom(60, 100, 2, 2)).to.equal(98);
    expect(getAdjustedDenom(60, 100, 3, 3)).to.equal(79);
    expect(getAdjustedDenom(60, 100, 4, 4)).to.equal(70);
    expect(getAdjustedDenom(60, 100, 5, 5)).to.equal(66);
    expect(getAdjustedDenom(60, 100, 6, 6)).to.equal(63);
    expect(getAdjustedDenom(60, 100, 7, 7)).to.equal(62);
    expect(getAdjustedDenom(60, 100, 8, 8)).to.equal(61);
  });

  it("works with increased total player count", () => {
    // Hold party size const at 1
    // Mephisto test cases
    expect(getAdjustedDenom(65, 15, 2, 1)).to.equal(80);
    expect(getAdjustedDenom(65, 15, 3, 1)).to.equal(67);

    // Act 1 H2H A examples
    expect(getAdjustedDenom(60, 100, 2, 1)).to.equal(160);
    expect(getAdjustedDenom(60, 100, 3, 1)).to.equal(98);
    expect(getAdjustedDenom(60, 100, 4, 1)).to.equal(98);
    expect(getAdjustedDenom(60, 100, 5, 1)).to.equal(79);
    expect(getAdjustedDenom(60, 100, 6, 1)).to.equal(79);
    expect(getAdjustedDenom(60, 100, 7, 1)).to.equal(70);
    expect(getAdjustedDenom(60, 100, 8, 1)).to.equal(70);
  });
});

describe("TCDict invariants", () => {
  it("Duriel* are the only >1 pick TCs with sub TCs with picks > 1", () => {
    for (var [tcName, tcObject] of Object.entries(TCDict)) {
      if (tcObject.picks > 1) {
        for (var subTCObj of tcObject.tcs) {
          if (
            TCDict.hasOwnProperty(subTCObj[0]) &&
            TCDict[subTCObj[0]].picks != 1
          ) {
            expect(tcName.substring(0, 6)).eql("Duriel");
          }
        }
      }
    }
  });

  it("Negative TCs always have zero nodrop and two children", () => {
    for (var [tcName, tcObject] of Object.entries(TCDict)) {
      if (tcObject.picks < 0) {
        expect(tcObject.nodrop).to.equal(0);
        expect(tcObject.tcs.length).to.equal(2);
      }
    }
  });

  it("Countess* are the only <0 pick TCs with variable drops", () => {
    for (var [tcName, tcObject] of Object.entries(TCDict)) {
      if (tcObject.picks < 0) {
        // Countess* are the only TCs with negative picks where
        // - the first TC has a positive number of picks
        // - the first TC has a non-zero nodrop
        // (aka variable number of items can drop from the first TC)
        const firstSubTc = tcObject.tcs[0][0];
        if (TCDict[firstSubTc].nodrop > 0) {
          expect(tcName.substring(0, 8)).eql("Countess");
        }
        if (TCDict[firstSubTc].picks != 1) {
          expect(tcName.substring(0, 8)).eql("Countess");
        }
      }
    }
  });
});

describe("TcCalculator", () => {
  function assertTCExistWithChance(
    tcs: TCProbTuple[],
    tcName: string,
    chance: number
  ) {
    const tc = filter(tcs, (tcTuple) => tcTuple[0] == tcName);
    expect(tc.length).to.be.equal(1, tcName);
    expect(tc[0][1].inverse().valueOf()).to.be.approximately(
      chance,
      1,
      `${tc[0][0]} ${tc[0][1]}`
    );
    return;
  }

  const aggregatorFactory = () => new TCResultAggregator();
  const tcLookupNoAtomic = makeLookupTcFunction(TCDict, {} as TCDictType);
  const tcCalculatorNoAtomic = new TcCalculator<TCProbTuple[]>(
    tcLookupNoAtomic,
    aggregatorFactory
  );
  const calculateTcNoAtomic = function (
    tc: string,
    totalPlayers?: number,
    playerCount?: number,
    filter?: Set<string>
  ) {
    const resultAggregator = tcCalculatorNoAtomic.getAtomicTCs(
      tc,
      totalPlayers,
      playerCount,
      filter
    );
    return resultAggregator.result();
  };

  it("works on a basic TC with picks = 1", () => {
    // Check against Amazon Basin
    const tcs = calculateTcNoAtomic("Act 1 H2H B");
    assertTCExistWithChance(tcs, "amu", 800);
    assertTCExistWithChance(tcs, "aqv", 61);
    assertTCExistWithChance(tcs, "armo3", 67);
    assertTCExistWithChance(tcs, "armo6", 29);
    assertTCExistWithChance(tcs, "cm1", 1600);
    assertTCExistWithChance(tcs, "cm2", 1600);
    assertTCExistWithChance(tcs, "cm3", 1600);
    assertTCExistWithChance(tcs, "cqv", 61);
    assertTCExistWithChance(tcs, "gcb", 1067);
    assertTCExistWithChance(tcs, "gcg", 1067);
    assertTCExistWithChance(tcs, "gcr", 1067);
    assertTCExistWithChance(tcs, "gcv", 1067);
    assertTCExistWithChance(tcs, "gcw", 1067);
    assertTCExistWithChance(tcs, "gcy", 1067);
    assertTCExistWithChance(tcs, "gld", 8);
    assertTCExistWithChance(tcs, "gpl", 198);
    assertTCExistWithChance(tcs, "hp1", 38);
    assertTCExistWithChance(tcs, "hp2", 114);
    assertTCExistWithChance(tcs, "isc", 132);
    assertTCExistWithChance(tcs, "jew", 1600);
    assertTCExistWithChance(tcs, "key", 132);
    assertTCExistWithChance(tcs, "mp1", 91);
    assertTCExistWithChance(tcs, "mp2", 114);
    assertTCExistWithChance(tcs, "opl", 198);
    assertTCExistWithChance(tcs, "rin", 400);
    assertTCExistWithChance(tcs, "rvs", 457);
    assertTCExistWithChance(tcs, "skc", 1600);
    assertTCExistWithChance(tcs, "tsc", 132);
    assertTCExistWithChance(tcs, "vps", 114);
    assertTCExistWithChance(tcs, "weap3", 67);
    assertTCExistWithChance(tcs, "weap6", 29);
  });

  it("works on a basic TC with picks = 1 and increased player count", () => {
    // Check against Silospen
    const tcs = calculateTcNoAtomic("Act 1 H2H B", 4, 4);
    assertTCExistWithChance(tcs, "amu", 350);
    assertTCExistWithChance(tcs, "aqv", 27);
    assertTCExistWithChance(tcs, "armo3", 29);
    assertTCExistWithChance(tcs, "armo6", 13);
    assertTCExistWithChance(tcs, "cm1", 700);
    assertTCExistWithChance(tcs, "cm2", 700);
    assertTCExistWithChance(tcs, "cm3", 700);
    assertTCExistWithChance(tcs, "cqv", 27);
    assertTCExistWithChance(tcs, "gcb", 467);
    assertTCExistWithChance(tcs, "gcg", 467);
    assertTCExistWithChance(tcs, "gcr", 467);
    assertTCExistWithChance(tcs, "gcv", 467);
    assertTCExistWithChance(tcs, "gcw", 467);
    assertTCExistWithChance(tcs, "gcy", 467);
    assertTCExistWithChance(tcs, "gld", 3);
    assertTCExistWithChance(tcs, "gpl", 87);
    assertTCExistWithChance(tcs, "hp1", 17);
    assertTCExistWithChance(tcs, "hp2", 50);
    assertTCExistWithChance(tcs, "isc", 58);
    assertTCExistWithChance(tcs, "jew", 700);
    assertTCExistWithChance(tcs, "key", 58);
    assertTCExistWithChance(tcs, "mp1", 40);
    assertTCExistWithChance(tcs, "mp2", 50);
    assertTCExistWithChance(tcs, "opl", 87);
    assertTCExistWithChance(tcs, "rin", 175);
    assertTCExistWithChance(tcs, "rvs", 200);
    assertTCExistWithChance(tcs, "skc", 700);
    assertTCExistWithChance(tcs, "tsc", 58);
    assertTCExistWithChance(tcs, "vps", 50);
    assertTCExistWithChance(tcs, "weap3", 29);
    assertTCExistWithChance(tcs, "weap6", 13);
  });

  it("works on a TC with >1 picks", () => {
    const tcs1 = calculateTcNoAtomic("Act 1 Cpot A");
    assertTCExistWithChance(tcs1, "hp1", 289 / 208);
    assertTCExistWithChance(tcs1, "hp2", 289 / 93);
    assertTCExistWithChance(tcs1, "mp1", 289 / 93);
    assertTCExistWithChance(tcs1, "mp2", 289 / 64);
    assertTCExistWithChance(tcs1, "rvs", 289 / 33);

    // Radament rune drop rates are Act 3 Good rune rates amplified by 5 picks
    const tcs2 = calculateTcNoAtomic("Radament");
    assertTCExistWithChance(tcs2, "r01", 461);
    assertTCExistWithChance(tcs2, "r02", 692);
    assertTCExistWithChance(tcs2, "r03", 185);
    assertTCExistWithChance(tcs2, "r04", 277);
    assertTCExistWithChance(tcs2, "r05", 132);
    assertTCExistWithChance(tcs2, "r06", 198);
    assertTCExistWithChance(tcs2, "r07", 251);
    assertTCExistWithChance(tcs2, "r08", 376);
  });

  it("works on a hell TC with picks = 1 and increased player count", () => {
    // Check against Item Generation Guide working example
    const tcsP1 = calculateTcNoAtomic("Act 5 (H) H2H C", 1, 1);
    assertTCExistWithChance(tcsP1, "weap87", (92.308475 * 160) / 16);
    assertTCExistWithChance(tcsP1, "armo87", (174.334187 * 160) / 16);

    const tcsP8 = calculateTcNoAtomic("Act 5 (H) H2H C", 8, 1);
    assertTCExistWithChance(tcsP8, "weap87", (92.308475 * 70) / 16);
    assertTCExistWithChance(tcsP8, "armo87", (174.334187 * 70) / 16);
  });

  it("works on TCs with negative picks", () => {
    const tcs = calculateTcNoAtomic("Act 1 Super A", 1, 1);
    // Act 1 Super A gets 2 picks from Act 1 Uitem A
    assertTCExistWithChance(tcs, "weap3", 3844 / 2755);
    assertTCExistWithChance(tcs, "armo3", 3844 / 2755);
    assertTCExistWithChance(tcs, "rin", 24025 / 616);
    assertTCExistWithChance(tcs, "amu", 24025 / 309);
    assertTCExistWithChance(tcs, "jew", 96100 / 619);
    // Act 1 Super A also gets 2 picks from Act 1 Cpot A (aka 4 potions in total)
    assertTCExistWithChance(tcs, "hp1", 83521 / 76960);
    assertTCExistWithChance(tcs, "hp2", 83521 / 45105);
    assertTCExistWithChance(tcs, "mp1", 83521 / 45105);
    assertTCExistWithChance(tcs, "mp2", 83521 / 32896);
  });

  // it.only("works on Griswold", () => {
  //   const tcs = calculateTcNoAtomic("Griswold", 1, 1);
  // });

  it("works on TCs with negative picks and different player counts", () => {
    // Copy of test above -- since negative pick TCs don't have nodrop, player counts don't affect droprates
    const tcs = calculateTcNoAtomic("Act 1 Super A", 4, 4);
    // Act 1 Super A gets 2 picks from Act 1 Uitem A
    assertTCExistWithChance(tcs, "weap3", 3844 / 2755);
    assertTCExistWithChance(tcs, "armo3", 3844 / 2755);
    assertTCExistWithChance(tcs, "rin", 24025 / 616);
    assertTCExistWithChance(tcs, "amu", 24025 / 309);
    assertTCExistWithChance(tcs, "jew", 96100 / 619);
    // Act 1 Super A also gets 2 picks from Act 1 Cpot A (aka 4 potions in total)
    assertTCExistWithChance(tcs, "hp1", 83521 / 76960);
    assertTCExistWithChance(tcs, "hp2", 83521 / 45105);
    assertTCExistWithChance(tcs, "mp1", 83521 / 45105);
    assertTCExistWithChance(tcs, "mp2", 83521 / 32896);
  });

  it("works on TCs with negative picks and inconsistent sums", () => {
    const tcs = calculateTcNoAtomic("Act 1 Champ A", 1, 1);
    // Act 1 Champ A should only get 1 pick from Act 1 Cpot A (aka 2 potions in total)
    assertTCExistWithChance(tcs, "hp1", 289 / 208);
    assertTCExistWithChance(tcs, "hp2", 289 / 93);
    assertTCExistWithChance(tcs, "mp1", 289 / 93);
    assertTCExistWithChance(tcs, "mp2", 289 / 64);
  });

  // it("works on Countess", () => {
  //   const tcs = getAtomicTCs("Countess (H)", 8, 8);
  // });

  it("works on boss TCs with picks = 7", () => {
    const tcs = calculateTcNoAtomic("Andarielq", 8, 8);
    // Without the special picks == 7 calculation, these numbers would have been
    // 19 / 28 / 34 / 51 instead (more likely to drop).
    assertTCExistWithChance(tcs, "r01", 22);
    assertTCExistWithChance(tcs, "r02", 33);
    assertTCExistWithChance(tcs, "r03", 40);
    assertTCExistWithChance(tcs, "r04", 60);
  });

  it("works on boss TCs with picks = 7", () => {
    const tcs = calculateTcNoAtomic("Andarielq", 8, 8);
    // Without the special picks == 7 calculation, these numbers would have been
    // 19 / 28 / 34 / 51 instead (more likely to drop).
    assertTCExistWithChance(tcs, "r01", 22);
    assertTCExistWithChance(tcs, "r02", 33);
    assertTCExistWithChance(tcs, "r03", 40);
    assertTCExistWithChance(tcs, "r04", 60);
  });

  it("works on Hell boss TCs with picks = 7", () => {
    // Same check on above, just on a more complex TC for sanity checking
    // These numbers match Silospen, but not maxroll...
    const tcs = calculateTcNoAtomic("Mephistoq (H)", 8, 8);
    assertTCExistWithChance(tcs, "r01", 1253);
    assertTCExistWithChance(tcs, "r02", 1879);
    assertTCExistWithChance(tcs, "r03", 501);
    assertTCExistWithChance(tcs, "r04", 752);
    assertTCExistWithChance(tcs, "r05", 358);
    assertTCExistWithChance(tcs, "r06", 537);
    assertTCExistWithChance(tcs, "r07", 251);
    assertTCExistWithChance(tcs, "r08", 376);
    assertTCExistWithChance(tcs, "r09", 251);
    assertTCExistWithChance(tcs, "r10", 376);
    assertTCExistWithChance(tcs, "r11", 325);
    assertTCExistWithChance(tcs, "r12", 487);
    assertTCExistWithChance(tcs, "r13", 541);
    assertTCExistWithChance(tcs, "r14", 811);
    assertTCExistWithChance(tcs, "r15", 973);
    assertTCExistWithChance(tcs, "r16", 1459);
    assertTCExistWithChance(tcs, "r17", 1843);
    assertTCExistWithChance(tcs, "r18", 2765);
    assertTCExistWithChance(tcs, "r19", 3587);
  });

  it("takes the max over quality ratios when recursing", () => {
    const tcs = calculateTcNoAtomic("Act 1 Super A", 1, 1);
    // TODO -- this should use 1024, 972, 800, 800
  });

  describe("getAtomicTCs filtering", () => {
    it("works on a basic TC with picks = 1", () => {
      const tcs = calculateTcNoAtomic(
        "Act 1 H2H B",
        1,
        1,
        new Set(["amu", "tsc", "vps", "weap3"])
      );
      expect(tcs.length).to.equal(4);
      assertTCExistWithChance(tcs, "amu", 800);
      assertTCExistWithChance(tcs, "tsc", 132);
      assertTCExistWithChance(tcs, "vps", 114);
      assertTCExistWithChance(tcs, "weap3", 67);
    });

    it("works on a basic TC with picks = 1 and increased player count", () => {
      const tcs = calculateTcNoAtomic(
        "Act 1 H2H B",
        4,
        4,
        new Set(["amu", "tsc", "vps", "weap3"])
      );
      expect(tcs.length).to.equal(4);
      assertTCExistWithChance(tcs, "amu", 350);
      assertTCExistWithChance(tcs, "tsc", 58);
      assertTCExistWithChance(tcs, "vps", 50);
      assertTCExistWithChance(tcs, "weap3", 29);
    });

    it("works on a TC with >1 picks", () => {
      const tcs = calculateTcNoAtomic(
        "Radament",
        1,
        1,
        new Set(["r03", "r04"])
      );
      expect(tcs.length).to.equal(2);
      assertTCExistWithChance(tcs, "r03", 185);
      assertTCExistWithChance(tcs, "r04", 277);
    });

    it("works on a TC with negative picks", () => {
      const tcs = calculateTcNoAtomic(
        "Act 1 Super A",
        4,
        4,
        new Set(["rin", "amu"])
      );
      expect(tcs.length).to.equal(2);
      assertTCExistWithChance(tcs, "rin", 24025 / 616);
      assertTCExistWithChance(tcs, "amu", 24025 / 309);
    });
  });
});

function debug(tcs: TCProbTuple[]) {
  for (var tc of tcs) {
    console.log(tc[0], tc[1].inverse().valueOf());
  }
}
