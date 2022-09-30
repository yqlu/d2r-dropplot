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

export type MonsterFormState = {
  difficulty: Difficulty;
  monsterType: MonsterType;
  levelId: number;
  monster: string;
  superunique: string;
  boss: string;
  tc: string;
  mlvl: string;
  terrorZone: boolean;
  playerLvl: number;
};

export type MonsterFormProps = MonsterFormState & {
  errors: any;
  onPlayerFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onMonsterFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  baseItemName: string;
  itemName: string;
  rarity: RARITY;
  selectedChance: Fraction;
};

const makeLevelOptions = (): JSX.Element[] => {
  const groupedLevels = groupBy(LevelsDict, "act");
  return Object.entries(groupedLevels).map(([act, levels]) => {
    const levelElements = levels.map((level) => (
      <option key={level.id} value={level.id}>
        {Locale(level.name)}
      </option>
    ));
    return (
      <optgroup key={act} label={`Act ${act}`}>
        {levelElements}
      </optgroup>
    );
  });
};

const makeSuperuniqueElements = (): JSX.Element[] => {
  const groupedSuperuniques = groupBy(SuperuniqueDict, (superunique) => {
    return LevelsDict[superunique.areaId].act;
  });
  return Object.entries(groupedSuperuniques).map(([act, superunique]) => {
    const superuniqueElements = sortBy(superunique, "areaId", "id").map(
      (superunique) => (
        <option key={superunique.id} value={superunique.id}>
          {Locale(superunique.id)}
        </option>
      )
    );
    return (
      <optgroup key={act} label={`Act ${act}`}>
        {superuniqueElements}
      </optgroup>
    );
  });
};

export const monsterApplicable = (monsterType: MonsterType): boolean => {
  return (
    monsterType == MonsterType.NORMAL ||
    monsterType == MonsterType.MINION ||
    monsterType == MonsterType.CHAMP ||
    monsterType == MonsterType.UNIQUE
  );
};

export const getMonsterList = (
  levelId: number,
  difficulty: Difficulty,
  monsterType: MonsterType
): string[] => {
  const levelEntry = LevelsDict[levelId];
  let monList: string[];
  if (difficulty === Difficulty.NORMAL) {
    if (monsterType !== MonsterType.UNIQUE) {
      monList = levelEntry.mon;
    } else {
      monList = levelEntry.umon;
    }
  } else {
    monList = levelEntry.nmon;
  }
  // Some of the monster entries might not be defined in MonsterDict (see levels-dict.test)
  // Filter down to the ones which are
  return uniq(monList.filter((mon) => MonsterDict[mon]));
};

const makeTcOptions = (): JSX.Element[] => {
  return Object.keys(TCDict).map((tcName) => {
    return (
      <option value={tcName} key={tcName}>
        {tcName}
      </option>
    );
  });
};

