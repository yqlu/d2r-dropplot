import React from "react";

import { MonsterDict, MonsterType } from "./engine/monstats-dict";
import { LevelsDict } from "./engine/levels-dict";
import { FlatBossDict } from "./engine/boss-dict";
import { Locale } from "./engine/locale-dict";
import { RARITY } from "./engine/itemratio-dict";
import Fraction from "fraction.js";
import { formatReciprocal } from "./ResultListing";
import { monsterApplicable, MonsterFormState } from "./MonsterFormInline";
import { ItemDisplayName } from "./components/ItemDisplayName";

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
  let bossStr;
  if (props.boss.startsWith("quest")) {
    bossStr = `${Locale(FlatBossDict[props.boss.substring(5)].nameStr)} (Q)`;
  } else {
    bossStr = Locale(FlatBossDict[props.boss].nameStr);
  }
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
          <React.Fragment>
            <p>
              Target:{" "}
              {monsterApplicable(props.monsterType) && (
                <React.Fragment>
                  <span className="font-bold text-rare">
                    {props.monsterType === MonsterType.MINION ||
                    props.monsterType === MonsterType.CHAMP ||
                    props.monsterType === MonsterType.UNIQUE
                      ? `${displayMonsterType(props.monsterType)} `
                      : " "}
                    {Locale(MonsterDict[props.monster].nameStr)}
                  </span>{" "}
                  from{" "}
                  <span className="font-bold text-rare">
                    {Locale(LevelsDict[props.levelId].name)}
                  </span>
                </React.Fragment>
              )}
              {props.monsterType === MonsterType.SUPERUNIQUE && (
                <span className="font-bold text-rare">
                  {Locale(props.superunique)}
                </span>
              )}
              {props.monsterType === MonsterType.BOSS && (
                <span className="font-bold text-rare">{bossStr}</span>
              )}{" "}
              on{" "}
              <span className="font-bold text-rare">
                {["Normal", "Nightmare", "Hell"][props.difficulty]}
              </span>{" "}
              difficulty
            </p>
            {props.terrorZone && (
              <p className="text-xs pb-2 text-terror">
                Terrorized with Player Level {props.playerLvl}
              </p>
            )}
            <p className="text-xs pb-2">
              Treasure Class: <span className="font-bold">{props.tc}</span>{" "}
              (mlvl <span className="font-bold">{props.mlvl}</span>)
            </p>
          </React.Fragment>
        )}
        {props.monsterType === MonsterType.TREASURE_CLASS && (
          <p className="pb-2">
            Treasure Class:{" "}
            <span className="font-bold text-rare">{props.tc}</span> (mlvl{" "}
            <span className="font-bold text-rare">{props.mlvl}</span>)
          </p>
        )}{" "}
        {props.selectedChance.valueOf() > 0 && (
          <p>
            Analyzing:{" "}
            <span className="font-bold">
              <ItemDisplayName
                itemName={props.itemName}
                baseItemName={props.baseItemName}
                rarity={props.rarity}
              ></ItemDisplayName>
            </span>
            <span> ({formatReciprocal(props.selectedChance)} chance)</span>
          </p>
        )}
        {props.selectedChance.valueOf() === 0 && (
          <p>
            <span className="text-red-500">Warning: </span>
            <span className="font-bold">
              <ItemDisplayName
                itemName={props.itemName}
                baseItemName={props.baseItemName}
                rarity={props.rarity}
              ></ItemDisplayName>
            </span>
            <span>
              {" "}
              cannot be dropped by the current settings. Select a different item
              to generate charts.
            </span>
          </p>
        )}
      </div>
    </React.Fragment>
  );
};
