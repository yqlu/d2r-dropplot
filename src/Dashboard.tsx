import React, { useEffect, useState } from "react";
import { IDashboardPropType, RUNE_REGEX } from "./charts/common";
import { MagicFindChart } from "./charts/MagicFind";
import { RepeatedRunsChart } from "./charts/RepeatedRuns";
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
}: IDashboardPropType): JSX.Element => {
  let magicFindApplicable = !qualityNotApplicable(baseItemName);
  let isWeaponOrArmor =
    WeaponsDict.hasOwnProperty(baseItemName) ||
    ArmorDict.hasOwnProperty(baseItemName);
  let isRune = RUNE_REGEX.test(baseItemName);
  return (
    <div>
      {baseItemName} {itemName} {rarity}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 place-content-stretch">
        {baseItemName && (
          <React.Fragment>
            {magicFindApplicable && (
              <Card>
                <MagicFindChart
                  playerFormState={playerFormState}
                  results={results}
                  baseItemName={baseItemName}
                  itemName={itemName}
                  rarity={rarity}
                  selectedChance={selectedChance}
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
                />
              </Card>
            )}
            <Card>
              <RepeatedRunsChart
                playerFormState={playerFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={selectedChance}
              />
            </Card>
            <Card>
              <BinomialRunsChart
                playerFormState={playerFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={selectedChance}
              />
            </Card>
            <Card>
              <PartyCountChart
                playerFormState={playerFormState}
                results={results}
                baseItemName={baseItemName}
                itemName={itemName}
                rarity={rarity}
                selectedChance={selectedChance}
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
                />
              </Card>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
