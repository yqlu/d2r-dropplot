import React from "react";
import Fraction from "fraction.js";

import "./App.css";
import "./engine/tc";

import { PlayerForm, PlayerFormProps, PlayerFormState } from "./PlayerForm";
import { Result } from "./Result";

import { TCDict } from "./engine/tc-dict";
import { AtomicDict } from "./engine/atomic-dict";
import { makeLookupTcFunction, TcCalculator } from "./engine/tc";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
  TCProbTuple,
} from "./engine/resultAggregator";
import { sortTCs, sortAlphabetical } from "./engine/display";

type IAppPropType = PlayerFormState & {
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
          this.compute(
            this.state.tc,
            this.state.partyCount,
            this.state.playerCount,
            parseInt(this.state.mlvl),
            parseInt(this.state.magicFind)
          );
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

  compute(
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
