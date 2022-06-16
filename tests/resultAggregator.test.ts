import { assert, expect } from "chai";
import Fraction from "fraction.js";
import { sum, map } from "lodash-es";
import { ItemRarityProb, QualityProbabilityObject } from "../src/rarity.js";

import {
  TCResultAggregator,
  BaseItemResultAggregator,
  ProbabilityAggregation,
} from "../src/resultAggregator.js";

describe("TCResultAggregator", () => {
  it("should track individual probabilities", () => {
    const aggregator = new TCResultAggregator();
    aggregator.add("foo", new Fraction(1, 2));
    aggregator.add("bar", new Fraction(1, 3));
    const res = aggregator.result();
    expect(res).to.have.length(2);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(1 / 2);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(1 / 3);
  });

  it("should add probabilities for overlapping TCs", () => {
    const aggregator = new TCResultAggregator();
    aggregator.add("foo", new Fraction(1, 2));
    aggregator.add("foo", new Fraction(1, 3));
    const res = aggregator.result();
    expect(res).to.have.length(1);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(5 / 6);
  });

  it("should amplify positive picks", () => {
    const aggregator = new TCResultAggregator();
    aggregator.add("foo", new Fraction(1, 2));
    aggregator.add("bar", new Fraction(1, 3));
    aggregator.withPositivePicks(3);
    const res = aggregator.result();
    expect(res).to.have.length(2);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(7 / 8);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(19 / 27);
  });

  it("should amplify positive picks for 7 pick bosses", () => {
    const aggregator = new TCResultAggregator();
    aggregator.add("foo", new Fraction(1, 2));
    aggregator.add("bar", new Fraction(1, 3));
    aggregator.withPositivePicks(7);
    const res = aggregator.result();
    expect(res).to.have.length(2);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(92519 / 93312);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(131047 / 139968);
  });

  it("should combine negative picks", () => {
    const a1 = new TCResultAggregator();
    a1.add("foo", new Fraction(1, 2));
    a1.add("bar", new Fraction(1, 3));

    const a2 = new TCResultAggregator();
    a2.add("foo", new Fraction(1, 5));
    a2.add("baz", new Fraction(1, 6));

    a1.combineNegativePicks(a2);
    const res = a1.result();
    expect(res).to.have.length(3);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(1 / 2 + 1 / 5 - 1 / 10);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(1 / 3);
    expect(res[2][0]).to.eql("baz");
    expect(res[2][1].valueOf()).to.eql(1 / 6);
  });

  it("should simplify upon finalize", () => {
    const aggregator = new TCResultAggregator();
    aggregator.add("foo", new Fraction(1000000000000001, 2000000000000000));
    let res = aggregator.result();
    expect(res).to.have.length(1);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.not.eql(1 / 2);

    res = aggregator.finalize().result();
    expect(res).to.have.length(1);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(1 / 2);
  });
});

