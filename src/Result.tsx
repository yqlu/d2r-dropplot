import React, { useState } from "react";
import { RUNE_REGEX } from "./charts/common";
import { ItemDict } from "./engine/item-dict";
import { RARITY } from "./engine/itemratio-dict";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { ArmorDict, WeaponsDict } from "./engine/weapon-armor-dict";
import { SelectItemType, ResultListing, tryLocale } from "./ResultListing";

type IAppPropType = {
  results: BaseItemProbTuple[];
  onSelectItem: SelectItemType;
  displayFull: boolean;
  baseItemName: string;
  itemName: string;
  rarity: RARITY;
  isDesktop: boolean;
};

type SortType = "name" | "chance" | "level";
type SortObject = { field: SortType; ascending: boolean };
type SortTuple = [BaseItemProbTuple, number | string];

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

function testJewelry(name: string) {
  return (
    name === "rin" ||
    name === "amu" ||
    name === "jew" ||
    name === "cm1" ||
    name === "cm2" ||
    name === "cm3"
  );
}

function setSortHelper(
  field: SortType,
  sortObject: SortObject,
  setSortObject: React.Dispatch<React.SetStateAction<SortObject>>
) {
  return () => {
    if (sortObject.field === field) {
      setSortObject({ field, ascending: !sortObject.ascending });
    } else {
      setSortObject({ field, ascending: true });
    }
  };
}

function getSortSymbol(field: SortType, sortObject: SortObject) {
  if (sortObject.field === field) {
    return sortObject.ascending ? "▲" : "▼";
  }
  return "";
}

export const Result = ({
  results,
  onSelectItem,
  baseItemName,
  itemName,
  rarity,
  isDesktop,
}: IAppPropType): JSX.Element => {
  const [textFilter, setTextFilter] = useState("");
  const [includeWeapons, setIncludeWeapons] = useState(true);
  const [includeArmor, setIncludeArmor] = useState(true);
  const [includeJewelry, setIncludeJewelry] = useState(true);
  const [includeRunes, setIncludeRunes] = useState(true);
  const [includeOthers, setIncludeOthers] = useState(true);
  const [sortObject, setSortObject] = useState({
    field: "name",
    ascending: true,
  } as SortObject);

  const textFilterRegex = new RegExp(textFilter);
  const filteredResults = results
    .filter((tcTuple) => {
      if (textFilter === "") {
        return true;
      }
      const names = getNames(tcTuple);
      return names.some((name) => textFilterRegex.test(name));
    })
    .filter((tcTuple) => {
      const name = tcTuple[0];
      const isWeapon = WeaponsDict[name];
      const isArmor = ArmorDict[name];
      const isRune = RUNE_REGEX.test(name);
      const isJewelry = testJewelry(name);
      const isOthers = !isWeapon && !isArmor && !isRune && !isJewelry;
      if (!includeWeapons && isWeapon) {
        return false;
      } else if (!includeArmor && isArmor) {
        return false;
      } else if (!includeRunes && isRune) {
        return false;
      } else if (!includeJewelry && isJewelry) {
        return false;
      } else if (!includeOthers && isOthers) {
        return false;
      }
      return true;
    })
    .map((tcTuple) => {
      const sortKey = sortObject.field;
      let fieldValue;
      if (sortKey === "name") {
        fieldValue = tryLocale(tcTuple[0]);
      } else if (sortKey === "chance") {
        fieldValue = tcTuple[1].valueOf();
      } else {
        fieldValue = ItemDict[tcTuple[0]]?.level || -1;
      }
      return [tcTuple, fieldValue as string | number] as SortTuple;
    })
    .sort((sortTupleA, sortTupleB) => {
      if (!sortObject.ascending) {
        [sortTupleB, sortTupleA] = [sortTupleA, sortTupleB];
      }
      if (sortObject.field === "name") {
        return (sortTupleA[1] as string).localeCompare(sortTupleB[1] as string);
      }
      return (sortTupleA[1] as number) - (sortTupleB[1] as number);
    })
    .map((sortTuple) => sortTuple[0]);
  return (
    <React.Fragment>
      <div className="sticky top-8 bg-gray-900">
        <div className="sidebar-row">
          <div
            className={
              "px-3 py-3 flex flex-row " + (isDesktop ? "container" : "")
            }
          >
            <div
              className={"relative " + (isDesktop ? "w-[11.5rem]" : "w-full")}
            >
              <div className="flex absolute inset-y-0 left-0 items-center pl-1 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
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
            {isDesktop && (
              <React.Fragment>
                <span className="ml-10 mr-3 items-center inline-flex">
                  Filter:{" "}
                </span>
                <span
                  className={"pill " + (includeWeapons ? "" : "unselected")}
                  onClick={() => setIncludeWeapons(!includeWeapons)}
                >
                  Weapons
                </span>
                <span
                  className={"pill " + (includeArmor ? "" : "unselected")}
                  onClick={() => setIncludeArmor(!includeArmor)}
                >
                  Armor
                </span>
                <span
                  className={"pill " + (includeJewelry ? "" : "unselected")}
                  onClick={() => setIncludeJewelry(!includeJewelry)}
                >
                  Jewelry
                </span>
                <span
                  className={"pill " + (includeRunes ? "" : "unselected")}
                  onClick={() => setIncludeRunes(!includeRunes)}
                >
                  Runes
                </span>
                <span
                  className={"pill " + (includeOthers ? "" : "unselected")}
                  onClick={() => setIncludeOthers(!includeOthers)}
                >
                  Misc
                </span>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="sidebar-row border-b border-gray-800">
          <div className={"table-body " + (isDesktop ? "desktop" : "")}>
            <div className="table-row title-table-row">
              <span
                className="cell row-name selectable flex flex-row"
                onClick={setSortHelper("name", sortObject, setSortObject)}
              >
                <span className="grow">Name</span>
                <span>{getSortSymbol("name", sortObject)}</span>
              </span>
              <span
                className="cell row-chance selectable flex flex-row"
                onClick={setSortHelper("chance", sortObject, setSortObject)}
              >
                <span className="grow">Chance</span>
                <span>{getSortSymbol("chance", sortObject)}</span>
              </span>
              {isDesktop && (
                <React.Fragment>
                  <span
                    className="cell row-level selectable flex flex-row"
                    onClick={setSortHelper("level", sortObject, setSortObject)}
                  >
                    <span className="grow">Level</span>
                    <span>{getSortSymbol("level", sortObject)}</span>
                  </span>
                  <span className="cell text-magic">Magic</span>
                  <span className="cell text-rare">Rare</span>
                  <span className="cell text-set">Set</span>
                  <span className="cell text-unique">Unique</span>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="resultParent flex-grow overflow-y-auto overflow-x-hidden">
        <ResultListing
          filteredResults={filteredResults}
          onSelectItem={onSelectItem}
          textFilter={textFilter}
          baseItemName={baseItemName}
          itemName={itemName}
          rarity={rarity}
          isDesktop={isDesktop}
        />
      </div>
    </React.Fragment>
  );
};
