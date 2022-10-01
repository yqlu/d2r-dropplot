import React, { useEffect, useState } from "react";
import { range } from "lodash-es";
import { ChartTypeRegistry, InteractionMode, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import { IDashboardPropType, colorFromRarity, formatPercent } from "./common";
import Fraction from "fraction.js";
import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict } from "../engine/tc-dict";
import { AtomicDict } from "../engine/atomic-dict";
import { BaseItemDistributionAggregator } from "../engine/resultAggregator";
import { getRarityMultiplier } from "../engine/rarity";
import { Distribution } from "../engine/distribution";
import { ONE } from "../engine/polynomialOps";
import { ItemDisplayName } from "../components/ItemDisplayName";

export const getXMax = (
  singleRunChance: number,
  intervals: number = 10
): number => {
  const expectedRuns90Chance = Math.log(0.1) / Math.log(1 - singleRunChance);
  if (expectedRuns90Chance <= intervals) {
    return intervals;
  }
  const powerOf10 = Math.floor(Math.log10(expectedRuns90Chance));
  const leadingDigit = Math.floor(
    expectedRuns90Chance / Math.pow(10, powerOf10)
  );
  let max: number;
  if (leadingDigit <= 2) {
    max = (leadingDigit + 0.5) * Math.pow(10, powerOf10);
    if (max < expectedRuns90Chance) {
      max = (leadingDigit + 1) * Math.pow(10, powerOf10);
    }
  } else {
    max = (leadingDigit + 1) * Math.pow(10, powerOf10);
  }
  return max;
};

const getData = (atLeastOneChance: Fraction, runs: number) => {
  const singleRunChance = atLeastOneChance.valueOf();
  const intervals = Math.min(runs, 10);
  const xs = range(intervals + 1).map((x) =>
    Math.round((x * runs) / intervals)
  );
  const ys = xs.map((x) => (1 - Math.pow(1 - singleRunChance, x)) * 100);
  return {
    xs,
    ys,
  };
};

export const getDistribution = (
  playerFormState: PlayerFormState,
  baseItemName: string,
  itemName: string,
  rarity: RARITY,
  canDropSunderCharm: boolean
) => {
  const mlvl = parseInt(playerFormState.mlvl);
  const magicFind = parseInt(playerFormState.magicFind);
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  const tcCalculator = new TcCalculator(
    tcLookup,
    () =>
      new BaseItemDistributionAggregator(mlvl, magicFind, canDropSunderCharm)
  );
  let tcs = tcCalculator
    .getAtomicTCs(
      playerFormState.tc,
      playerFormState.playerCount,
      playerFormState.partyCount,
      new Set([baseItemName])
    )
    .result();
  if (tcs.length === 0) {
    return Distribution.Atomic(ONE);
  }
  let distribution: Distribution = tcs[0][1].eval();
  if (rarity !== RARITY.WHITE) {
    const itemRarityChance = getRarityMultiplier(tcs[0][2], rarity, itemName);
    const child = Distribution.Atomic(itemRarityChance);
    distribution = Distribution.Substitute(distribution, child);
  }
  distribution.simplify();
  return distribution;
};

export const RepeatedRunsChart = ({
  playerFormState,
  results,
  baseItemName,
  itemName,
  rarity,
  selectedChance,
}: IDashboardPropType): JSX.Element => {
  const [runs, setRuns] = useState(getXMax(selectedChance.valueOf()));

  useEffect(
    () => setRuns(getXMax(selectedChance.valueOf())),
    [baseItemName, itemName, rarity]
  );
  useEffect(() => {
    const { xs, ys } = getData(selectedChance, runs);
    let ctx = (
      document.getElementById("repeatedRunsChart") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "line" as keyof ChartTypeRegistry,
      data: {
        labels: xs,
        datasets: [
          {
            data: ys,
            backgroundColor: colorFromRarity(baseItemName, rarity),
            borderColor: colorFromRarity(baseItemName, rarity),
          },
        ],
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
              text: "Runs",
            },
            type: "linear",
          },
        },
        interaction: {
          intersect: false,
          mode: "index" as InteractionMode,
        },
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (ctx: TooltipItem<"line">[]) => {
                return [
                  `${formatPercent(ctx[0].raw as number)}% chance`,
                  `over ${ctx[0].label} runs`,
                ];
              },
              label: () => "",
            },
            displayColors: false,
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
  }, [selectedChance.valueOf(), baseItemName, itemName, rarity, runs]);

  return (
    <div>
      <div className="chartTitle">
        Chance to drop at least one{" "}
        <span className="font-bold">
          <ItemDisplayName
            itemName={itemName}
            baseItemName={baseItemName}
            rarity={rarity}
          ></ItemDisplayName>
        </span>{" "}
        over{" "}
        <input
          type="text"
          className="inline-textbox w-16"
          value={runs}
          onChange={(event) => setRuns(Number(event.target.value))}
        />{" "}
        runs
      </div>
      <canvas id="repeatedRunsChart"></canvas>
    </div>
  );
};
