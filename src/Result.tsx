import React, { useState } from "react";
import Fraction from "fraction.js";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { ItemDict } from "./engine/item-dict";
import { Locale } from "./engine/locale-dict";
import { RARITY } from "./engine/itemratio-dict";
import { RUNE_REGEX } from "./charts/common";
import { SetDict, UniqueDict } from "./engine/unique-set-dict";

export type SelectItemType = (
  baseItemName: string,
  itemName: string,
  rarity: RARITY,
  chance: Fraction
) => void;

type IAppPropType = {
  results: BaseItemProbTuple[];
  onSelectItem: SelectItemType;
  displayFull: boolean;
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

function tryLocale(name: string) {
  if (ItemDict[name]) {
    return Locale(name);
  }
  return name;
}

function getNames(tcTuple: BaseItemProbTuple) {
  const names: string[] = [];
  names.push(tryLocale(tcTuple[0]).toLowerCase());
  for (const set of tcTuple[2].sets) {
    names.push(tryLocale(set[0]).toLowerCase());
  }
  for (const unique of tcTuple[2].uniques) {
    names.push(tryLocale(unique[0]).toLowerCase());
  }
  return names;
}

export const Result = ({
  results,
  onSelectItem,
}: IAppPropType): JSX.Element => {
  const [textFilter, setTextFilter] = useState("");

  const textFilterRegex = new RegExp(textFilter);
  const tableRows = results
    .filter((tcTuple) => {
      if (textFilter === "") {
        return true;
      }
      const names = getNames(tcTuple);
      return names.some((name) => textFilterRegex.test(name));
    })
    .map((tcTuple) => {
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
  return (
    <React.Fragment>
      <div className="px-3 flex flex-row">
        <div className="relative w-44">
          <div className="flex absolute inset-y-0 left-0 items-center pl-1 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            className="textbox block px-1 py-0.5 pl-7"
            value={textFilter}
            onChange={(event) =>
              setTextFilter(event.target.value.toLowerCase())
            }
          />
        </div>
      </div>
      <div className="resultParent flex-grow overflow-y-auto">
        <ul className="table-body">{tableRows}</ul>
      </div>
    </React.Fragment>
  );
};
