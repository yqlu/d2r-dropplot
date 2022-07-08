import React from "react";
import { groupBy, sortBy } from "lodash-es";

import { Difficulty, MonsterDict, MonsterType } from "./engine/monstats-dict";
import { LevelsDict } from "./engine/levels-dict";
import { SuperuniqueDict } from "./engine/superunique-dict";
import { getBossHierarchy } from "./engine/boss-dict";
import { JsxElement } from "typescript";

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
  monsterElements: JSX.Element[];
  superuniqueElements: JSX.Element[];

  constructor(props: MonsterFormProps) {
    super(props);
    // todo: bake in all of this preprocessing
    const groupedLevels = groupBy(LevelsDict, "act");
    this.levelsOptions = Object.entries(groupedLevels).map(([act, levels]) => {
      const levelElements = levels.map((level) => (
        <option key={level.id} value={level.id}>
          {level.name}
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
              {superunique.id}
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
    if (this.props.difficulty == Difficulty.NORMAL) {
      if (this.props.monsterType != MonsterType.UNIQUE) {
        monList = levelEntry.mon;
      } else {
        monList = levelEntry.umon;
      }
    } else {
      monList = levelEntry.nmon;
    }
    // Some of the monster entries might not be defined in MonsterDict (see levels-dict.test)
    // Filter down to the ones which are
    return monList.filter((mon) => MonsterDict[mon]);
  }

  render() {
    let monsterOptions: JSX.Element[] = [];
    let bossElements: JSX.Element[] = [];
    if (this.monsterApplicable()) {
      monsterOptions = this.getMonList().map((id) => {
        const monster = MonsterDict[id];
        return (
          <option key={id} value={id}>
            {id}
          </option>
        );
      });
    } else if (this.props.monsterType == MonsterType.BOSS) {
      bossElements = Object.entries(
        getBossHierarchy(this.props.difficulty)
      ).map(([category, bosses]) => {
        if (bosses.length == 0) {
          return;
        }
        let innerBossElements: JSX.Element[];
        if (category == "actbosses") {
          innerBossElements = bosses.map((boss) => (
            <React.Fragment key={boss}>
              <option key={boss} value={boss}>
                {boss}
              </option>
              <option key={`quest${boss}`} value={`quest${boss}`}>
                {boss} (Q)
              </option>
            </React.Fragment>
          ));
        } else {
          innerBossElements = bosses.map((boss) => (
            <option key={boss} value={boss}>
              {boss}
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
      <div>
        <p>
          <span>Difficulty</span>
          <select
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
        </p>
        <p>
          <span>Monster Type</span>
          <select
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
        </p>
        {this.monsterApplicable() && (
          <p>
            <span>Levels</span>
            <select
              id="levelId"
              value={this.props.levelId}
              onChange={this.props.onChange}
            >
              {this.levelsOptions}
            </select>
          </p>
        )}
        {this.monsterApplicable() && (
          <p>
            <span>Monster</span>
            <select
              id="monster"
              value={this.props.monster}
              onChange={this.props.onChange}
            >
              {monsterOptions}
            </select>
          </p>
        )}
        {this.props.monsterType == MonsterType.SUPERUNIQUE && (
          <p>
            <span>Superunique</span>
            <select
              id="superunique"
              value={this.props.superunique}
              onChange={this.props.onChange}
            >
              {this.superuniqueElements}
            </select>
          </p>
        )}
        {this.props.monsterType == MonsterType.BOSS && (
          <p>
            <span>Boss</span>
            <select
              id="boss"
              value={this.props.boss}
              onChange={this.props.onChange}
            >
              {bossElements}
            </select>
          </p>
        )}
      </div>
    );
  }
}
