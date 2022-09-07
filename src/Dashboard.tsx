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

export const Dashboard = ({
  playerFormState,
  results,
  baseItemName,
  itemName,
  rarity,
  selectedChance,
  onSelectItem,
}: IDashboardPropType): JSX.Element => {
  const distribution = getDistribution(
    playerFormState,
    baseItemName,
    itemName,
    rarity
  );
  const atLeastOneChance = distribution.eval().atLeastOneChance();

  let magicFindApplicable = !qualityNotApplicable(baseItemName);
  let isWeaponOrArmor =
    WeaponsDict.hasOwnProperty(baseItemName) ||
    ArmorDict.hasOwnProperty(baseItemName);
  let isRune = RUNE_REGEX.test(baseItemName);
  return (
    <div>
      <div className="grid grid-cols-1  gap-4 place-content-stretch">
        {baseItemName && (
          <React.Fragment>
            <Card>
              <RepeatedRunsChart
                playerFormState={playerFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={atLeastOneChance}
                onSelectItem={onSelectItem}
              />
            </Card>
            <Card>
              <BinomialRunsChart
                playerFormState={playerFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={atLeastOneChance}
                onSelectItem={onSelectItem}
              />
            </Card>
            {magicFindApplicable && (
              <Card>
                <MagicFindChart
                  playerFormState={playerFormState}
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
              <Card>
                <RarityBreakdownChart
                  playerFormState={playerFormState}
                  results={results}
                  baseItemName={baseItemName}
                  itemName={itemName}
                  rarity={rarity}
                  selectedChance={selectedChance}
                  onSelectItem={onSelectItem}
                />
              </Card>
            )}
            <Card>
              <PartyCountChart
                playerFormState={playerFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={selectedChance}
                onSelectItem={onSelectItem}
              />
            </Card>
            <Card>
              <NoDropChart
                playerFormState={playerFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={selectedChance}
                onSelectItem={onSelectItem}
              />
            </Card>
            {isWeaponOrArmor && (
              <Card>
                <TreasureClassStackedBars
                  playerFormState={playerFormState}
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
              <Card>
                <TreasureClassTreeMap
                  playerFormState={playerFormState}
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
              <Card>
                <RuneBars
                  playerFormState={playerFormState}
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
