import React, { useEffect, useState } from "react";
import { PlayerFormState } from "./PlayerForm";
import { RARITY } from "./engine/itemratio-dict";
import { BaseItemProbTuple } from "./engine/resultAggregator";

type IDashboardPropType = {
  playerFormState: PlayerFormState;
  results: BaseItemProbTuple[];
  itemName: string;
  rarity: RARITY;
};

export const Dashboard = ({
  playerFormState,
  results,
  itemName,
  rarity,
}: IDashboardPropType): JSX.Element => {
  return (
    <div>
      {itemName} {rarity}
    </div>
  );
};
