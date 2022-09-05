import { color } from "chart.js/helpers";
import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import { BaseItemProbTuple } from "../engine/resultAggregator";
import { Gradient } from "javascript-color-gradient";
import Fraction from "fraction.js";
import { SelectItemType } from "../Result";

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
  selectedChance: Fraction;
  onSelectItem: SelectItemType;
};

export const REGULAR_COLOR = "white";
export const MAGIC_COLOR = "#3B82F6";
export const RARE_COLOR = "#FACC15";
export const SET_COLOR = "#84CC16";
export const UNIQUE_COLOR = "#c7b377";
export const RUNE_COLOR = "#F97316";
export const RUNE_REGEX = /^r(\d+)$/;
export const KEY_REGEX = /^pk[1-3]$/;

export const colorFromRarity = (name: string, rarity: RARITY): string => {
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
      if (RUNE_REGEX.test(name) || KEY_REGEX.test(name)) {
        return RUNE_COLOR;
      }
      return REGULAR_COLOR;
  }
};

export const colorClassFromRarity = (name: string, rarity: RARITY): string => {
  switch (rarity) {
    case RARITY.UNIQUE:
      return "text-unique";
    case RARITY.SET:
      return "text-set";
    case RARITY.RARE:
      return "text-rare";
    case RARITY.MAGIC:
      return "text-magic";
    default:
      if (RUNE_REGEX.test(name) || KEY_REGEX.test(name)) {
        return "text-rune";
      }
      return "text-regular";
  }
};

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

const binomialDistributionFunction = function (
  n: number,
  k: number,
  p: number
) {
  let r = 1;
  for (let d = 1; d <= k; d++) {
    r *= n-- * p * (1 - p);
    r /= d;
  }
  r *= (1 - p) ** (n - 2 * k);
  return r;
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
