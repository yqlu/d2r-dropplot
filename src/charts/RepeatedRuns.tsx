import React, { useEffect, useState } from "react";
import { range } from "lodash-es";
import { ChartTypeRegistry, InteractionMode, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import {
  IDashboardPropType,
  colorFromRarity,
  colorClassFromRarity,
} from "./common";
import { Locale } from "../engine/locale-dict";
import Fraction from "fraction.js";

export const getXMax = (
  singleRunChance: number,
  intervals: number = 10
): number => {
  const expectedRuns90Chance = Math.log(0.1) / Math.log(1 - singleRunChance);
  if (expectedRuns90Chance <= intervals) {
    return intervals + 1;
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

const getData = (selectedChance: Fraction, runs: number) => {
  const singleRunChance = selectedChance.valueOf();
  const intervals = 10;
  const xs = range(intervals + 1).map((x) => (x * runs) / intervals);
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
  selectedChance,
}: IDashboardPropType): JSX.Element => {
  const [runs, setRuns] = useState(getXMax(selectedChance.valueOf()));
  useEffect(() => setRuns(getXMax(selectedChance.valueOf())), [selectedChance]);
  useEffect(() => {
    if (baseItemName == "") {
      return;
    }
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
                  `${ctx[0].formattedValue}% chance`,
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
  }, [playerFormState, results, baseItemName, itemName, rarity, runs]);

  const name = itemName === "" ? baseItemName : itemName;
  const styling = colorClassFromRarity(baseItemName, rarity);
  return (
    <div>
      <div className="chartTitle">
        Chance to drop at least one{" "}
        <span className={"font-bold " + styling}>{Locale(name)}</span> over{" "}
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
