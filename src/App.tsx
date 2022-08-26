import React, { useEffect, useState } from "react";

import "./App.css";
import "./engine/tc";

import { PlayerForm, PlayerFormState } from "./PlayerForm";
import { MonsterForm, MonsterFormState } from "./MonsterForm";
import { Result, SelectItemType } from "./Result";
import { Dashboard } from "./Dashboard";

import { TCDict, TCDictType } from "./engine/tc-dict";
import { AtomicDict } from "./engine/atomic-dict";
import { makeLookupTcFunction, TcCalculator } from "./engine/tc";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
  TCProbTuple,
  TCResultAggregator,
} from "./engine/resultAggregator";
import { sortAlphabetical } from "./engine/display";
import { Difficulty, MonsterType } from "./engine/monstats-dict";
import { getTcAndMlvlFromMonster } from "./engine/monster";
import { RARITY } from "./engine/itemratio-dict";
import Fraction from "fraction.js";

const App = (): JSX.Element => {
  const [playerFormState, setPlayerFormState] = useState({
    partyCount: 1,
    playerCount: 1,
    mlvl: "99",
    magicFind: "0",
    tc: "Gold",
  } as PlayerFormState);
  const [monsterFormState, setMonsterFormState] = useState({
    difficulty: Difficulty.HELL,
    monsterType: MonsterType.BOSS,
    levelId: 2, // Blood Moor
    monster: "zombie1",
    superunique: "Bishibosh",
    boss: "diablo",
  } as MonsterFormState);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([] as BaseItemProbTuple[]);
  const [baseItemName, setBaseItemName] = useState("");
  const [itemName, setItemName] = useState("");
  const [rarity, setRarity] = useState(RARITY.WHITE);
  const [selectedChance, setSelectedChance] = useState(new Fraction(0));
  const [scrollPosition, setScrollPosition] = useState(null as number | null);

  useEffect(() => {
    const errors = hasPlayerFormErrors(playerFormState, setErrors);
    if (!errors) {
      compute(playerFormState, setResults);
    }
  }, [playerFormState]);

  useEffect(() => {
    if (monsterFormState.monsterType === MonsterType.TREASURE_CLASS) {
      return;
    }
    let [tc, mlvl] = getTcAndMlvlFromMonster(
      monsterFormState.difficulty,
      monsterFormState.monsterType,
      monsterFormState.levelId,
      monsterFormState.monster,
      monsterFormState.superunique,
      monsterFormState.boss
    );
    if (!tc) {
      tc = "None";
    }
    setPlayerFormState((prevState) => ({
      ...prevState,
      tc: tc,
      mlvl: `${mlvl}`,
    }));
  }, [monsterFormState]);

  useEffect(() => {
    if (results.filter((tuple) => tuple[0] == baseItemName).length !== 1) {
      selectItem("", "", RARITY.WHITE, new Fraction(0));
    }
  }, [results]);

  useEffect(() => {
    if (scrollPosition) {
      window.scrollTo(window.scrollX, scrollPosition);
    }
  }, [scrollPosition]);

  const onPlayerFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.id;
    setPlayerFormState((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const onMonsterFormChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.id;
    let value: string | number = event.target.value;
    if (name === "difficulty" || name === "level" || name === "monsterType") {
      value = parseInt(value);
    }
    setMonsterFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectItem: SelectItemType = (
    baseItemName,
    itemName,
    rarity,
    chance
  ) => {
    setScrollPosition(window.scrollY);
    setBaseItemName(baseItemName);
    setItemName(itemName);
    setRarity(rarity);
    setSelectedChance(chance);
  };

  return (
    <div className="flex text-gray-200">
      <aside className="w-44 fixed left-0 top-0 text-xs h-screen">
        <PlayerForm
          partyCount={playerFormState.partyCount}
          playerCount={playerFormState.playerCount}
          magicFind={playerFormState.magicFind}
          tc={playerFormState.tc}
          mlvl={playerFormState.mlvl}
          errors={errors}
          onChange={onPlayerFormChange}
        />
        <MonsterForm
          difficulty={monsterFormState.difficulty}
          monsterType={monsterFormState.monsterType}
          levelId={monsterFormState.levelId}
          monster={monsterFormState.monster}
          superunique={monsterFormState.superunique}
          boss={monsterFormState.boss}
          tc={playerFormState.tc}
          mlvl={playerFormState.mlvl}
          errors={errors}
          onPlayerFormChange={onPlayerFormChange}
          onMonsterFormChange={onMonsterFormChange}
        />
        <div className="resultParent h-full overflow-y-auto">
          <Result results={results} onSelectItem={selectItem} />
        </div>{" "}
      </aside>
      <main className="flex-1 p-10 ml-44">
        <Dashboard
          playerFormState={playerFormState}
          results={results}
          baseItemName={baseItemName}
          itemName={itemName}
          rarity={rarity}
          selectedChance={selectedChance}
          onSelectItem={selectItem}
        />
      </main>
    </div>
  );
};

const hasPlayerFormErrors = (
  playerFormState: PlayerFormState,
  setErrors: React.Dispatch<React.SetStateAction<{}>>
): boolean => {
  const errors: { [key: string]: boolean } = {};
  if (!/^\d+$/.test(playerFormState.magicFind)) {
    errors.magicFind = true;
  }
  if (!/^\d+$/.test(playerFormState.mlvl)) {
    errors.mlvl = true;
  }
  setErrors(errors);
  return Object.keys(errors).length > 0;
};

const compute = (
  playerFormState: PlayerFormState,
  setResults: React.Dispatch<React.SetStateAction<BaseItemProbTuple[]>>
) => {
  console.time("compute");
  const mlvl = parseInt(playerFormState.mlvl);
  const magicFind = parseInt(playerFormState.magicFind);

  const atomic = true;
  let tcs: BaseItemProbTuple[];
  if (atomic) {
    const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
    const tcCalculator = new TcCalculator(
      tcLookup,
      () => new BaseItemResultAggregator(mlvl, magicFind)
    );
    let tcsCast = tcCalculator
      .getAtomicTCs(
        playerFormState.tc,
        playerFormState.partyCount,
        playerFormState.playerCount
      )
      .result();
    const ZERO = new Fraction(0);
    tcs = sortAlphabetical(
      tcsCast as unknown as TCProbTuple[]
    ) as unknown as BaseItemProbTuple[];
  } else {
    const tcLookup = makeLookupTcFunction(TCDict, {} as TCDictType);
    const tcCalculator = new TcCalculator<TCProbTuple[]>(
      tcLookup,
      () => new TCResultAggregator()
    );

    let tcsCast = tcCalculator
      .getAtomicTCs(
        playerFormState.tc,
        playerFormState.partyCount,
        playerFormState.playerCount
      )
      .result();
    const ZERO = new Fraction(0);
    tcs = sortAlphabetical(tcsCast as unknown as TCProbTuple[]).map(
      (tuple) =>
        [
          tuple[0],
          tuple[1],
          { quality: [ZERO, ZERO, ZERO, ZERO], sets: [], uniques: [] },
        ] as BaseItemProbTuple
    );
  }
  console.timeEnd("compute");
  setResults(tcs);
};

export default App;
