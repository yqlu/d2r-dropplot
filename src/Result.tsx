import React from "react";
import Fraction from "fraction.js";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { ItemDict } from "./engine/item-dict";
import { Locale } from "./engine/locale-dict";
import { RARITY } from "./engine/itemratio-dict";

export type SelectItemType = (name: string, rarity: RARITY) => void;

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
      children.push(
        <tr key={item[0]} className="sub-table-row">
          <td
            className="px-10 text-lime-500"
            onClick={(e) => onSelectItem(item[0], RARITY.SET)}
          >
            {Locale(item[0])}
          </td>
          <td>
            {formatReciprocal(
              item[1].mul(tcTuple[2].quality[2]).mul(tcTuple[1])
            )}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    for (const item of tcTuple[2].uniques) {
      children.push(
        <tr key={item[0]} className="sub-table-row">
          <td
            className="px-10 text-orange-400"
            onClick={(e) => onSelectItem(item[0], RARITY.UNIQUE)}
          >
            {Locale(item[0])}
          </td>
          <td>
            {formatReciprocal(
              item[1].mul(tcTuple[2].quality[3].mul(tcTuple[1]))
            )}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return (
      <React.Fragment key={tcTuple[0]}>
        <tr
          className="table-row"
          onClick={(e) => onSelectItem(tcTuple[0], RARITY.WHITE)}
        >
          <td className="px-5">{name}</td>
          <td>{formatReciprocal(tcTuple[1])}</td>
          <td className="text-sky-400">{format(tcTuple[2].quality[0])}</td>
          <td className="text-yellow-400">{format(tcTuple[2].quality[1])}</td>
          <td className="text-lime-500">{format(tcTuple[2].quality[2])}</td>
          <td className="text-orange-400">{format(tcTuple[2].quality[3])}</td>
        </tr>
        {children}
      </React.Fragment>
    );
  });
  return (
    <div className="bg-gray-900 border border-gray-800 rounded shadow w-full xl:w-2/3">
      <div className="p-5">
        <table className="w-full p-5">
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};
