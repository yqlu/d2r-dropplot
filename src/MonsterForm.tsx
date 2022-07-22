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

export class MonsterForm extends React.Component<MonsterFormProps> {
  levelsOptions: JSX.Element[];
  superuniqueElements: JSX.Element[];

  constructor(props: MonsterFormProps) {
    super(props);
    // todo: bake in all of this preprocessing
    const groupedLevels = groupBy(LevelsDict, "act");
    this.levelsOptions = Object.entries(groupedLevels).map(([act, levels]) => {
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

    const groupedSuperuniques = groupBy(SuperuniqueDict, (superunique) => {
      return LevelsDict[superunique.areaId].act;
    });
    this.superuniqueElements = Object.entries(groupedSuperuniques).map(
      ([act, superunique]) => {
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
      }
    );
  }

  monsterApplicable() {
    return (
      [
        MonsterType.NORMAL,
        MonsterType.MINION,
        MonsterType.CHAMP,
        MonsterType.UNIQUE,
      ].indexOf(this.props.monsterType) >= 0
    );
  }

  getMonList() {
    const levelEntry = LevelsDict[this.props.levelId];
    let monList: string[];
    if (this.props.difficulty === Difficulty.NORMAL) {
      if (this.props.monsterType !== MonsterType.UNIQUE) {
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
  }

  render() {
    let monsterOptions: JSX.Element[] = [];
    let bossElements: JSX.Element[] = [];
    if (this.monsterApplicable()) {
      monsterOptions = this.getMonList().map((id) => {
        const monster = MonsterDict[id];
        return (
          <option key={id} value={id}>
            {Locale(monster.nameStr)}
          </option>
        );
      });
    } else if (this.props.monsterType === MonsterType.BOSS) {
      bossElements = Object.entries(getBossHierarchy(this.props.difficulty))
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
      <div className="w-96 px-3">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Difficulty</label>
          <select
            className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="difficulty"
            value={this.props.difficulty}
            onChange={this.props.onChange}
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
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Monster Type</label>
          <select
            className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="monsterType"
            value={this.props.monsterType}
            onChange={this.props.onChange}
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
            <option
              key={MonsterType.SUPERUNIQUE}
              value={MonsterType.SUPERUNIQUE}
            >
              Superunique
            </option>
            <option key={MonsterType.BOSS} value={MonsterType.BOSS}>
              Boss
            </option>
          </select>
        </div>
        {this.monsterApplicable() && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Levels</label>
            <select
              className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="levelId"
              value={this.props.levelId}
              onChange={this.props.onChange}
            >
              {this.levelsOptions}
            </select>
          </div>
        )}
        {this.monsterApplicable() && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Monster</label>
            <select
              className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="monster"
              value={this.props.monster}
              onChange={this.props.onChange}
            >
              {monsterOptions}
            </select>
          </div>
        )}
        {this.props.monsterType === MonsterType.SUPERUNIQUE && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Superunique</label>
            <select
              className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="superunique"
              value={this.props.superunique}
              onChange={this.props.onChange}
            >
              {this.superuniqueElements}
            </select>
          </div>
        )}
        {this.props.monsterType === MonsterType.BOSS && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Boss</label>
            <select
              className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="boss"
              value={this.props.boss}
              onChange={this.props.onChange}
            >
              {bossElements}
            </select>
          </div>
        )}
      </div>
    );
  }
}
