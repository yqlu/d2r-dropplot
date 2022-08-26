import React from "react";
import Fraction from "fraction.js";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { ItemDict } from "./engine/item-dict";
import { Locale } from "./engine/locale-dict";
import { RARITY } from "./engine/itemratio-dict";
import { REGULAR_COLOR, RUNE_COLOR, RUNE_REGEX } from "./charts/common";

export type SelectItemType = (
  baseItemName: string,
  itemName: string,
  rarity: RARITY,
  chance: Fraction
) => void;

type IAppPropType = {
  results: BaseItemProbTuple[];
  onSelectItem: SelectItemType;
};

function format(percent: Fraction) {
  if (percent.valueOf() === 0) {
    return "";
  }
  return `${Math.round(percent.valueOf() * 10000) / 100}%`;
}

function formatReciprocal(chance: Fraction) {
  if (chance.valueOf() === 0) {
    return `0`;
  }
  let f = chance.inverse().valueOf();
  if (f < 50) {
    f = Math.round(f * 10) / 10;
  } else {
    f = Math.round(f);
  }
  return `1:${f}`;
}

export const Result = ({
  results,
  onSelectItem,
}: IAppPropType): JSX.Element => {
  const tableRows = results.map((tcTuple) => {
    let name;
    if (ItemDict[tcTuple[0]]) {
      name = `${Locale(tcTuple[0])} (${ItemDict[tcTuple[0]].level})`;
    } else {
      name = tcTuple[0];
    }
    const children: JSX.Element[] = [];
    for (const item of tcTuple[2].sets) {
      const chance = item[1].mul(tcTuple[2].quality[2].mul(tcTuple[1]));
      children.push(
        <tr key={item[0]} className="sub-table-row">
          <td
            className="px-5 text-set"
            onClick={(e) =>
              onSelectItem(tcTuple[0], item[0], RARITY.SET, chance)
            }
          >
            {Locale(item[0])}
          </td>
          <td>{formatReciprocal(chance)}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    for (const item of tcTuple[2].uniques) {
      const chance = item[1].mul(tcTuple[2].quality[3].mul(tcTuple[1]));
      children.push(
        <tr key={item[0]} className="sub-table-row">
          <td
            className="px-5 text-unique"
            onClick={(e) =>
              onSelectItem(tcTuple[0], item[0], RARITY.UNIQUE, chance)
            }
          >
            {Locale(item[0])}
          </td>
          <td>{formatReciprocal(chance)}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    const styling = RUNE_REGEX.test(tcTuple[0]) ? "text-rune" : "text-white";
    return (
      <React.Fragment key={tcTuple[0]}>
        <tr
          className="table-row"
          onClick={(e) =>
            onSelectItem(tcTuple[0], "", RARITY.WHITE, tcTuple[1])
          }
        >
          <td className={styling}>{name}</td>
          <td>{formatReciprocal(tcTuple[1])}</td>
          <td className="text-magic">{format(tcTuple[2].quality[0])}</td>
          <td className="text-rare">{format(tcTuple[2].quality[1])}</td>
          <td className="text-set">{format(tcTuple[2].quality[2])}</td>
          <td className="text-unique">{format(tcTuple[2].quality[3])}</td>
        </tr>
        {children}
      </React.Fragment>
    );
  });
  return (
    <div className="bg-gray-900 border border-gray-800 rounded shadow w-100">
      <div className="p-5 ">
        <table className="w-full ">
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};
