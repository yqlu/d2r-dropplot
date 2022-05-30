import { assert, expect } from "chai";
import Fraction from "fraction.js";
import { map } from "lodash-es";

import { RARITY, ITEMTIER } from "../src/itemratio-dict.js";
import { computeQualityProb, computeAllQualityProb } from "../src/rarity.js";

describe("computeQualityProb", () => {
  it("should work for Hell Baal / Tyrael's Might example", () => {
    const prob = computeQualityProb("uar", RARITY.UNIQUE, 99, 300, 983);
    expect(prob.valueOf()).to.be.approximately(0.152936, 1e-3);
  });

  it("should work for Hell Baal / Death's Web example", () => {
    const prob = computeQualityProb("7gw", RARITY.UNIQUE, 99, 200, 983);
    expect(prob.valueOf()).to.be.approximately(0.136169, 1e-3);
  });

  it("should work for Spired Helm example", () => {
    const probU = computeQualityProb("uhm", RARITY.UNIQUE, 99, 200, 983);
    const probS = computeQualityProb("uhm", RARITY.SET, 99, 200, 983);
    expect(probU.valueOf()).to.be.approximately(0.138678, 1e-3);
    expect(probS.mul(new Fraction(1).sub(probU)).valueOf()).to.be.approximately(
      0.347,
      1e-3
    );
  });

  it("should work for Mephisto / Bverrit's Keep example", () => {
    const prob = computeQualityProb("tow", RARITY.UNIQUE, 26, 50, 983);
    expect(prob.valueOf()).to.be.approximately(0.0889, 1e-4);
  });
});

describe("computeAllQualityProb", () => {
  it("should work for Tower Shield in Normal Mephisto example", () => {
    let probs = computeAllQualityProb("tow", 26, 50, [1024, 983, 983, 983]);
    expect(probs[0].valueOf()).to.be.approximately(0.4411, 1e-4);
    expect(probs[1].valueOf()).to.be.approximately(0.2614, 1e-4);
    expect(probs[2].valueOf()).to.be.approximately(0.2086, 1e-4);
    expect(probs[3].valueOf()).to.be.approximately(0.0889, 1e-4);

    // Repeat with different MF percentage
    probs = computeAllQualityProb("tow", 26, 450, [1024, 983, 983, 983]);
    expect(probs[0].valueOf()).to.be.approximately(0.0361, 1e-4);
    expect(probs[1].valueOf()).to.be.approximately(0.3559, 1e-4);
    expect(probs[2].valueOf()).to.be.approximately(0.4441, 1e-4);
    expect(probs[3].valueOf()).to.be.approximately(0.1639, 1e-4);
  });
});
