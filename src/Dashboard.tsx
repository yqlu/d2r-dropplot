import React, { useEffect, useState } from "react";
import { IDashboardPropType } from "./charts/common";
import { MagicFindChart } from "./charts/MagicFind";
import { RepeatedRunsChart } from "./charts/RepeatedRuns";
import { PartyCountChart } from "./charts/PartyCount";
import { RARITY } from "./engine/itemratio-dict";
import { RarityBreakdownChart } from "./charts/RarityBreakdown";

export const Dashboard = ({
  playerFormState,
  results,
  baseItemName,
  itemName,
  rarity,
}: IDashboardPropType): JSX.Element => {
  return (
    <div>
      {baseItemName} {itemName} {rarity}
      {baseItemName && (
        <React.Fragment>
          <MagicFindChart
            playerFormState={playerFormState}
            results={results}
            baseItemName={baseItemName}
            itemName={itemName}
            rarity={rarity}
          />
          <RepeatedRunsChart
            playerFormState={playerFormState}
            results={results}
            baseItemName={baseItemName}
            itemName={itemName}
            rarity={rarity}
          />
          <PartyCountChart
            playerFormState={playerFormState}
            results={results}
            baseItemName={baseItemName}
            itemName={itemName}
            rarity={rarity}
          />
          <RarityBreakdownChart
            playerFormState={playerFormState}
            results={results}
            baseItemName={baseItemName}
            itemName={itemName}
            rarity={rarity}
          />
        </React.Fragment>
      )}
    </div>
  );
};
