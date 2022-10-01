import React, { useEffect, useState } from "react";
import { IDashboardPropType, RUNE_REGEX } from "./charts/common";
import { MagicFindChart } from "./charts/MagicFind";
import { getDistribution, RepeatedRunsChart } from "./charts/RepeatedRuns";
import { PartyCountChart } from "./charts/PartyCount";
import { TreasureClassTreeMap } from "./charts/TCTreeMap";
import { RuneBars } from "./charts/RuneBars";
import { RarityBreakdownChart } from "./charts/RarityBreakdown";
import { TreasureClassStackedBars } from "./charts/TcStackedBars";
import { BinomialRunsChart } from "./charts/BinomialRuns";
import { NoDropChart } from "./charts/NoDrop";
import { Card } from "./components/Card";
import { qualityNotApplicable } from "./engine/rarity";
import { ArmorDict, WeaponsDict } from "./engine/weapon-armor-dict";
import { Distribution } from "./engine/distribution";
import { ZERO } from "./engine/polynomialOps";
import { canDropSunderCharm } from "./helpers";

export const Dashboard = ({
  playerFormState,
  monsterFormState,
  results,
  baseItemName,
  itemName,
  rarity,
  selectedChance,
  onSelectItem,
}: IDashboardPropType): JSX.Element => {
  let distribution: Distribution = Distribution.Atomic(ZERO);
  let atLeastOneChance = selectedChance;
  if (selectedChance.valueOf() > 0) {
    distribution = getDistribution(
      playerFormState,
      baseItemName,
      itemName,
      rarity,
      canDropSunderCharm(monsterFormState)
    );
    atLeastOneChance = distribution.eval().atLeastOneChance();
  }

  let magicFindApplicable = !qualityNotApplicable(baseItemName);
  let isWeaponOrArmor =
    WeaponsDict.hasOwnProperty(baseItemName) ||
    ArmorDict.hasOwnProperty(baseItemName);
  let isRune = RUNE_REGEX.test(baseItemName);
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-4 place-content-stretch">
        {selectedChance.valueOf() > 0 && (
          <React.Fragment>
            <Card canExpand={true}>
              <RepeatedRunsChart
                playerFormState={playerFormState}
                monsterFormState={monsterFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={atLeastOneChance}
                onSelectItem={onSelectItem}
              />
            </Card>
            <Card canExpand={true}>
              <BinomialRunsChart
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                distribution={distribution}
              />
            </Card>
            {magicFindApplicable && (
              <Card canExpand={true}>
                <MagicFindChart
                  playerFormState={playerFormState}
                  monsterFormState={monsterFormState}
                  results={results}
                  baseItemName={baseItemName}
                  itemName={itemName}
                  rarity={rarity}
                  selectedChance={selectedChance}
                  onSelectItem={onSelectItem}
                />
              </Card>
            )}
            {magicFindApplicable && (
              <Card canExpand={true}>
                <RarityBreakdownChart
                  playerFormState={playerFormState}
                  monsterFormState={monsterFormState}
                  results={results}
                  baseItemName={baseItemName}
                  itemName={itemName}
                  rarity={rarity}
                  selectedChance={selectedChance}
                  onSelectItem={onSelectItem}
                />
              </Card>
            )}
            <Card canExpand={true}>
              <PartyCountChart
                playerFormState={playerFormState}
                monsterFormState={monsterFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={selectedChance}
                onSelectItem={onSelectItem}
              />
            </Card>
            <Card canExpand={true}>
              <NoDropChart
                playerFormState={playerFormState}
                monsterFormState={monsterFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={selectedChance}
                onSelectItem={onSelectItem}
              />
            </Card>
            {isWeaponOrArmor && (
              <Card canExpand={true}>
                <TreasureClassStackedBars
                  playerFormState={playerFormState}
                  monsterFormState={monsterFormState}
                  results={results}
                  baseItemName={baseItemName}
                  itemName={itemName}
                  rarity={rarity}
                  selectedChance={selectedChance}
                  onSelectItem={onSelectItem}
                />
              </Card>
            )}
            {isWeaponOrArmor && (
              <Card canExpand={true}>
                <TreasureClassTreeMap
                  playerFormState={playerFormState}
                  monsterFormState={monsterFormState}
                  results={results}
                  baseItemName={baseItemName}
                  itemName={itemName}
                  rarity={rarity}
                  selectedChance={selectedChance}
                  onSelectItem={onSelectItem}
                />
              </Card>
            )}
            {isRune && (
              <Card canExpand={true}>
                <RuneBars
                  playerFormState={playerFormState}
                  monsterFormState={monsterFormState}
                  results={results}
                  baseItemName={baseItemName}
                  itemName={itemName}
                  rarity={rarity}
                  selectedChance={selectedChance}
                  onSelectItem={onSelectItem}
                />
              </Card>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
