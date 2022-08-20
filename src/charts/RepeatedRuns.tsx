import React, { useEffect, useState } from "react";
import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
} from "../engine/resultAggregator";
import { IDashboardPropType, WHITE_COLOR, colorFromRarity } from "./common";
import { range, uniq } from "lodash-es";
import { ChartTypeRegistry } from "chart.js";
import Chart from "chart.js/auto";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict } from "../engine/tc-dict";
import { AtomicDict } from "../engine/atomic-dict";
import Fraction from "fraction.js";

Chart.defaults.font.family =
  "'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.color = WHITE_COLOR;
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";
const getXRange = (singleRunChance: number): number[] => {
  const divisions = 11;
  const expectedRuns90Chance = Math.log(0.1) / Math.log(1 - singleRunChance);
  if (expectedRuns90Chance <= 10) {
    return range(divisions);
  }
  const powerOf10 = Math.floor(Math.log10(expectedRuns90Chance));
  const leadingDigit = Math.floor(
    expectedRuns90Chance / Math.pow(10, powerOf10)
  );
  let max: number;
  if (leadingDigit <= 2) {
    max = (leadingDigit + 0.5) * Math.pow(10, powerOf10);
  } else {
    max = (leadingDigit + 1) * Math.pow(10, powerOf10);
  }
  return range(divisions).map((x) => (x * max) / (divisions - 1));
};

const getData = (
  results: BaseItemProbTuple[],
  baseItemName: string,
  itemName: string,
  rarity: RARITY
) => {
  let result = results.filter((tuple) => tuple[0] == baseItemName);
  if (result.length !== 1) {
    return { xs: [], ys: [] };
  }
  let singleRunChance = result[0][1].valueOf();
  if (itemName !== "") {
    // Get percentage of set / unique item
    const quality = result[0][2];
    if (rarity === RARITY.SET) {
      const relativeProb = quality.sets.find((tuple) => tuple[0] === itemName);
      if (relativeProb) {
        singleRunChance *=
          quality.quality[2].valueOf() * relativeProb[1].valueOf();
      }
    } else if (rarity === RARITY.UNIQUE) {
      const relativeProb = quality.uniques.find(
        (tuple) => tuple[0] === itemName
      );
      if (relativeProb) {
        singleRunChance *=
          quality.quality[3].valueOf() * relativeProb[1].valueOf();
      }
    }
  }
  const xs = getXRange(singleRunChance);
  const ys = xs.map(
    (x) => Math.floor((1 - Math.pow(1 - singleRunChance, x)) * 1000) / 10
  );
  return {
    xs,
    ys,
  };
};

export const RepeatedRunsChart = ({
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
    const { xs, ys } = getData(results, baseItemName, itemName, rarity);
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
            backgroundColor: colorFromRarity(rarity),
            borderColor: colorFromRarity(rarity),
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
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Cumulative Chance over Repeated Runs",
          },
          legend: {
            display: false,
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
  }, [playerFormState, results, baseItemName, itemName, rarity]);

  return (
    <div>
      <canvas id="repeatedRunsChart"></canvas>
    </div>
  );
};
