import Fraction from "fraction.js";
import { range } from "lodash-es";

export const ZERO = new Fraction(0);
export const ONE = new Fraction(1);

export const polynomialReduce = (a: Fraction[]) => {
  while (a.length > 0 && a[a.length - 1].valueOf() === 0) {
    a.pop();
  }
  return a;
};

export const polynomialMul = (a: Fraction[], b: Fraction[]): Fraction[] => {
  const res = range(a.length * b.length).map(() => ZERO);
  for (let aIdx = 0; aIdx < a.length; aIdx++) {
    for (let bIdx = 0; bIdx < b.length; bIdx++) {
      res[aIdx + bIdx] = res[aIdx + bIdx].add(a[aIdx].mul(b[bIdx]));
    }
  }
  return polynomialReduce(res);
};

export const polynomialAdd = (a: Fraction[], b: Fraction[]): Fraction[] => {
  // WLOG assume that a is higher degree
  if (a.length <= b.length) {
    [b, a] = [a, b];
  }
  const res = a.map((val, idx) => {
    if (idx < b.length) {
      return val.add(b[idx]);
    }
    return val;
  });
  return polynomialReduce(res);
};

export const scalarMultiply = (a: Fraction[], b: Fraction): Fraction[] => {
  const res = a.map((val) => val.mul(b));
  return polynomialReduce(res);
};
