import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import { BaseItemProbTuple } from "../engine/resultAggregator";
import { color } from "chart.js/helpers";

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

export const TREEMAP_NEUTRAL_TC_COLOR = color("#b0bec5").alpha(0.5); // blue-grey-200
export const TREEMAP_NEUTRAL_ITEM_COLOR = color("#b0bec5"); // blue-grey-200
export const TREEMAP_ACTIVE_TC_COLOR = color("#1565c0"); // blue-800
export const TREEMAP_ACTIVE_ITEM_COLOR = color("#6a1b9a"); // purple-800

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
