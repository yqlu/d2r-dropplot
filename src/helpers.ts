import { useState, useEffect } from "react";
import { LRUCache } from "typescript-lru-cache";

import { TCDict, TCDictType } from "./engine/tc-dict";
import { AtomicDict } from "./engine/atomic-dict";
import { makeLookupTcFunction, TcCalculator } from "./engine/tc";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
  ProbabilityAggregation,
} from "./engine/resultAggregator";
import { sortBaseItemAlphabetical } from "./engine/display";
import { PlayerFormState } from "./PlayerForm";
import Fraction from "fraction.js";
import { MonsterFormState } from "./MonsterFormInline";
import { MonsterType } from "./engine/monstats-dict";

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

export const isNumeric = (state: string) => /^[0-9]+$/.test(state);

export const compute = (() => {
  const cache = new LRUCache<string, BaseItemProbTuple[]>();
  return (
    playerFormState: PlayerFormState,
    monsterFormState: MonsterFormState
  ): BaseItemProbTuple[] => {
    const key = JSON.stringify({
      ...playerFormState,
      terrorZone: monsterFormState.terrorZone,
      playerLvl: monsterFormState.playerLvl,
    });
    console.time("compute");
    if (cache.peek(key)) {
      console.timeEnd("compute");
      return cache.get(key)!;
    } else {
      const value = _compute(playerFormState, monsterFormState);
      cache.set(key, value);
      console.timeEnd("compute");
      return value;
    }
  };
})();

const _compute = (
  playerFormState: PlayerFormState,
  monsterFormState: MonsterFormState
): BaseItemProbTuple[] => {
  const mlvl = parseInt(playerFormState.mlvl);
  const magicFind = parseInt(playerFormState.magicFind);

  let tcs: BaseItemProbTuple[];
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
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
  tcs = sortBaseItemAlphabetical(tcs) as BaseItemProbTuple[];
  return tcs;
};
