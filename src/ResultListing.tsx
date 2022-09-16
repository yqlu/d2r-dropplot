import React, { useState } from "react";
import Fraction from "fraction.js";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { colorClassFromRarity, formatPercent } from "./charts/common";
import { SetDict, UniqueDict } from "./engine/unique-set-dict";
import { ItemDict } from "./engine/item-dict";
import { Locale } from "./engine/locale-dict";
import { RARITY } from "./engine/itemratio-dict";

function format(percent: Fraction) {
  if (percent.valueOf() === 0) {
    return "";
  }
  return `${formatPercent(percent.valueOf() * 100)}%`;
}

export function formatReciprocal(chance: Fraction) {
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
  baseItemName: string;
  itemName: string;
  rarity: RARITY;
  isDesktop: boolean;
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
  baseItemName,
  itemName,
  rarity,
  isDesktop,
}: IResultListingProps): JSX.Element => {
  const textFilterRegex = new RegExp(textFilter);
  const tableRows = filteredResults.map((tcTuple) => {
    const name = tryLocale(tcTuple[0]);
    const textFilterFailsOnBase =
      textFilter !== "" && !textFilterRegex.test(name.toLowerCase());
    const children: JSX.Element[] = [];
    for (const item of tcTuple[2].sets) {
      if (
        textFilterFailsOnBase &&
        !textFilterRegex.test(tryLocale(item[0]).toLowerCase())
      ) {
        continue;
      }
      const chance = item[1].mul(tcTuple[2].quality[2].mul(tcTuple[1]));
      children.push(
        <li
          key={item[0]}
          className={
            "table-row sub-table-row " +
            (rarity === RARITY.SET && itemName === item[0] ? "selected" : "")
          }
          onClick={(e) => onSelectItem(tcTuple[0], item[0], RARITY.SET, chance)}
        >
          <span className="cell row-name pl-3 text-set">{Locale(item[0])}</span>
          <span className="cell row-chance">{formatReciprocal(chance)}</span>
          {isDesktop && (
            <React.Fragment>
              <span className="cell row-level">
                {SetDict[item[0]]?.lvl || "-"}
              </span>
              <span className="cell"></span>
              <span className="cell"></span>
              <span className="cell"></span>
              <span className="cell"></span>{" "}
            </React.Fragment>
          )}
        </li>
      );
    }
    for (const item of tcTuple[2].uniques) {
      if (
        textFilterFailsOnBase &&
        !textFilterRegex.test(tryLocale(item[0]).toLowerCase())
      ) {
        continue;
      }
      const chance = item[1].mul(tcTuple[2].quality[3].mul(tcTuple[1]));
      children.push(
        <li
          key={item[0]}
          className={
            "table-row sub-table-row " +
            (rarity === RARITY.UNIQUE && itemName === item[0] ? "selected" : "")
          }
          onClick={(e) =>
            onSelectItem(tcTuple[0], item[0], RARITY.UNIQUE, chance)
          }
        >
          <span className="cell row-name pl-3 text-unique">
            {Locale(item[0])}
          </span>
          <span className="cell row-chance">{formatReciprocal(chance)}</span>
          {isDesktop && (
            <React.Fragment>
              <span className="cell row-level">
                {UniqueDict[item[0]]?.lvl || "-"}
              </span>
              <span className="cell"></span>
              <span className="cell"></span>
              <span className="cell"></span>
              <span className="cell"></span>
            </React.Fragment>
          )}
        </li>
      );
    }
    const styling = colorClassFromRarity(tcTuple[0], RARITY.WHITE);
    return (
      <React.Fragment key={tcTuple[0]}>
        <li
          className={
            "table-row main-table-row " +
            (rarity === RARITY.WHITE && baseItemName === tcTuple[0]
              ? "selected"
              : "")
          }
          onClick={(e) =>
            onSelectItem(tcTuple[0], "", RARITY.WHITE, tcTuple[1])
          }
        >
          <span className={"cell row-name " + styling}>{name}</span>
          <span className="cell row-chance">
            {formatReciprocal(tcTuple[1])}
          </span>
          {isDesktop && (
            <React.Fragment>
              <span className="cell row-level">
                {ItemDict[tcTuple[0]]?.level || "-"}
              </span>
              <span className="cell text-magic">
                {format(tcTuple[2].quality[0])}
              </span>
              <span className="cell text-rare">
                {format(tcTuple[2].quality[1])}
              </span>
              <span className="cell text-set">
                {format(tcTuple[2].quality[2])}
              </span>
              <span className="cell text-unique">
                {format(tcTuple[2].quality[3])}
              </span>
            </React.Fragment>
          )}
        </li>
        {children}
      </React.Fragment>
    );
  });

  return (
    <ul className={"table-body " + (isDesktop ? "desktop" : "")}>
      {tableRows}
    </ul>
  );
};