describe("BaseItemResultAggregator", () => {
  const validateRarity = function (
    obj: QualityProbabilityObject,
    sets: string[],
    uniques: string[]
  ) {
    const totalProb = sum(map(obj.quality, (p) => p.valueOf()));
    expect(totalProb).to.be.lessThanOrEqual(1);
    expect(obj.sets.length).to.eql(sets.length);
    if (sets.length > 0) {
      expect(map(obj.sets, 0)).to.eql(sets);
    }
    expect(obj.uniques.length).to.eql(uniques.length);
    if (uniques.length > 0) {
      expect(map(obj.uniques, 0)).to.eql(uniques);
    }
  };

  it("should track individual probabilities and compute rarities", () => {
    const aggregator = new BaseItemResultAggregator(99);
    aggregator.add("hax", new Fraction(1, 2));
    aggregator.add("scp", new Fraction(1, 3));
    const res = aggregator.result();
    expect(res).to.have.length(2);
    expect(res[0][0]).to.eql("hax");
    expect(res[0][1].valueOf()).to.eql(1 / 2);
    validateRarity(res[0][2], [], ["The Gnasher"]);
    expect(res[1][0]).to.eql("scp");
    expect(res[1][1].valueOf()).to.eql(1 / 3);
    validateRarity(res[1][2], [], ["Knell Striker"]);
  });

  it("should add probabilities for overlapping TCs", () => {
    const aggregator = new BaseItemResultAggregator(99);
    aggregator.add("foo", new Fraction(1, 2));
    aggregator.add("foo", new Fraction(1, 3));
    const res = aggregator.result();
    expect(res).to.have.length(1);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(5 / 6);
  });

  it("should amplify positive picks", () => {
    const aggregator = new BaseItemResultAggregator(99);
    aggregator.add("foo", new Fraction(1, 2));
    aggregator.add("bar", new Fraction(1, 3));
    aggregator.withPositivePicks(3);
    const res = aggregator.result();
    expect(res).to.have.length(2);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(7 / 8);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(19 / 27);
  });

  it("should amplify positive picks for 7 pick bosses", () => {
    const aggregator = new BaseItemResultAggregator(99);
    aggregator.add("foo", new Fraction(1, 2));
    aggregator.add("bar", new Fraction(1, 3));
    aggregator.withPositivePicks(7);
    const res = aggregator.result();
    expect(res).to.have.length(2);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(92519 / 93312);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(131047 / 139968);
  });

  it("should amplify expected values for positive picks", () => {
    const aggregator = new BaseItemResultAggregator(
      99,
      0,
      ProbabilityAggregation.EXPECTED_VALUE
    );
    aggregator.add("foo", new Fraction(1, 2));
    aggregator.add("bar", new Fraction(1, 3));
    aggregator.withPositivePicks(3);
    const res = aggregator.result();
    expect(res).to.have.length(2);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(3 / 2);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(1);
  });

  it("should combine negative picks", () => {
    const a1 = new BaseItemResultAggregator(99);
    a1.add("foo", new Fraction(1, 2));
    a1.add("bar", new Fraction(1, 3));

    const a2 = new BaseItemResultAggregator(99);
    a2.add("foo", new Fraction(1, 5));
    a2.add("baz", new Fraction(1, 6));

    a1.combineNegativePicks(a2);
    const res = a1.result();
    expect(res).to.have.length(3);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(1 / 2 + 1 / 5 - 1 / 10);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(1 / 3);
    expect(res[2][0]).to.eql("baz");
    expect(res[2][1].valueOf()).to.eql(1 / 6);
  });

  it("should add up expected values for negative picks", () => {
    const a1 = new BaseItemResultAggregator(
      99,
      0,
      ProbabilityAggregation.EXPECTED_VALUE
    );
    a1.add("foo", new Fraction(1, 2));
    a1.add("bar", new Fraction(1, 3));

    const a2 = new BaseItemResultAggregator(
      99,
      0,
      ProbabilityAggregation.EXPECTED_VALUE
    );
    a2.add("foo", new Fraction(1, 5));
    a2.add("baz", new Fraction(1, 6));

    a1.combineNegativePicks(a2);
    const res = a1.result();
    expect(res).to.have.length(3);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(1 / 2 + 1 / 5);
    expect(res[1][0]).to.eql("bar");
    expect(res[1][1].valueOf()).to.eql(1 / 3);
    expect(res[2][0]).to.eql("baz");
    expect(res[2][1].valueOf()).to.eql(1 / 6);
  });

  it("should track rarity correctly when combining negative picks", () => {
    const a1 = new BaseItemResultAggregator(99);
    a1.add("buc", new Fraction(1, 2), [1024, 1024, 1024, 1024]);
    const res1 = a1.result()[0];
    const prob1 = res1[1];
    const uniq1 = res1[2].quality[3];

    const a2 = new BaseItemResultAggregator(99);
    a2.add("buc", new Fraction(1, 5));
    const res2 = a2.result()[0];
    const prob2 = res2[1];
    const uniq2 = res2[2].quality[3];

    a1.combineNegativePicks(a2);
    const res = a1.result();
    expect(res).to.have.length(1);
    expect(res[0][0]).to.eql("buc");
    expect(res[0][1].valueOf()).to.eql(1 / 2 + 1 / 5 - 1 / 10);
    expect(res[0][2].quality[3].valueOf()).to.eql(
      prob1.mul(uniq1).add(prob2.mul(uniq2)).div(res[0][1]).valueOf()
    );
  });

  it("should simplify upon finalize", () => {
    const aggregator = new BaseItemResultAggregator(99);
    aggregator.add("foo", new Fraction(1000000000000001, 2000000000000000));
    let res = aggregator.result();
    expect(res).to.have.length(1);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.not.eql(1 / 2);

    res = aggregator.finalize().result();
    expect(res).to.have.length(1);
    expect(res[0][0]).to.eql("foo");
    expect(res[0][1].valueOf()).to.eql(1 / 2);
  });
});
