import React, { useEffect, useState } from "react";
import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
} from "../engine/resultAggregator";
import {
  IDashboardPropType,
  WHITE_COLOR,
  MAGIC_COLOR,
  RARE_COLOR,
  SET_COLOR,
  UNIQUE_COLOR,
} from "./common";
import { range, uniq } from "lodash-es";
import { ChartTypeRegistry, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict } from "../engine/tc-dict";
import { AtomicDict } from "../engine/atomic-dict";
import Fraction from "fraction.js";

Chart.defaults.color = WHITE_COLOR;
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";

const calculateBaseItemProbability = (
  playerFormState: PlayerFormState,
  playerCount: number,
  baseItemName: string
) => {
  const mlvl = parseInt(playerFormState.mlvl);
  const magicFind = parseInt(playerFormState.magicFind);
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  const tcCalculator = new TcCalculator(
    tcLookup,
    () => new BaseItemResultAggregator(mlvl, magicFind)
  );
  const playerTcs = tcCalculator
    .getAtomicTCs(playerFormState.tc, playerCount, 1, new Set([baseItemName]))
    .result();
  const partyTcs = tcCalculator
    .getAtomicTCs(
      playerFormState.tc,
      playerCount,
      playerCount,
      new Set([baseItemName])
    )
    .result();
  if (playerTcs.length == 0) {
    const ZERO = new Fraction(0);
    return {
      player: ZERO,
      party: ZERO,
    };
  }
  return {
    player: playerTcs[0][1],
    party: partyTcs[0][1],
  };
};

const getData = (
  playerFormState: PlayerFormState,
  baseItemName: string,
  itemName: string,
  rarity: RARITY
) => {
  const xs = range(1, 9);
  const ys = xs.map((x) =>
    calculateBaseItemProbability(playerFormState, x, baseItemName)
  );
  return {
    xs,
    ys,
  };
};

const makePercent = (num: number) => num * 100; //Math.round(num * 10000) / 100;

export const PartyCountChart = ({
  playerFormState,
  results,
  baseItemName,
  itemName,
  rarity,
}: IDashboardPropType): JSX.Element => {
  useEffect(() => {
    if (baseItemName == "") {
      return;
    }
    const tension = 0.3;
    const { xs, ys } = getData(playerFormState, baseItemName, itemName, rarity);
    const player = {
      label: "Player",
      data: ys.map((val) => makePercent(val.player.valueOf())),
      backgroundColor: WHITE_COLOR,
      borderColor: WHITE_COLOR,
    };
    const party = {
      label: "Party",
      data: ys.map((val) => makePercent(val.party.valueOf())),
      backgroundColor: UNIQUE_COLOR,
      borderColor: UNIQUE_COLOR,
    };

    let ctx = (
      document.getElementById("partyCountChart") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "line" as keyof ChartTypeRegistry,
      data: {
        labels: xs,
        datasets: [party, player],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Chance %",
            },
          },
          x: {
            title: {
              display: true,
              text: "Count",
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index" as "index",
        },
        plugins: {
          title: {
            display: true,
            text: "Drop Rate vs Player Count",
          },
          tooltip: {
            callbacks: {
              title: () => "",
              label: (ctx: TooltipItem<"line">) =>
                `${ctx.dataset.label} ${ctx.label}: ${ctx.formattedValue}%`,
            },
          },
        },
      },
    };
    let chart: Chart;
    if (ctx) {
      chart = new Chart(ctx, config);
    }
    return () => {
      chart?.destroy();
    };
  }, [playerFormState, results, baseItemName, itemName]);

  return (
    <div>
      <canvas id="partyCountChart"></canvas>
    </div>
  );
};
