import { useState, useEffect } from "react";
import { LRUCache } from "typescript-lru-cache";

import { TCDict, TCDictType } from "./engine/tc-dict";
import { AtomicDict } from "./engine/atomic-dict";
import { makeLookupTcFunction, TcCalculator } from "./engine/tc";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
  BaseItemDistributionAggregator,
  ProbabilityAggregation,
} from "./engine/resultAggregator";
import { sortBaseItemAlphabetical } from "./engine/display";
import { PlayerFormState } from "./PlayerForm";
import Fraction from "fraction.js";

export function useStateParams<T>(
  initialState: T,
  paramsName: string,
  serialize: (state: T) => string,
  deserialize: (state: string) => T
): [T, (state: T) => void] {
  const search = new URLSearchParams(document.location.search);

  const existingValue = search.get(paramsName);
  const [state, setState] = useState<T>(
    existingValue ? deserialize(existingValue) : initialState
  );

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      setState(deserialize(existingValue));
    }
  }, [existingValue]);

  const onChange = (s: T) => {
    setState(s);
    const url = new URL(document.location.toString());
    if (s === initialState) {
      url.searchParams.delete(paramsName);
    } else {
      url.searchParams.set(paramsName, serialize(s));
    }
    window.history.pushState(null, "", url.toString());
  };

  return [state, onChange];
}

export const idFunc = (state: string) => state;

export const compute = (() => {
  const cache = new LRUCache<string, BaseItemProbTuple[]>();
  return (
    playerFormState: PlayerFormState,
    debugContext: string
  ): BaseItemProbTuple[] => {
    const key = JSON.stringify(playerFormState);
    console.time("compute");
    if (cache.peek(key)) {
      console.timeEnd("compute");
      return cache.get(key)!;
    } else {
      const value = _compute(playerFormState);
      cache.set(key, value);
      console.timeEnd("compute");
      return value;
    }
  };
})();

const _compute = (playerFormState: PlayerFormState): BaseItemProbTuple[] => {
  const mlvl = parseInt(playerFormState.mlvl);
  const magicFind = parseInt(playerFormState.magicFind);

  const experiment = false;
  let tcs: BaseItemProbTuple[];
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  if (experiment) {
    const tcCalculator = new TcCalculator(
      tcLookup,
      () => new BaseItemDistributionAggregator(mlvl, magicFind)
    );
    const tcDistributionTuples = tcCalculator
      .getAtomicTCs(
        playerFormState.tc,
        playerFormState.playerCount,
        playerFormState.partyCount
      )
      .result();
    tcs = tcDistributionTuples.map((tuple) => [
      tuple[0],
      tuple[1].eval().expectation(),
      tuple[2],
    ]);
  } else {
    const tcCalculator = new TcCalculator(
      tcLookup,
      () =>
        new BaseItemResultAggregator(
          mlvl,
          magicFind,
          ProbabilityAggregation.EXPECTED_VALUE
        )
    );
    tcs = tcCalculator
      .getAtomicTCs(
        playerFormState.tc,
        playerFormState.playerCount,
        playerFormState.partyCount
      )
      .result();
  }
  tcs = sortBaseItemAlphabetical(tcs) as BaseItemProbTuple[];
  return tcs;
};
