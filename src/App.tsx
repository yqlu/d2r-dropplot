import React, { useEffect, useState } from "react";

import "./engine/tc";

import { useStateParams, idFunc, compute } from "./helpers";
import { PlayerForm, PlayerFormState } from "./PlayerForm";
import { MonsterForm, MonsterFormState } from "./MonsterForm";
import { Result } from "./Result";
import { SelectItemType } from "./ResultListing";
import { Dashboard } from "./Dashboard";

import { Difficulty, MonsterType } from "./engine/monstats-dict";
import { getTcAndMlvlFromMonster } from "./engine/monster";
import { RARITY } from "./engine/itemratio-dict";
import Fraction from "fraction.js";
import { Card } from "./components/Card";
import { ArrowIcon } from "./components/Icon";
import { MonsterFormInline } from "./MonsterFormInline";

const App = (): JSX.Element => {
  const [monsterFormState, setMonsterFormState] = useState({
    difficulty: Difficulty.HELL,
    monsterType: MonsterType.BOSS,
    levelId: 2, // Blood Moor
    monster: "zombie1",
    superunique: "Bishibosh",
    boss: "diablo",
  } as MonsterFormState);

  let [initTc, initMlvl] = getTcAndMlvlFromMonster(
    monsterFormState.difficulty,
    monsterFormState.monsterType,
    monsterFormState.levelId,
    monsterFormState.monster,
    monsterFormState.superunique,
    monsterFormState.boss
  );

  const [playerFormState, setPlayerFormState] = useState({
    partyCount: 1,
    playerCount: 1,
    magicFind: "0",
    tc: initTc,
    mlvl: `${initMlvl}`,
  } as PlayerFormState);

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(
    compute(playerFormState, "in first useState")
  );
  const [baseItemName, setBaseItemName] = useStateParams(
    "",
    "base",
    idFunc,
    idFunc
  );
  // const [itemName, setItemName] = useState("");
  const [itemName, setItemName] = useStateParams("", "itm", idFunc, idFunc);
  const [rarity, setRarity] = useStateParams(
    RARITY.WHITE,
    "r",
    (rarity: RARITY) => `${rarity}`,
    (str: string) => {
      if (str in RARITY) {
        return Number(str) as RARITY;
      }
      return RARITY.WHITE;
    }
  );
  const [selectedChance, setSelectedChance] = useState(new Fraction(0));
  const [scrollPosition, setScrollPosition] = useState(null as number | null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const errors = hasPlayerFormErrors(playerFormState, setErrors);
    if (!errors) {
      const newResults = compute(playerFormState, "in playerFormUseEffect");
      if (newResults) {
        setResults(newResults);
      }
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
    const newResult = results.filter((tuple) => {
      if (tuple[0] !== baseItemName) {
        return false;
      } else if (
        rarity === RARITY.SET &&
        tuple[2].sets.filter((setTuple) => setTuple[0] === itemName).length ===
          0
      ) {
        return false;
      } else if (
        rarity === RARITY.UNIQUE &&
        tuple[2].uniques.filter((uniqueTuple) => uniqueTuple[0] === itemName)
          .length === 0
      ) {
        return false;
      }
      return true;
    });
    if (newResult.length !== 1) {
      selectItem("", "", RARITY.WHITE, new Fraction(0));
    } else {
      let chance = newResult[0][1];
      if (rarity === RARITY.SET) {
        chance = chance.mul(newResult[0][2].quality[2]);
        for (const setTuple of newResult[0][2].sets) {
          if (setTuple[0] === itemName) {
            chance = chance.mul(setTuple[1]);
          }
        }
      }
      if (rarity === RARITY.UNIQUE) {
        chance = chance.mul(newResult[0][2].quality[3]);
        for (const uniqueTuple of newResult[0][2].uniques) {
          if (uniqueTuple[0] === itemName) {
            chance = chance.mul(uniqueTuple[1]);
          }
        }
      }
      selectItem(baseItemName, itemName, rarity, chance);
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
    const value = Number(event.target.value);
    setPlayerFormState((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      // Enforce restriction that playerCount >= partyCount always
      if (name === "partyCount") {
        newState.playerCount = Math.max(
          newState.playerCount,
          newState.partyCount
        );
      } else if (name === "playerCount") {
        newState.partyCount = Math.min(
          newState.playerCount,
          newState.partyCount
        );
      }
      return newState;
    });
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
    newBaseItemName: string,
    newItemName: string,
    newRarity: RARITY,
    newChance: Fraction
  ) => {
    setScrollPosition(window.scrollY);
    if (baseItemName !== newBaseItemName) {
      setBaseItemName(newBaseItemName);
    }
    if (itemName !== newItemName) {
      setItemName(newItemName);
    }
    if (rarity !== newRarity) {
      setRarity(newRarity);
    }
    if (selectedChance !== newChance) {
      setSelectedChance(newChance);
    }
  };

  const sidebarStyle = sidebarOpen ? "sidebar-open" : "sidebar-closed";

  return (
    <div className="flex text-gray-200">
      <aside
        className={
          "flex flex-col fixed left-0 top-0 text-xs h-screen bg-gray-900 border border-gray-800 z-20 rounded shadow " +
          sidebarStyle
        }
      >
        <div className="py-3 border border-gray-800 w-52">
          <PlayerForm
            partyCount={playerFormState.partyCount}
            playerCount={playerFormState.playerCount}
            magicFind={playerFormState.magicFind}
            tc={playerFormState.tc}
            mlvl={playerFormState.mlvl}
            errors={errors}
            onChange={onPlayerFormChange}
          />
          {/* <MonsterForm
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
          /> */}
        </div>
        <Result
          results={results}
          onSelectItem={selectItem}
          displayFull={sidebarOpen}
          baseItemName={baseItemName}
          itemName={itemName}
          rarity={rarity}
        />
        <div
          className="px-3 py-1 border border-gray-800 hover:bg-gray-600 select-none cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span>
            <span className="pr-2">
              <ArrowIcon sidebarOpen={sidebarOpen} />
            </span>
            {sidebarOpen ? "Contract" : "Expand"}{" "}
          </span>
        </div>
      </aside>
      <main className="flex-1 p-10 ml-52">
        <Card>
          <div className="text-xs">
            <MonsterFormInline
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
              baseItemName={baseItemName}
              itemName={itemName}
              rarity={rarity}
              selectedChance={selectedChance}
            />
          </div>
        </Card>
        {/* <div className="pt-4">
          <Dashboard
            playerFormState={playerFormState}
            results={results}
            baseItemName={baseItemName}
            itemName={itemName}
            rarity={rarity}
            selectedChance={selectedChance}
            onSelectItem={selectItem}
          />
        </div> */}
      </main>
      <div
        className={
          "fixed z-10 top-0 bottom-0 right-0 left-0 bg-neutral-800 transition-[opacity] " +
          (sidebarOpen ? "opacity-75" : "opacity-0 pointer-events-none")
        }
        onClick={() => {
          setSidebarOpen(false);
        }}
      ></div>
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

export default App;
