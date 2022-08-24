import React from "react";
import { groupBy, sortBy, uniq } from "lodash-es";

import { Difficulty, MonsterDict, MonsterType } from "./engine/monstats-dict";
import { LevelsDict } from "./engine/levels-dict";
import { SuperuniqueDict } from "./engine/superunique-dict";
import { FlatBossDict, getBossHierarchy } from "./engine/boss-dict";
import { Locale } from "./engine/locale-dict";

export type MonsterFormState = {
  difficulty: Difficulty;
  monsterType: MonsterType;
  levelId: number;
  monster: string;
  superunique: string;
  boss: string;
};

export type MonsterFormProps = MonsterFormState & {
  errors: any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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

export const MonsterForm = (props: MonsterFormProps): JSX.Element => {
  let monsterOptions: JSX.Element[] = [];
  let bossElements: JSX.Element[] = [];
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
          <optgroup key={category} label={category}>
            {innerBossElements}
          </optgroup>
        );
      });
  }

  return (
    <div className="w-full px-3">
      <div className="form-group">
        <label className="form-label">Difficulty</label>
        <select
          className="select"
          id="difficulty"
          value={props.difficulty}
          onChange={props.onChange}
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
      <div className="form-group">
        <label className="form-label">Monster Type</label>
        <select
          className="select"
          id="monsterType"
          value={props.monsterType}
          onChange={props.onChange}
        >
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
      {monsterApplicable(props.monsterType) && (
        <div className="form-group">
          <label className="form-label">Levels</label>
          <select
            className="select"
            id="levelId"
            value={props.levelId}
            onChange={props.onChange}
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
            onChange={props.onChange}
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
            onChange={props.onChange}
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
            onChange={props.onChange}
          >
            {bossElements}
          </select>
        </div>
      )}
    </div>
  );
};
