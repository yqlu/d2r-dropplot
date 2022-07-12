import Fraction from "fraction.js";
import { map, sum } from "lodash-es";
import { expect } from "chai";
import { describe, test as it } from "vitest";

import { RARITY } from "./itemratio-dict";
import {
  computeQualityProb,
  computeQualityProbsHelper,
  computeQualityProbs,
} from "./rarity";

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

  it("should work for for set / unique rings / ammys which have qlvl = 1", () => {
    // Act 2 Champ A, mlvl = 16
    expect(
      computeQualityProb("rin", RARITY.UNIQUE, 16, 0, 800).valueOf()
    ).to.be.approximately(0.011874, 1e-5);
    expect(
      computeQualityProb("rin", RARITY.SET, 16, 0, 800).valueOf()
    ).to.be.approximately(0.029878, 1e-5);

    // Act 5 (H) Champ A, mlvl = 82
    expect(
      computeQualityProb("rin", RARITY.UNIQUE, 82, 0, 800).valueOf()
    ).to.be.approximately(0.014330498, 1e-5);
    expect(
      computeQualityProb("rin", RARITY.SET, 82, 0, 800).valueOf()
    ).to.be.approximately(0.0380952, 1e-5);
  });
});

describe("computeQualityProbsHelper", () => {
  it("should work for Tower Shield in Normal Mephisto example", () => {
    let probs = computeQualityProbsHelper("tow", 26, 50, [1024, 983, 983, 983]);
    expect(probs[0].valueOf()).to.be.approximately(0.4411, 1e-4);
    expect(probs[1].valueOf()).to.be.approximately(0.2614, 1e-4);
    expect(probs[2].valueOf()).to.be.approximately(0.2086, 1e-4);
    expect(probs[3].valueOf()).to.be.approximately(0.0889, 1e-4);

    // Repeat with different MF percentage
    probs = computeQualityProbsHelper("tow", 26, 450, [1024, 983, 983, 983]);
    expect(probs[0].valueOf()).to.be.approximately(0.0361, 1e-4);
    expect(probs[1].valueOf()).to.be.approximately(0.3559, 1e-4);
    expect(probs[2].valueOf()).to.be.approximately(0.4441, 1e-4);
    expect(probs[3].valueOf()).to.be.approximately(0.1639, 1e-4);
  });
});