export const MonsterFormInline = (props: MonsterFormProps): JSX.Element => {
  let monsterOptions: JSX.Element[] = [];
  let bossElements: JSX.Element[] = [];
  let tcOptions: JSX.Element[] = [];
  if (monsterApplicable(props.monsterType)) {
    monsterOptions = getMonsterList(
      props.levelId,
      props.difficulty,
      props.monsterType
    ).map((id) => {
      const monster = MonsterDict[id];
      return (
        <option key={id} value={id}>
          {Locale(monster.nameStr)}
        </option>
      );
    });
  } else if (props.monsterType === MonsterType.BOSS) {
    bossElements = Object.entries(getBossHierarchy(props.difficulty))
      .filter(([category, bosses]) => bosses.length > 0)
      .map(([category, bosses]) => {
        let innerBossElements: JSX.Element[];
        if (category === "actbosses") {
          innerBossElements = bosses.map((boss) => {
            const localized = Locale(FlatBossDict[boss].nameStr);
            return (
              <React.Fragment key={boss}>
                <option key={boss} value={boss}>
                  {localized}
                </option>
                <option key={`quest${boss}`} value={`quest${boss}`}>
                  {localized} (Q)
                </option>
              </React.Fragment>
            );
          });
        } else {
          innerBossElements = bosses.map((boss) => (
            <option key={boss} value={boss}>
              {Locale(FlatBossDict[boss].nameStr)}
            </option>
          ));
        }
        return (
          <optgroup
            key={category}
            label={categoriesLocale[category as keyof typeof categoriesLocale]}
          >
            {innerBossElements}
          </optgroup>
        );
      });
  } else if (props.monsterType == MonsterType.TREASURE_CLASS) {
    tcOptions = makeTcOptions();
  }

  const name = props.itemName === "" ? props.baseItemName : props.itemName;
  const styling = colorClassFromRarity(props.baseItemName, props.rarity);
  return (
    <div className="w-full text-sm px-3 text-center">
      <p className="leading-8">
        <select
          className="inline-select"
          id="monsterType"
          value={props.monsterType}
          onChange={props.onMonsterFormChange}
        >
          <option
            key={MonsterType.TREASURE_CLASS}
            value={MonsterType.TREASURE_CLASS}
          >
            TC
          </option>
          <option key={MonsterType.NORMAL} value={MonsterType.NORMAL}>
            Normal
          </option>
          <option key={MonsterType.MINION} value={MonsterType.MINION}>
            Minion
          </option>
          <option key={MonsterType.CHAMP} value={MonsterType.CHAMP}>
            Champion
          </option>
          <option key={MonsterType.UNIQUE} value={MonsterType.UNIQUE}>
            Unique
          </option>
          <option key={MonsterType.SUPERUNIQUE} value={MonsterType.SUPERUNIQUE}>
            Superunique
          </option>
          <option key={MonsterType.BOSS} value={MonsterType.BOSS}>
            Boss
          </option>
        </select>
        {props.monsterType === MonsterType.TREASURE_CLASS && (
          <select
            className="inline-select"
            id="tc"
            value={props.tc}
            onChange={props.onPlayerFormChange}
          >
            {tcOptions}
          </select>
        )}
        {props.monsterType === MonsterType.TREASURE_CLASS && (
          <span>
            with mlvl
            <input
              type="text"
              id="mlvl"
              className={
                (props.errors.mlvl ? "error " : "") + "w-20 inline-textbox"
              }
              value={props.mlvl}
              onChange={props.onPlayerFormChange}
            />
          </span>
        )}
        {monsterApplicable(props.monsterType) && (
          <select
            className="inline-select"
            id="monster"
            value={props.monster}
            onChange={props.onMonsterFormChange}
          >
            {monsterOptions}
          </select>
        )}
        {monsterApplicable(props.monsterType) && (
          <span>
            from
            <select
              className="inline-select"
              id="levelId"
              value={props.levelId}
              onChange={props.onMonsterFormChange}
            >
              {makeLevelOptions()}
            </select>
          </span>
        )}
        {props.monsterType === MonsterType.SUPERUNIQUE && (
          <select
            className="inline-select"
            id="superunique"
            value={props.superunique}
            onChange={props.onMonsterFormChange}
          >
            {makeSuperuniqueElements()}
          </select>
        )}
        {props.monsterType === MonsterType.BOSS && (
          <select
            className="inline-select"
            id="boss"
            value={props.boss}
            onChange={props.onMonsterFormChange}
          >
            {bossElements}
          </select>
        )}
        {props.monsterType !== MonsterType.TREASURE_CLASS && (
          <span>
            on
            <select
              className="inline-select"
              id="difficulty"
              value={props.difficulty}
              onChange={props.onMonsterFormChange}
            >
              <option key={Difficulty.NORMAL} value={Difficulty.NORMAL}>
                Normal
              </option>
              <option key={Difficulty.NIGHTMARE} value={Difficulty.NIGHTMARE}>
                Nightmare
              </option>
              <option key={Difficulty.HELL} value={Difficulty.HELL}>
                Hell
              </option>
            </select>
            difficulty
          </span>
        )}
      </p>
      {props.monsterType !== MonsterType.TREASURE_CLASS && (
        <p className="pb-2">
          <input
            id="terrorZone"
            type="checkbox"
            checked={props.terrorZone}
            onChange={props.onMonsterFormChange}
          />
          <span className={"px-1 " + (props.terrorZone ? "text-terror" : "")}>
            Terrorized with Player Level
          </span>
          <input
            type="text"
            id="playerLvl"
            className="w-20 inline-textbox"
            value={props.playerLvl}
            onChange={props.onMonsterFormChange}
            disabled={!props.terrorZone}
          />
        </p>
      )}
      {props.monsterType !== MonsterType.TREASURE_CLASS && (
        <p className="text-xs pb-2">
          Treasure Class: <span className="font-bold">{props.tc}</span> (mlvl{" "}
          <span className="font-bold">{props.mlvl})</span>
        </p>
      )}
      {props.baseItemName !== "" && (
        <p>
          Analyzing: <b className={styling}>{Locale(name)}</b> (
          {formatReciprocal(props.selectedChance)} chance)
        </p>
      )}
    </div>
  );
};
