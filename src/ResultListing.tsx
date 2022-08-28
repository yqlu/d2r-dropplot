import React, { useState } from "react";
import Fraction from "fraction.js";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { RUNE_REGEX } from "./charts/common";
import { SetDict, UniqueDict } from "./engine/unique-set-dict";
import { ItemDict } from "./engine/item-dict";
import { Locale } from "./engine/locale-dict";
import { RARITY } from "./engine/itemratio-dict";

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

export type SelectItemType = (
  baseItemName: string,
  itemName: string,
  rarity: RARITY,
  chance: Fraction
) => void;

export type IResultListingProps = {
  filteredResults: BaseItemProbTuple[];
  onSelectItem: SelectItemType;
  textFilter: string;
};

export function tryLocale(name: string) {
  if (ItemDict[name]) {
    return Locale(name);
  }
  return name;
}

export const ResultListing = ({
  filteredResults,
  onSelectItem,
  textFilter,
}: IResultListingProps): JSX.Element => {
  const textFilterRegex = new RegExp(textFilter);
  const tableRows = filteredResults.map((tcTuple) => {
    let name;
    if (ItemDict[tcTuple[0]]) {
      name = Locale(tcTuple[0]);
    } else {
      name = tcTuple[0];
    }
    const children: JSX.Element[] = [];
    for (const item of tcTuple[2].sets) {
      if (textFilter !== "" && !textFilterRegex.test(tryLocale(item[0]))) {
        continue;
      }
      const chance = item[1].mul(tcTuple[2].quality[2].mul(tcTuple[1]));
      children.push(
        <li key={item[0]} className="table-row sub-table-row">
          <span
            className="row-name pl-3 text-set"
            onClick={(e) =>
              onSelectItem(tcTuple[0], item[0], RARITY.SET, chance)
            }
          >
            {Locale(item[0])}
          </span>
          <span className="row-chance">{formatReciprocal(chance)}</span>
          <span className="row-level">{SetDict[item[0]]?.lvl || "-"}</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </li>
      );
    }
    for (const item of tcTuple[2].uniques) {
      if (textFilter !== "" && !textFilterRegex.test(tryLocale(item[0]))) {
        continue;
      }
      const chance = item[1].mul(tcTuple[2].quality[3].mul(tcTuple[1]));
      children.push(
        <li key={item[0]} className="table-row sub-table-row">
          <span
            className="row-name pl-3 text-unique"
            onClick={(e) =>
              onSelectItem(tcTuple[0], item[0], RARITY.UNIQUE, chance)
            }
          >
            {Locale(item[0])}
          </span>
          <span className="row-chance">{formatReciprocal(chance)}</span>
          <span className="row-level">{UniqueDict[item[0]]?.lvl || "-"}</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </li>
      );
    }
    const styling = RUNE_REGEX.test(tcTuple[0]) ? "text-rune" : "text-white";
    return (
      <React.Fragment key={tcTuple[0]}>
        <li
          className="table-row main-table-row"
          onClick={(e) =>
            onSelectItem(tcTuple[0], "", RARITY.WHITE, tcTuple[1])
          }
        >
          <span className={"row-name " + styling}>{name}</span>
          <span className="row-chance">{formatReciprocal(tcTuple[1])}</span>
          <span className="row-level">
            {ItemDict[tcTuple[0]]?.level || "-"}
          </span>
          <span className="text-magic">{format(tcTuple[2].quality[0])}</span>
          <span className="text-rare">{format(tcTuple[2].quality[1])}</span>
          <span className="text-set">{format(tcTuple[2].quality[2])}</span>
          <span className="text-unique">{format(tcTuple[2].quality[3])}</span>
        </li>
        {children}
      </React.Fragment>
    );
  });

  return <ul className="table-body">{tableRows}</ul>;
};
