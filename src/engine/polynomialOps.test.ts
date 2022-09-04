import { expect } from "chai";
import { describe, test as it } from "vitest";
import Fraction from "fraction.js";

import {
  polynomialMul,
  polynomialAdd,
  scalarMultiply,
  ZERO,
  ONE,
} from "./polynomialOps";

const f = (n: number, d: number = 1) => new Fraction(n, d);

describe("scalarMultiply", () => {
  it("should return correct answers", () => {
    expect(scalarMultiply([f(30)], f(2))).to.eql([f(60)]);
    expect(scalarMultiply([f(1, 3), f(2, 5)], ONE)).to.eql([f(1, 3), f(2, 5)]);
    expect(scalarMultiply([f(5, 7), f(13, 15)], f(7))).to.eql([
      f(5),
      f(91, 15),
    ]);
  });
  it("should handle zero edge case", () => {
    expect(scalarMultiply([f(1, 3), f(2, 5)], ZERO)).to.eql([]);
    expect(scalarMultiply([], f(5, 3))).to.eql([]);
  });
});

describe("polynomialAdd", () => {
  it("should return correct answers with a.length < b.length", () => {
    expect(polynomialAdd([f(1, 3), f(2, 5)], [f(2)])).to.eql([
      f(7, 3),
      f(2, 5),
    ]);
  });
  it("should return correct answers with a.length > b.length", () => {
    expect(polynomialAdd([f(1, 3), f(2, 5)], [f(2), f(1), f(3, 4)])).to.eql([
      f(7, 3),
      f(7, 5),
      f(3, 4),
    ]);
  });
  it("should return correct answers with a.length == b.length", () => {
    expect(polynomialAdd([f(1, 3), f(2, 5)], [f(2), f(1)])).to.eql([
      f(7, 3),
      f(7, 5),
    ]);
  });
  it("should handle zero edge case", () => {
    expect(polynomialAdd([f(1, 3), f(2, 5)], [])).to.eql([f(1, 3), f(2, 5)]);
    expect(polynomialAdd([f(1, 3), f(2, 5)], [f(-1, 3), f(-2, 5)])).to.eql([]);
    expect(polynomialAdd([f(1, 3), f(2, 5)], [f(2, 3), f(-2, 5)])).to.eql([
      f(1),
    ]);
  });
});

describe("polynomialMul", () => {
  it("should return correct answers with either operand a scalar", () => {
    expect(polynomialMul([f(1, 3), f(2, 5)], [f(2)])).to.eql([
      f(2, 3),
      f(4, 5),
    ]);
    expect(polynomialMul([f(2)], [f(1, 3), f(2, 5)])).to.eql([
      f(2, 3),
      f(4, 5),
    ]);
  });
  it("should return binomial distribution with all ones", () => {
    expect(polynomialMul([f(1), f(1)], [f(1), f(1)])).to.eql([
      f(1),
      f(2),
      f(1),
    ]);
    expect(polynomialMul([f(1), f(2), f(1)], [f(1), f(1)])).to.eql([
      f(1),
      f(3),
      f(3),
      f(1),
    ]);
    expect(polynomialMul([f(1), f(3), f(3), f(1)], [f(1), f(1)])).to.eql([
      f(1),
      f(4),
      f(6),
      f(4),
      f(1),
    ]);
  });
  it("should track coefficients correctly", () => {
    expect(polynomialMul([f(1), f(2), f(3)], [f(1, 5), f(1, 7)])).to.eql([
      f(1, 5),
      f(19, 35),
      f(31, 35),
      f(3, 7),
    ]);
  });
  it("should handle zero edge case", () => {
    expect(polynomialMul([f(1, 3), f(2, 5)], [])).to.eql([]);
    expect(polynomialMul([], [f(1, 3), f(2, 5)])).to.eql([]);
    expect(polynomialMul([f(1, 3), f(2, 5)], [ZERO])).to.eql([]);
    expect(polynomialMul([ZERO], [f(1, 3), f(2, 5)])).to.eql([]);
    expect(polynomialMul([f(1, 3), f(2, 5)], [ZERO, ZERO])).to.eql([]);
    expect(polynomialMul([ZERO, ZERO], [f(1, 3), f(2, 5)])).to.eql([]);
    expect(polynomialMul([ZERO, ZERO, ZERO], [ZERO, ZERO, ZERO])).to.eql([]);
  });
});
