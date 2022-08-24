import { color } from "chart.js/helpers";
import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import { BaseItemProbTuple } from "../engine/resultAggregator";
import { Gradient } from "javascript-color-gradient";

export const TC_GRADIENT = {
  armo: new Gradient()
    .setColorGradient(
      // sky
      "#BAE6FD", // 200
      // "#7DD3FC", // 300
      // "#38BDF8", // 400
      "#0EA5E9", // 500
      "#0284C7", // 600
      "#0C4A6E" // 900
    )
    .setMidpoint(30)
    .getColors(),
  weap: new Gradient()
    .setColorGradient(
      // lime
      "#D9F99D", // 200
      // "#BEF264", // 300
      // "#38BDF8", // 400
      "#84CC16", // 500
      "#65A30D", // 600
      "#365314" // 900
    )
    .setMidpoint(30)
    .getColors(),
  bow: new Gradient()
    .setColorGradient(
      // violet
      "#DDD6FE", // 200
      // "#C4B5FD", // 300
      // "#A78BFA", // 400
      "#8B5CF6", // 500
      "#7C3AED", // 600
      "#4C1D95" // 900
    )
    .setMidpoint(30)
    .getColors(),
  mele: new Gradient()
    .setColorGradient(
      // fuchsia
      "#F5D0FE", // 200
      // "#F0ABFC", // 300
      // "#E879F9", // 400
      "#D946EF", // 500
      "#C026D3", // 600
      "#701A75" // 900
    )
    .setMidpoint(30)
    .getColors(),
};

export type IDashboardPropType = {
  playerFormState: PlayerFormState;
  results: BaseItemProbTuple[];
  baseItemName: string;
  itemName: string;
  rarity: RARITY;
};

export const WHITE_COLOR = "white";
export const MAGIC_COLOR = "#38BDF8"; // sky-400
export const RARE_COLOR = "#FACC15"; // yellow-400
export const SET_COLOR = "#84CC16"; // lime-500
export const UNIQUE_COLOR = "#FB923C"; // orange-400
export const RUNE_COLOR = "#FB923C"; // orange-400

export const TREEMAP_COLORS = {
  NEUTRAL: {
    TC: color("#212121"), // grey-900
    ITEM: color("#424242"), // grey-800
  },
  ACTIVE: {
    TC: color("#1565c0"), // blue-800
    ITEM: color("#e53935"), // red-600
  },
};

export const STACKED_BAR_COLORS = {
  NEUTRAL: color("#e0e0e0").alpha(0.5).rgbString(), // grey-300
  TC: color("#1565c0").rgbString(), // blue-800
  ACTIVE: color("#e53935").rgbString(), // purple-800
};

export const colorFromRarity = (rarity: RARITY): string => {
  switch (rarity) {
    case RARITY.UNIQUE:
      return UNIQUE_COLOR;
    case RARITY.SET:
      return SET_COLOR;
    case RARITY.RARE:
      return RARE_COLOR;
    case RARITY.MAGIC:
      return MAGIC_COLOR;
    default:
      return WHITE_COLOR;
  }
};

const n_choose_k = function (n: number, k: number) {
  if (k > n - k) {
    k = n - k;
  }
  let r = 1;
  for (let d = 1; d <= k; d++) {
    r *= n--;
    r /= d;
  }
  return r;
};
const binomialDistributionFunction = function (
  n: number,
  k: number,
  p: number
) {
  return n_choose_k(n, k) * p ** k * (1 - p) ** (n - k);
};
const binomialDistributionFunctionCumulative = function (
  n: number,
  k: number,
  p: number
) {
  let total = 0;
  for (let i = 0; i <= k; i++) {
    total += binomialDistributionFunction(n, i, p);
  }
  return total;
};
export { binomialDistributionFunction, binomialDistributionFunctionCumulative };
