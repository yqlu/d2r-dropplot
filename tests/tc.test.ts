import { TCProbTuple, getAtomicTCs, getAdjustedDenom } from "../src/tc.js";
import Fraction from "fraction.js";
import { filter } from "lodash-es";

import { expect } from "chai";

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

describe("getAtomicTCs", () => {
  function assertTCExistWithChance(
    tcs: TCProbTuple[],
    tcName: string,
    chance: number
  ) {
    const tc = filter(tcs, (tcTuple) => tcTuple[0] == tcName);
    expect(tc.length).to.be.equal(1);
    expect(tc[0][1].inverse().valueOf()).to.be.approximately(chance, 1);
    return;
  }

  it("works on a basic TC with picks = 1", () => {
    const tcs = getAtomicTCs("Act 1 H2H B");
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
    const tcs = getAtomicTCs("Act 1 H2H B", 4, 4);
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

  it("works on a hell TC with picks = 1 and increased player count", () => {
    const tcsP1 = getAtomicTCs("Act 5 (H) H2H C", 1, 1);
    assertTCExistWithChance(tcsP1, "weap87", (92.308475 * 160) / 16);
    assertTCExistWithChance(tcsP1, "armo87", (174.334187 * 160) / 16);

    const tcsP8 = getAtomicTCs("Act 5 (H) H2H C", 8, 1);
    assertTCExistWithChance(tcsP8, "weap87", (92.308475 * 70) / 16);
    assertTCExistWithChance(tcsP8, "armo87", (174.334187 * 70) / 16);
  });
});
