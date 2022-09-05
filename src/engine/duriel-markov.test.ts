import { expect } from "chai";
import Fraction from "fraction.js";
import { sum } from "lodash-es";
import { describe, test as it } from "vitest";

import {
  makeItemBinomial,
  MARKOV_STATES,
  makeTransitionMatrix,
  propagateMarkov,
  histogramResult,
} from "./duriel-markov";
import { ONE } from "./polynomialOps";

describe("makeItemBinomial", () => {
  it("returns both the PMF and the SF", () => {
    const [massFunction, survivalFunction] = makeItemBinomial(
      new Fraction(1, 5)
    );
    expect(massFunction.length).to.eql(8);
    expect(survivalFunction.length).to.eql(8);
    expect(survivalFunction[0]).to.eql(ONE);
  });
});

describe("makeTransitionMatrix", () => {
  it("returns a valid transition matrix", () => {
    const T = makeTransitionMatrix(new Fraction(3, 5));
    for (let i = 0; i < T.length; i++) {
      const row = T[i];
      // rows all add to 1
      expect(sum(row)).to.approximately(
        1,
        1e-6,
        `row ${i} - ${JSON.stringify(row)}`
      );
      const upperTriangularSlice = T[i].slice(i);
      // matrix is upper triangular
      expect(sum(upperTriangularSlice)).to.approximately(1, 1e-6);
    }
  });
});

describe("propagateMarkov", () => {
  it("returns a valid state vector", () => {
    const res = propagateMarkov(new Fraction(2, 5));
    expect(sum(res[0])).to.approximately(1, 1e-6);
  });
});

describe("histogramResult", () => {
  it("returns a valid state vector", () => {
    const res = propagateMarkov(new Fraction(7, 10));
    const { tscHistogram, itemHistogram } = histogramResult(res[0]);
    expect(sum(tscHistogram)).to.be.approximately(1, 1e-5);
    expect(sum(itemHistogram)).to.be.approximately(1, 1e-5);
  });
});