describe("computeQualityProbs", () => {
  it("should return object of expected format", () => {
    let res = computeQualityProbs("uar", 99, 300, [1024, 983, 983, 983]);
    expect(res.quality[0].valueOf()).to.be.approximately(0.088, 1e-4);
    expect(res.quality[1].valueOf()).to.be.approximately(0.3635, 1e-4);
    expect(res.quality[2].valueOf()).to.be.approximately(0.3959, 1e-4);
    expect(res.quality[3].valueOf()).to.be.approximately(0.1526, 1e-4);

    // One set candidate
    expect(res.sets.length).to.equal(1);
    expect(res.sets[0][0]).to.equal("Immortal King's Soul Cage");
    expect(res.sets[0][1].valueOf()).to.eql(1);

    // Two unique candidates
    expect(res.uniques.length).to.equal(2);
    expect(res.uniques[0][0]).to.equal("Tyrael's Might");
    expect(res.uniques[0][1].valueOf()).to.eql(1 / 9);
    expect(res.uniques[1][0]).to.equal("Templar's Might");
    expect(res.uniques[1][1].valueOf()).to.eql(8 / 9);
  });

  it("should take into account qlvl of uniques and sets -- Pindleskin cannot drop Tyrael's", () => {
    let res = computeQualityProbs("uar", 85, 300, [1024, 972, 654, 512]);
    // One set candidate
    expect(res.sets.length).to.equal(1);
    expect(res.sets[0][0]).to.equal("Immortal King's Soul Cage");
    expect(res.sets[0][1].valueOf()).to.eql(1);

    // One unique candidate
    expect(res.uniques.length).to.equal(1);
    expect(res.uniques[0][0]).to.equal("Templar's Might");
    expect(res.uniques[0][1].valueOf()).to.eql(1);
  });

  it("should take into account qlvl of uniques and sets -- Pindleskin cannot drop Arachnid's", () => {
    let res = computeQualityProbs("ulc", 85, 300, [1024, 972, 654, 512]);
    // No set candidates
    expect(res.sets.length).to.equal(0);

    // No unique candidates
    expect(res.sets.length).to.equal(0);
  });

  it("should take into account for base items that do not have a set or unique version", () => {
    // Falchion with normal Mephisto
    let res = computeQualityProbs("flc", 26, 300, [1024, 983, 983, 983]);
    expect(res.quality[0].valueOf()).to.be.approximately(0.4837, 1e-4);
    expect(res.quality[1].valueOf()).to.be.approximately(0.3634, 1e-4);
    expect(res.quality[2].valueOf()).to.be.approximately(0, 1e-4);
    expect(res.quality[3].valueOf()).to.be.approximately(0.1529, 1e-4);

    // No set candidates
    expect(res.sets.length).to.equal(0);

    // One unique candidate - Gleamscythe
    expect(res.uniques.length).to.equal(1);
    expect(res.uniques[0][0]).to.equal("Gleamscythe");
    expect(res.uniques[0][1].valueOf()).to.eql(1);

    // Cantor Trophy with hell Mephisto
    res = computeQualityProbs("ne9", 87, 300, [1024, 983, 983, 983]);
    expect(res.quality[0].valueOf()).to.be.approximately(0.0025, 1e-4);
    expect(res.quality[1].valueOf()).to.be.approximately(0.5754, 1e-4);
    expect(res.quality[2].valueOf()).to.be.approximately(0.4221, 1e-4);
    expect(res.quality[3].valueOf()).to.be.approximately(0, 1e-4);

    // One set candidate - Trang Oul's Wing
    expect(res.sets.length).to.equal(1);
    expect(res.sets[0][0]).to.equal("Trang-Oul's Wing");
    expect(res.sets[0][1].valueOf()).to.eql(1);

    // No unique candidates
    expect(res.uniques.length).to.equal(0);
  });

  it("should handle rings and amulets properly", () => {
    // Rings
    let res = computeQualityProbs("rin", 49, 300, [0, 0, 0, 0]);
    // Check that magic / rare / set / unique are all possible, and that
    // since rings must be at least magic, all quality probabilities add up to 1
    res.quality.forEach((p) => expect(p.valueOf()).to.be.greaterThan(0));
    expect(sum(map(res.quality, (p) => p.valueOf()))).to.equal(1);

    // Check eligible set rings and relative probabilities
    expect(res.sets).to.have.length(2);
    expect(map(res.sets, 0)).to.eql(["Angelic Halo", "Cathan's Seal"]);
    expect(res.sets[0][1].valueOf()).to.be.approximately(3 / 10, 1e-3);
    expect(res.sets[1][1].valueOf()).to.be.approximately(7 / 10, 1e-3);

    // Check eligible unique rings and relative probabilities
    expect(res.uniques).to.have.length(3);
    expect(map(res.uniques, 0)).to.eql([
      "Nagelring",
      "Manald Heal",
      "The Stone of Jordan",
    ]);
    expect(res.uniques[0][1].valueOf()).to.be.approximately(15 / 31, 1e-3);
    expect(res.uniques[1][1].valueOf()).to.be.approximately(15 / 31, 1e-3);
    expect(res.uniques[2][1].valueOf()).to.be.approximately(1 / 31, 1e-3);

    // Amulets
    res = computeQualityProbs("amu", 49, 300, [0, 0, 0, 0]);
    // Check that magic / rare / set / unique are all possible, and that
    // since rings must be at least magic, all quality probabilities add up to 1
    res.quality.forEach((p) => expect(p.valueOf()).to.be.greaterThan(0));
    expect(sum(map(res.quality, (p) => p.valueOf()))).to.equal(1);
  });

  it("should handle charms properly", () => {
    // Small charms
    let res = computeQualityProbs("cm1", 99, 300, [1024, 983, 983, 983]);
    // Check that it can only be magical
    expect(res.quality[0].valueOf()).to.equal(1);
    expect(sum(map(res.quality, (p) => p.valueOf()))).to.equal(1);

    // Large charms
    res = computeQualityProbs("cm2", 99, 300, [1024, 983, 983, 983]);
    // Check that it can only be magical
    expect(res.quality[0].valueOf()).to.equal(1);
    expect(sum(map(res.quality, (p) => p.valueOf()))).to.equal(1);

    // Grand charms
    res = computeQualityProbs("cm3", 99, 300, [1024, 983, 983, 983]);
    // Check that it can only be magical or unique
    expect(res.quality[0].add(res.quality[3]).valueOf()).to.equal(1);
    expect(sum(map(res.quality, (p) => p.valueOf()))).to.equal(1);
    expect(res.uniques[0][0]).to.equal("Gheed's Fortune");
    // TODO: relative chance of Gheed's doesn't match existing drop calculators
  });

  it("should handle normal-only items", () => {
    let res = computeQualityProbs("opl", 99, 300, [1024, 983, 983, 983]);
    res.quality.forEach((p) => expect(p.valueOf()).to.equal(0));
  });
});
