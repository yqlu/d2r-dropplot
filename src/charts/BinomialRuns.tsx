import React, { useEffect } from "react";
import { range } from "lodash-es";
import { ChartTypeRegistry, InteractionMode, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import { binomialDistributionFunction } from "./common";
import { RARITY } from "../engine/itemratio-dict";
import { BaseItemProbTuple } from "../engine/resultAggregator";
import { IDashboardPropType, WHITE_COLOR, colorFromRarity } from "./common";

Chart.defaults.font.family =
  "'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.color = WHITE_COLOR;
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";

const getData = (
  results: BaseItemProbTuple[],
  baseItemName: string,
  itemName: string,
  rarity: RARITY
) => {
  let result = results.filter((tuple) => tuple[0] == baseItemName);
  if (result.length !== 1) {
    return {
      xs: [] as number[],
      ys: [] as number[],
    };
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
  const expectedRuns90Chance = Math.log(0.1) / Math.log(1 - singleRunChance);
  const ys = [];
  for (let x = 0; x < expectedRuns90Chance / 10; x++) {
    let y =
      binomialDistributionFunction(
        Math.round(expectedRuns90Chance),
        x,
        singleRunChance
      ) * 100;
    if (y > 1e-2) {
      ys.push(y);
    } else {
      break;
    }
  }
  const xs = range(ys.length);
  return {
    runs: Math.round(expectedRuns90Chance),
    xs,
    ys,
  };
};

export const BinomialRunsChart = ({
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
    const { xs, ys, runs } = getData(results, baseItemName, itemName, rarity);
    let ctx = (
      document.getElementById("binomialRunsChart") as HTMLCanvasElement
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
        interaction: {
          intersect: false,
          mode: "index" as InteractionMode,
        },
        plugins: {
          title: {
            display: true,
            text: `Chance vs number of items dropped over ${runs} runs`,
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (ctx: TooltipItem<"line">[]) => {
                return [
                  `${ctx[0].formattedValue}% chance`,
                  `to drop ${ctx[0].label} items`,
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
  }, [playerFormState, results, baseItemName, itemName, rarity]);

  return (
    <div>
      <canvas id="binomialRunsChart"></canvas>
    </div>
  );
};
