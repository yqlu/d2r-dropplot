import React from "react";
import Fraction from "fraction.js";

import "./App.css";
import "./engine/tc";

import { Form } from "./Form";
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

type IAppPropType = { results: BaseItemProbTuple[] };

class App extends React.Component<any, IAppPropType> {
  constructor(props: any) {
    super(props);
    this.state = { results: [] };
  }

  compute(formState: any) {
    const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
    const tcCalculator = new TcCalculator(
      tcLookup,
      () => new BaseItemResultAggregator(formState.mlvl, formState.magicFind)
    );
    let tcs = tcCalculator
      .getAtomicTCs(formState.tc, formState.partyCount, formState.playerCount)
      .result();
    tcs = sortAlphabetical(
      tcs as unknown as TCProbTuple[]
    ) as unknown as BaseItemProbTuple[];
    this.setState({ results: tcs });
  }

  render() {
    return (
      <div className="App">
        <Form compute={this.compute.bind(this)} />
        <Result results={this.state.results} />
      </div>
    );
  }
}

export default App;
