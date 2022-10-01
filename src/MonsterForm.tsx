import React from "react";
import { groupBy, sortBy, uniq } from "lodash-es";

import { Difficulty, MonsterDict, MonsterType } from "./engine/monstats-dict";
import { LevelsDict } from "./engine/levels-dict";
import { SuperuniqueDict } from "./engine/superunique-dict";
import {
  FlatBossDict,
  getBossHierarchy,
  categoriesLocale,
} from "./engine/boss-dict";
import { Locale } from "./engine/locale-dict";
import { TCDict } from "./engine/tc-dict";
import { MonsterFormState } from "./MonsterFormInline";

export type MonsterFormProps = MonsterFormState & {
  errors: any;
  onPlayerFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onMonsterFormChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

const monsterApplicable = (monsterType: MonsterType): boolean => {
  return (
    monsterType == MonsterType.NORMAL ||
    monsterType == MonsterType.MINION ||
    monsterType == MonsterType.CHAMP ||
    monsterType == MonsterType.UNIQUE
  );
};

const getMonsterList = (
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

export const MonsterForm = (props: MonsterFormProps): JSX.Element => {
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
  return (
    <div className="w-full px-3">
      <div className="form-group">
        <label className="form-label">Monster Type</label>
        <select
          className="select"
          id="monsterType"
          value={props.monsterType}
          onChange={props.onMonsterFormChange}
        >
          <option
            key={MonsterType.TREASURE_CLASS}
            value={MonsterType.TREASURE_CLASS}
          >
            Treasure Class
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
      </div>
      {props.monsterType === MonsterType.TREASURE_CLASS && (
        <div className="form-group">
          <label className="form-label">TC</label>
          <select
            className="select"
            id="tc"
            value={props.tc}
            onChange={props.onPlayerFormChange}
          >
            {tcOptions}
          </select>
        </div>
      )}
      {props.monsterType === MonsterType.TREASURE_CLASS && (
        <div className="form-group">
          <label className="form-label">Mlvl</label>
          <input
            type="text"
            id="mlvl"
            className={(props.errors.mlvl ? "error " : "") + "textbox"}
            value={props.mlvl}
            onChange={props.onPlayerFormChange}
          />
        </div>
      )}
      {props.monsterType !== MonsterType.TREASURE_CLASS && (
        <div className="form-group">
          <label className="form-label">Difficulty</label>
          <select
            className="select"
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
        </div>
      )}
      {monsterApplicable(props.monsterType) && (
        <div className="form-group">
          <label className="form-label">Levels</label>
          <select
            className="select"
            id="levelId"
            value={props.levelId}
            onChange={props.onMonsterFormChange}
          >
            {makeLevelOptions()}
          </select>
        </div>
      )}
      {monsterApplicable(props.monsterType) && (
        <div className="form-group">
          <label className="form-label">Monster</label>
          <select
            className="select"
            id="monster"
            value={props.monster}
            onChange={props.onMonsterFormChange}
          >
            {monsterOptions}
          </select>
        </div>
      )}
      {props.monsterType === MonsterType.SUPERUNIQUE && (
        <div className="form-group">
          <label className="form-label">Superunique</label>
          <select
            className="select"
            id="superunique"
            value={props.superunique}
            onChange={props.onMonsterFormChange}
          >
            {makeSuperuniqueElements()}
          </select>
        </div>
      )}
      {props.monsterType === MonsterType.BOSS && (
        <div className="form-group">
          <label className="form-label">Boss</label>
          <select
            className="select"
            id="boss"
            value={props.boss}
            onChange={props.onMonsterFormChange}
          >
            {bossElements}
          </select>
        </div>
      )}
      {props.monsterType !== MonsterType.TREASURE_CLASS && (
        <div className="form-group flex flex-row">
          <input
            id="terrorZone"
            type="checkbox"
            checked={props.terrorZone}
            onChange={props.onMonsterFormChange}
          />
          <span
            className={
              "px-2 pt-1 items-center" +
              (props.terrorZone ? " text-terror" : "")
            }
          >
            Terrorized with Player Level
          </span>
          <input
            type="text"
            id="playerLvl"
            className={
              (props.errors.playerLvl ? "error " : "") + "mobile-inline-textbox"
            }
            value={props.playerLvl}
            onChange={props.onMonsterFormChange}
            disabled={!props.terrorZone}
          />
        </div>
      )}
    </div>
  );
};
