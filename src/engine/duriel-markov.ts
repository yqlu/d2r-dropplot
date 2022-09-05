import Fraction from "fraction.js";
import { Matrix, makeEmpty, multiply, rows, cols } from "./matrix-utils";
import { Distribution } from "./distribution";
import { ZERO } from "./polynomialOps";

type State = [number, number];

const TOP_LEVEL_PICKS = 5;
const ITEM_PICKS = 7;
const MAX_DROPS = 6;
const ITEM_CHANCE = 2 / 3;

export const MARKOV_STATES = [
  [0, 0],
  [0, 1],
  [1, 0],
  [0, 2],
  [1, 1],
  [2, 0],
  [0, 3],
  [1, 2],
  [2, 1],
  [3, 0],
  [0, 4],
  [1, 3],
  [2, 2],
  [3, 1],
  [4, 0],
  [0, 5],
  [1, 4],
  [2, 3],
  [3, 2],
  [4, 1],
  [5, 0],
  [0, 6],
  [1, 5],
  [2, 4],
  [3, 3],
  [4, 2],
  [5, 1],
  [6, 0],
];

export const makeItemBinomial = (itemDrop: Fraction) => {
  const dist = Distribution.Binomial(Distribution.Atomic(itemDrop), ITEM_PICKS);
  const coeffs = dist.eval().coeffs;
  const survival = coeffs
    .slice()
    .reverse()
    .map(
      (
        (sum) => (value) =>
          (sum = sum.add(value))
      )(ZERO)
    )
    .reverse();
  return [coeffs, survival];
};

// See https://youbetterdont.github.io/#Duriel-drops for the math
export const makeTransitionMatrix = (itemDrop: Fraction): Matrix => {
  const T = makeEmpty(MARKOV_STATES.length, MARKOV_STATES.length);
  const [binomial, binomialSf] = makeItemBinomial(itemDrop);
  // console.log(
  //   binomial.map((val) => val.valueOf()),
  //   binomialSf.map((val) => val.valueOf()),
  //   itemDrop
  // );

  for (let i = 0; i < T.length; i++) {
    const rowI = T[i];
    for (let j = 0; j < rowI.length; j++) {
      const [tn, yn] = MARKOV_STATES[i];
      const [tn1, yn1] = MARKOV_STATES[j];
      const k = yn1 - yn;
      // Chance of dropping k items
      if (tn === tn1 && k >= 0) {
        // Conditional on first dropping items, not tsc
        const itemConditional = tn + yn < 6 ? ITEM_CHANCE : 1;
        // Chance of dropping k items
        let kItemChance = 0;
        const remaining = MAX_DROPS - tn - yn;
        if (k < remaining) {
          kItemChance = binomial[k].valueOf();
        } else if (k === remaining) {
          kItemChance = binomialSf[k].valueOf();
        }
        T[i][j] = itemConditional * kItemChance;
      } else if (tn1 - tn === 1 && k === 0) {
        if (tn + yn <= TOP_LEVEL_PICKS) {
          T[i][j] = 1 - ITEM_CHANCE;
        }
      }
    }
  }
  return T;
};

export const propagateMarkov = (
  itemDrop: Fraction,
  times = TOP_LEVEL_PICKS
): Matrix => {
  const initial = makeEmpty(1, MARKOV_STATES.length);
  initial[0][0] = 1;
  const T = makeTransitionMatrix(itemDrop);
  let res = initial;
  for (let i = 0; i < times; i++) {
    res = multiply(res, T);
  }
  return res;
};

export const histogramResult = (stateVector: number[]) => {
  const tscHistogram = [...Array(MAX_DROPS + 1)].fill(0);
  const itemHistogram = [...Array(MAX_DROPS + 1)].fill(0);
  for (let stateIdx = 0; stateIdx < stateVector.length; stateIdx++) {
    const [tn, yn] = MARKOV_STATES[stateIdx];
    const prob = stateVector[stateIdx];
    tscHistogram[tn] += prob;
    itemHistogram[yn] += prob;
  }
  return { tscHistogram, itemHistogram };
};
