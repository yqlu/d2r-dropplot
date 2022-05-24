import { TCProbTuple, getAtomicTCs } from "../src/tc.js";
import Fraction from "fraction.js";
import { filter } from "lodash-es";

import { expect } from "chai";

describe("getAtomicTCs", () => {
  function assertTCExistWithChance(
    tcs: TCProbTuple[],
    tcName: string,
    chance: number
  ) {
    const tc = filter(tcs, (tcTuple) => tcTuple[0] == tcName);
    console.log(tc);
    expect(tc.length).to.be.equal(1);
    expect(tc[0][1].inverse().valueOf()).to.be.approximately(chance, 1e-3);
    return;
  }

  it("works on Act 1 H2H B", () => {
    const tcs = getAtomicTCs("Act 1 H2H B");
    assertTCExistWithChance(tcs, "amu", 800.0);
    assertTCExistWithChance(tcs, "aqv", 60.952381);
    assertTCExistWithChance(tcs, "armo3", 66.666667);
    assertTCExistWithChance(tcs, "armo6", 28.571429);
    assertTCExistWithChance(tcs, "cm1", 1600.0);
    assertTCExistWithChance(tcs, "cm2", 1600.0);
    assertTCExistWithChance(tcs, "cm3", 1600.0);
    assertTCExistWithChance(tcs, "cqv", 60.952381);
    assertTCExistWithChance(tcs, "gcb", 1066.666667);
    assertTCExistWithChance(tcs, "gcg", 1066.666667);
    assertTCExistWithChance(tcs, "gcr", 1066.666667);
    assertTCExistWithChance(tcs, "gcv", 1066.666667);
    assertTCExistWithChance(tcs, "gcw", 1066.666667);
    assertTCExistWithChance(tcs, "gcy", 1066.666667);
    assertTCExistWithChance(tcs, "gld", 7.619048);
    assertTCExistWithChance(tcs, "gpl", 198.095238);
    assertTCExistWithChance(tcs, "hp1", 38.095238);
    assertTCExistWithChance(tcs, "hp2", 114.285714);
    assertTCExistWithChance(tcs, "isc", 132.063492);
    assertTCExistWithChance(tcs, "jew", 1600.0);
    assertTCExistWithChance(tcs, "key", 132.063492);
    assertTCExistWithChance(tcs, "mp1", 91.428571);
    assertTCExistWithChance(tcs, "mp2", 114.285714);
    assertTCExistWithChance(tcs, "opl", 198.095238);
    assertTCExistWithChance(tcs, "rin", 400.0);
    assertTCExistWithChance(tcs, "rvs", 457.142857);
    assertTCExistWithChance(tcs, "skc", 1600.0);
    assertTCExistWithChance(tcs, "tsc", 132.063492);
    assertTCExistWithChance(tcs, "vps", 114.285714);
    assertTCExistWithChance(tcs, "weap3", 66.666667);
    assertTCExistWithChance(tcs, "weap6", 28.571429);
  });

  it("works on Act 3 (H) Champ A", () => {
    const tcs = getAtomicTCs("Act 1 (H) H2H B");
    console.log(tcs);
    assertTCExistWithChance(tcs, "armo3", 1823.934398);
    assertTCExistWithChance(tcs, "armo6", 434.270095);
    assertTCExistWithChance(tcs, "armo9", 153.014631);
    assertTCExistWithChance(tcs, "armo12", 122.051285);
    assertTCExistWithChance(tcs, "armo15", 107.104778);
    assertTCExistWithChance(tcs, "armo18", 95.146344);
    assertTCExistWithChance(tcs, "armo21", 95.685673);
    assertTCExistWithChance(tcs, "armo24", 130.80586);
    assertTCExistWithChance(tcs, "armo27", 167.462149);
    assertTCExistWithChance(tcs, "armo30", 206.461938);
    assertTCExistWithChance(tcs, "armo33", 239.677085);
    assertTCExistWithChance(tcs, "armo36", 130.411582);
    assertTCExistWithChance(tcs, "armo39", 208.816621);
    assertTCExistWithChance(tcs, "armo42", 283.18059);
    assertTCExistWithChance(tcs, "armo45", 264.909398);
    assertTCExistWithChance(tcs, "armo48", 249.285062);
    assertTCExistWithChance(tcs, "armo51", 312.662207);
    assertTCExistWithChance(tcs, "armo54", 271.763213);
    assertTCExistWithChance(tcs, "armo57", 228.737807);
    assertTCExistWithChance(tcs, "armo60", 217.320219);
    assertTCExistWithChance(tcs, "armo63", 264.616442);
    assertTCExistWithChance(tcs, "armo66", 263.736386);
    assertTCExistWithChance(tcs, "armo69", 447.078485);
    assertTCExistWithChance(tcs, "armo72", 1645.945946);
    assertTCExistWithChance(tcs, "r01", 1436.185419);
    assertTCExistWithChance(tcs, "r02", 2154.278129);
    assertTCExistWithChance(tcs, "r03", 2585.133754);
    assertTCExistWithChance(tcs, "r04", 3877.700631);
    assertTCExistWithChance(tcs, "r05", 3693.04822);
    assertTCExistWithChance(tcs, "r06", 5539.572331);
    assertTCExistWithChance(tcs, "r07", 4431.657865);
    assertTCExistWithChance(tcs, "r08", 6647.486797);
    assertTCExistWithChance(tcs, "r09", 6330.939806);
    assertTCExistWithChance(tcs, "r10", 9496.40971);
    assertTCExistWithChance(tcs, "r11", 10359.719683);
    assertTCExistWithChance(tcs, "r12", 15539.579525);
    assertTCExistWithChance(tcs, "r13", 19628.942558);
    assertTCExistWithChance(tcs, "r14", 29443.413837);
    assertTCExistWithChance(tcs, "r15", 38196.861194);
    assertTCExistWithChance(tcs, "r16", 57295.29179);
    assertTCExistWithChance(tcs, "r17", 75347.233039);
    assertTCExistWithChance(tcs, "r18", 113020.84956);
    assertTCExistWithChance(tcs, "r19", 149655.1939);
    assertTCExistWithChance(tcs, "r20", 224482.790849);
    assertTCExistWithChance(tcs, "r21", 298274.711716);
    assertTCExistWithChance(tcs, "r22", 447412.067573);
    assertTCExistWithChance(tcs, "r23", 521076.099499);
    assertTCExistWithChance(tcs, "r24", 781614.149272);
    assertTCExistWithChance(tcs, "r25", 910979.424674);
    assertTCExistWithChance(tcs, "r26", 1366469.136942);
    assertTCExistWithChance(tcs, "r27", 1593310.755935);
    assertTCExistWithChance(tcs, "r28", 2389966.133902);
    assertTCExistWithChance(tcs, "r29", 2787365.079379);
    assertTCExistWithChance(tcs, "r30", 4181047.618422);
    assertTCExistWithChance(tcs, "weap3", 911.967199);
    assertTCExistWithChance(tcs, "weap6", 217.135047);
    assertTCExistWithChance(tcs, "weap9", 76.507315);
    assertTCExistWithChance(tcs, "weap12", 61.025642);
    assertTCExistWithChance(tcs, "weap15", 53.552389);
    assertTCExistWithChance(tcs, "weap18", 47.573172);
    assertTCExistWithChance(tcs, "weap21", 47.842837);
    assertTCExistWithChance(tcs, "weap24", 65.40293);
    assertTCExistWithChance(tcs, "weap27", 83.731075);
    assertTCExistWithChance(tcs, "weap30", 82.090311);
    assertTCExistWithChance(tcs, "weap33", 65.89508);
    assertTCExistWithChance(tcs, "weap36", 69.642043);
    assertTCExistWithChance(tcs, "weap39", 104.40831);
    assertTCExistWithChance(tcs, "weap42", 141.590295);
    assertTCExistWithChance(tcs, "weap45", 132.454699);
    assertTCExistWithChance(tcs, "weap48", 124.642531);
    assertTCExistWithChance(tcs, "weap51", 156.331104);
    assertTCExistWithChance(tcs, "weap54", 135.881606);
    assertTCExistWithChance(tcs, "weap57", 114.368903);
    assertTCExistWithChance(tcs, "weap60", 108.66011);
    assertTCExistWithChance(tcs, "weap63", 132.308221);
    assertTCExistWithChance(tcs, "weap66", 131.868193);
    assertTCExistWithChance(tcs, "weap69", 223.539242);
    assertTCExistWithChance(tcs, "weap72", 822.972973);
  });
});
