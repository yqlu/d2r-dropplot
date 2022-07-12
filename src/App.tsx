import React from "react";

import "./App.css";
import "./engine/tc";

import { PlayerForm, PlayerFormState } from "./PlayerForm";
import { MonsterForm, MonsterFormState } from "./MonsterForm";
import { Result } from "./Result";

import { TCDict } from "./engine/tc-dict";
import { AtomicDict } from "./engine/atomic-dict";
import { makeLookupTcFunction, TcCalculator } from "./engine/tc";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
  TCProbTuple,
} from "./engine/resultAggregator";
import { sortAlphabetical } from "./engine/display";
import { Difficulty, MonsterType } from "./engine/monstats-dict";
import { getTcAndMlvlFromMonster } from "./engine/monster";

type IAppPropType = PlayerFormState &
  MonsterFormState & {
    errors: { [key: string]: boolean };
    results: BaseItemProbTuple[];
  };

class App extends React.Component<{}, IAppPropType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      partyCount: 1,
      playerCount: 1,
      mlvl: "99",
      magicFind: "0",
      tc: "Gold",
      difficulty: Difficulty.HELL,
      monsterType: MonsterType.BOSS,
      levelId: 2, // Blood Moor
      monster: "zombie1",
      superunique: "Bishibosh",
      boss: "diablo",
      errors: {},
      results: [],
    };
  }

  render() {
    return (
      <div className="App">
        <PlayerForm
          partyCount={this.state.partyCount}
          playerCount={this.state.playerCount}
          mlvl={this.state.mlvl}
          magicFind={this.state.magicFind}
          tc={this.state.tc}
          errors={this.state.errors}
          onChange={this.onPlayerFormChange.bind(this)}
        />
        <MonsterForm
          difficulty={this.state.difficulty}
          monsterType={this.state.monsterType}
          levelId={this.state.levelId}
          monster={this.state.monster}
          superunique={this.state.superunique}
          boss={this.state.boss}
          errors={this.state.errors}
          onChange={this.onMonsterFormChange.bind(this)}
        />
        <Result results={this.state.results} />
      </div>
    );
  }

  onPlayerFormChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = event.target.id;
    this.setState<never>(
      {
        [name]: event.target.value,
      },
      () => {
        const errors = this.hasPlayerFormErrors();
        if (!errors) {
          this.compute();
        }
      }
    );
  }

  hasPlayerFormErrors(): boolean {
    const errors: { [key: string]: boolean } = {};
    if (!/^\d+$/.test(this.state.magicFind)) {
      errors.magicFind = true;
    }
    if (!/^\d+$/.test(this.state.mlvl)) {
      errors.mlvl = true;
    }
    this.setState({ errors: errors });
    return Object.keys(errors).length > 0;
  }

  onMonsterFormChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const name = event.target.id;
    let value: string | number = event.target.value;
    if (name === "difficulty" || name === "level" || name === "monsterType") {
      value = parseInt(value);
    }
    this.setState<never>(
      {
        [name]: value,
      },
      () => {
        let [tc, mlvl] = getTcAndMlvlFromMonster(
          this.state.difficulty,
          this.state.monsterType,
          this.state.levelId,
          this.state.monster,
          this.state.superunique,
          this.state.boss
        );
        if (!tc) {
          tc = "None";
        }
        this.setState(
          {
            tc: tc,
            mlvl: `${mlvl}`,
          },
          () => {
            this.compute();
          }
        );
      }
    );
  }

  compute() {
    this._compute(
      this.state.tc,
      this.state.partyCount,
      this.state.playerCount,
      parseInt(this.state.mlvl),
      parseInt(this.state.magicFind)
    );
  }

  _compute(
    tc: string,
    partyCount: number,
    playerCount: number,
    mlvl: number,
    magicFind: number
  ) {
    console.time("compute");
    const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
    const tcCalculator = new TcCalculator(
      tcLookup,
      () => new BaseItemResultAggregator(mlvl, magicFind)
    );
    let tcs = tcCalculator.getAtomicTCs(tc, partyCount, playerCount).result();
    tcs = sortAlphabetical(
      tcs as unknown as TCProbTuple[]
    ) as unknown as BaseItemProbTuple[];
    console.timeEnd("compute");
    this.setState({ results: tcs });
  }
}

export default App;
