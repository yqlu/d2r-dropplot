import React, { useEffect, useState } from "react";
import { IDashboardPropType } from "./charts/common";
import { MagicFindChart } from "./charts/MagicFind";
import { RepeatedRunsChart } from "./charts/RepeatedRuns";
import { RARITY } from "./engine/itemratio-dict";

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
    </div>
  );
};
