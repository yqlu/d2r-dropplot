import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import { BaseItemProbTuple } from "../engine/resultAggregator";
import { color } from "chart.js/helpers";
import { cp } from "fs";

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
