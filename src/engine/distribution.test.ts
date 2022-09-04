import { expect } from "chai";
import { describe, test as it } from "vitest";
import Fraction from "fraction.js";

import { ZERO, ONE } from "./polynomialOps";
import { Distribution } from "./distribution";

const f = (n: number, d: number = 1) => new Fraction(n, d);

describe("Atomic", () => {
  it("should reduce to Polynomial correctly", () => {
    const a = Distribution.Atomic(f(3, 5));
    expect(a.eval().coeffs).to.eql([f(2, 5), f(3, 5)]);
    expect(a.eval().expectation()).to.eql(f(3, 5));
    expect(a.eval().atLeastOneChance()).to.eql(f(3, 5));
  });

  it("can handle zero case correctly", () => {
    const a = Distribution.Atomic(ZERO);
    expect(a.eval().coeffs).to.eql([ONE]);
    expect(a.eval().expectation()).to.eql(ZERO);
    expect(a.eval().atLeastOneChance()).to.eql(ZERO);
  });
});

describe("Binomial", () => {
  it("should evaluate correctly when picks = 1", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Binomial(a, 1);
    expect(b.eval().coeffs).to.eql([f(2, 5), f(3, 5)]);
    expect(b.eval().expectation()).to.eql(f(3, 5));
    expect(b.eval().atLeastOneChance()).to.eql(f(3, 5));
  });

  it("should evaluate correctly when picks > 1", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Binomial(a, 2);
    expect(b.eval().coeffs).to.eql([f(4, 25), f(12, 25), f(9, 25)]);
    expect(b.eval().expectation()).to.eql(f(6, 5));
    expect(b.eval().atLeastOneChance()).to.eql(f(21, 25));

    const c = Distribution.Binomial(a, 3);
    expect(c.eval().expectation()).to.eql(f(9, 5));
    expect(c.eval().atLeastOneChance()).to.eql(f(117, 125));
  });

  it("should handle picks = 0 case", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Binomial(a, 0);
    expect(b.eval().coeffs).to.eql([ONE]);
    expect(b.eval().expectation()).to.eql(ZERO);
    expect(b.eval().atLeastOneChance()).to.eql(ZERO);
  });

  it("should handle zero dist case", () => {
    const a = Distribution.Atomic(ZERO);
    const b = Distribution.Binomial(a, 5);
    expect(b.eval().coeffs).to.eql([ONE]);
    expect(b.eval().expectation()).to.eql(ZERO);
    expect(b.eval().atLeastOneChance()).to.eql(ZERO);
  });
});

describe("Or", () => {
  it("should evaluate correctly with one tuple", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Or([[a, ONE]]);
    expect(b.eval().coeffs).to.eql([f(2, 5), f(3, 5)]);
    expect(b.eval().expectation()).to.eql(f(3, 5));
    expect(b.eval().atLeastOneChance()).to.eql(f(3, 5));

    const c = Distribution.Or([[a, f(1, 2)]]);
    expect(c.eval().coeffs).to.eql([f(7, 10), f(3, 10)]);
    expect(c.eval().expectation()).to.eql(f(3, 10));
    expect(c.eval().atLeastOneChance()).to.eql(f(3, 10));
  });

  it("should evaluate correctly with multiple non-zero tuples", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Atomic(f(8, 9));
    const c = Distribution.Or([
      [a, f(1, 3)],
      [b, f(1, 3)],
    ]);
    expect(c.eval().coeffs).to.eql([f(68, 135), f(67, 135)]);
    expect(c.eval().expectation()).to.eql(f(67, 135));
    expect(c.eval().atLeastOneChance()).to.eql(f(67, 135));
  });

  it("should evaluate correctly with multiple tuples, some zero", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Atomic(f(8, 9));
    const c = Distribution.Atomic(f(2, 7));
    const d = Distribution.Or([
      [a, f(1, 3)],
      [b, f(1, 3)],
      [c, ZERO],
    ]);
    expect(d.eval().coeffs).to.eql([f(68, 135), f(67, 135)]);
    expect(d.eval().expectation()).to.eql(f(67, 135));
    expect(d.eval().atLeastOneChance()).to.eql(f(67, 135));
  });

  it("should handle zero multiplier case", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Or([[a, ZERO]]);
    expect(b.eval().coeffs).to.eql([ONE]);
    expect(b.eval().expectation()).to.eql(ZERO);
    expect(b.eval().atLeastOneChance()).to.eql(ZERO);
  });

  it("should handle zero dist case", () => {
    const a = Distribution.Atomic(ZERO);
    const b = Distribution.Or([[a, ONE]]);
    expect(b.eval().coeffs).to.eql([ONE]);
    expect(b.eval().expectation()).to.eql(ZERO);
    expect(b.eval().atLeastOneChance()).to.eql(ZERO);
  });

  it("should handle empty argument case", () => {
    const a = Distribution.Or([]);
    expect(a.eval().coeffs).to.eql([ONE]);
    expect(a.eval().expectation()).to.eql(ZERO);
    expect(a.eval().atLeastOneChance()).to.eql(ZERO);
  });
});

describe("And", () => {
  it("should evaluate correctly with one tuple", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.And([a]);
    expect(b.eval().coeffs).to.eql([f(2, 5), f(3, 5)]);
    expect(b.eval().expectation()).to.eql(f(3, 5));
    expect(b.eval().atLeastOneChance()).to.eql(f(3, 5));
  });

  it("should evaluate correctly with two non-zero dists", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Atomic(f(8, 9));
    const c = Distribution.And([a, b]);
    expect(c.eval().coeffs).to.eql([f(2, 45), f(19, 45), f(8, 15)]);
    expect(c.eval().expectation()).to.eql(f(67, 45));
    expect(c.eval().atLeastOneChance()).to.eql(f(43, 45));
  });

  it("should evaluate correctly with some zero dists", () => {
    const a = Distribution.Atomic(f(3, 5));
    const b = Distribution.Atomic(ZERO);
    const c = Distribution.Atomic(f(8, 9));
    const d = Distribution.And([a, b, c]);
    expect(d.eval().coeffs).to.eql([f(2, 45), f(19, 45), f(8, 15)]);
    expect(d.eval().expectation()).to.eql(f(67, 45));
    expect(d.eval().atLeastOneChance()).to.eql(f(43, 45));
  });

  it("should handle empty argument case", () => {
    const a = Distribution.And([]);
    expect(a.eval().coeffs).to.eql([ONE]);
    expect(a.eval().expectation()).to.eql(ZERO);
    expect(a.eval().atLeastOneChance()).to.eql(ZERO);
  });
});
