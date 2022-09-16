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
import {
  getMonsterList,
  monsterApplicable,
  MonsterFormInline,
} from "./MonsterFormInline";
import { getRarityMultiplier } from "./engine/rarity";
import { Navbar } from "./Navbar";
import { MobileInfoCard } from "./MobileInfoCard";

const App = (): JSX.Element => {
  const [monsterFormState, setMonsterFormState] = useState({
    difficulty: Difficulty.HELL,
    monsterType: MonsterType.BOSS,
    levelId: 2, // Blood Moor
    monster: "zombie1",
    superunique: "The Countess",
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
    "amu",
    "base",
    idFunc,
    idFunc
  );
  const [itemName, setItemName] = useStateParams(
    "Mara's Kaleidoscope",
    "itm",
    idFunc,
    idFunc
  );
  const [rarity, setRarity] = useStateParams(
    RARITY.UNIQUE,
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
  const [mobileFormOpen, setMobileFormOpen] = useState(false);

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
      chance = chance.mul(
        getRarityMultiplier(newResult[0][2], rarity, itemName)
      );
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
    let value: string | number = event.target.value;
    if (name !== "tc") {
      value = Number(value);
    }
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
    const name = event.target.id as keyof MonsterFormState;
    let value: string | number = event.target.value;
    if (name === "difficulty" || name === "mlvl" || name === "monsterType") {
      value = parseInt(value);
    }
    setMonsterFormState((prevState) => {
      const res = {
        ...prevState,
        [name]: value,
      };
      if (
        monsterApplicable(res.monsterType) &&
        (name === "levelId" || name === "difficulty" || name === "monsterType")
      ) {
        const monsterList = getMonsterList(
          res.levelId,
          res.difficulty,
          res.monsterType
        );
        if (monsterList.length > 0 && monsterList.indexOf(res.monster) === -1) {
          res.monster = monsterList[0];
        }
      }
      return res;
    });
  };

  const selectItem: SelectItemType = (
    newBaseItemName: string,
    newItemName: string,
    newRarity: RARITY,
    newChance: Fraction
  ) => {
    setScrollPosition(window.scrollY);
    setBaseItemName(newBaseItemName);
    setItemName(newItemName);
    setRarity(newRarity);
    setSelectedChance(newChance);
    if (
      (newBaseItemName !== "" && newBaseItemName !== baseItemName) ||
      (newItemName !== "" && newItemName !== itemName)
    ) {
      setMobileFormOpen(false);
    }
  };

  const sidebarStyle = sidebarOpen ? "sidebar-open" : "sidebar-closed";

  return (
    <div className="text-gray-200 ">
      <Navbar></Navbar>
      <aside
        className={
          "flex flex-col fixed left-0 top-11 bottom-0 text-xs bg-gray-900 border-r border-gray-800 z-20 shadow invisible sm:visible " +
          sidebarStyle
        }
      >
        <div className="pt-3 w-52">
          <PlayerForm
            partyCount={playerFormState.partyCount}
            playerCount={playerFormState.playerCount}
            magicFind={playerFormState.magicFind}
            tc={playerFormState.tc}
            mlvl={playerFormState.mlvl}
            errors={errors}
            onChange={onPlayerFormChange}
          />
        </div>
        <Result
          isDesktop={true}
          results={results}
          onSelectItem={selectItem}
          displayFull={sidebarOpen}
          baseItemName={baseItemName}
          itemName={itemName}
          rarity={rarity}
        />
        <div
          className="px-3 py-1 border-t border-gray-800 hover:bg-gray-600 select-none cursor-pointer"
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
      <div className="flex relative pt-12">
        <main className="flex-1 p-2 sm:px-6 lg:px-8 xl:px-10 sm:ml-52">
          <div className="hidden sm:block">
            <Card canExpand={false}>
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
            </Card>
          </div>
          <div className="block sm:hidden">
            <Card canExpand={false} editAction={() => setMobileFormOpen(true)}>
              <MobileInfoCard
                difficulty={monsterFormState.difficulty}
                monsterType={monsterFormState.monsterType}
                levelId={monsterFormState.levelId}
                monster={monsterFormState.monster}
                superunique={monsterFormState.superunique}
                boss={monsterFormState.boss}
                tc={playerFormState.tc}
                mlvl={playerFormState.mlvl}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={selectedChance}
              ></MobileInfoCard>
            </Card>
          </div>
          <div className="pt-2 sm:pt-4">
            <Dashboard
              playerFormState={playerFormState}
              results={results}
              baseItemName={baseItemName}
              itemName={itemName}
              rarity={rarity}
              selectedChance={selectedChance}
              onSelectItem={selectItem}
            />
          </div>
        </main>
        {mobileFormOpen && (
          <div className="block sm:hidden fixed top-11 left-0 bottom-0 right-0 text-sm bg-gray-900 overflow-y-scroll">
            <div
              className="w-full text-left p-3 cursor-pointer bg-gray-900 sticky top-0 hover:bg-gray-800 cursor-pointer"
              onClick={() => setMobileFormOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left inline-block mb-0.5"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span className="pl-2">Charts</span>
            </div>
            <div className="pb-3 border-b border-gray-800">
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
            </div>
            <Result
              isDesktop={false}
              results={results}
              onSelectItem={selectItem}
              displayFull={sidebarOpen}
              baseItemName={baseItemName}
              itemName={itemName}
              rarity={rarity}
            />
          </div>
        )}
        <div
          className={
            "hidden sm:block fixed z-10 top-0 bottom-0 right-0 left-0 bg-neutral-800 transition-[opacity] " +
            (sidebarOpen ? "opacity-75" : "opacity-0 pointer-events-none")
          }
          onClick={() => {
            setSidebarOpen(false);
          }}
        ></div>
      </div>
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
