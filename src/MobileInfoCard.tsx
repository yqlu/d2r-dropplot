import React from "react";
import { groupBy, sortBy, uniq } from "lodash-es";

import { Difficulty, MonsterDict, MonsterType } from "./engine/monstats-dict";
import { LevelsDict } from "./engine/levels-dict";
import { SuperuniqueDict } from "./engine/superunique-dict";
import {
  categoriesLocale,
  FlatBossDict,
  getBossHierarchy,
} from "./engine/boss-dict";
import { Locale } from "./engine/locale-dict";
import { TCDict } from "./engine/tc-dict";
import { RARITY } from "./engine/itemratio-dict";
import Fraction from "fraction.js";
import { colorClassFromRarity } from "./charts/common";
import { formatReciprocal } from "./ResultListing";
import { monsterApplicable, MonsterFormState } from "./MonsterFormInline";

export type MobileInfoCardProps = MonsterFormState & {
  baseItemName: string;
  itemName: string;
  rarity: RARITY;
  selectedChance: Fraction;
};

const displayMonsterType = (monsterType: MonsterType): string => {
  switch (monsterType) {
    case MonsterType.MINION:
      return "Minion";
    case MonsterType.CHAMP:
      return "Champion";
    case MonsterType.UNIQUE:
      return "Unique";
  }
  return "";
};

export const MobileInfoCard = (props: MobileInfoCardProps): JSX.Element => {
  const name = props.itemName === "" ? props.baseItemName : props.itemName;
  const styling = colorClassFromRarity(props.baseItemName, props.rarity);
  return (
    <React.Fragment>
      <div className="absolute right-2 top-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </div>
      <div className="w-full text-sm px-3 text-center">
        {props.monsterType !== MonsterType.TREASURE_CLASS && (
          <p>
            Target:{" "}
            {monsterApplicable(props.monsterType) && (
              <span>
                {props.monsterType === MonsterType.MINION ||
                props.monsterType === MonsterType.CHAMP ||
                props.monsterType === MonsterType.UNIQUE
                  ? ` ${displayMonsterType(props.monsterType)} `
                  : " "}
                {Locale(MonsterDict[props.monster].nameStr)} from{" "}
                {Locale(LevelsDict[props.levelId].name)}
              </span>
            )}
            {props.monsterType === MonsterType.SUPERUNIQUE && (
              <span>{Locale(props.superunique)}</span>
            )}
            {props.monsterType === MonsterType.BOSS && (
              <span>{Locale(FlatBossDict[props.boss].nameStr)}</span>
            )}
            <span>
              {" "}
              on {["Normal", "Nightmare", "Hell"][props.difficulty]} difficulty
            </span>
          </p>
        )}
        <p className="subtitle">
          Treasure Class: <b className="font-mono">{props.tc}</b> (mlvl{" "}
          <b>{props.mlvl})</b>
        </p>
        {props.baseItemName !== "" && (
          <p>
            Analyzing: <b className={styling}>{Locale(name)}</b> (
            {formatReciprocal(props.selectedChance)} chance)
          </p>
        )}
      </div>
    </React.Fragment>
  );
};
