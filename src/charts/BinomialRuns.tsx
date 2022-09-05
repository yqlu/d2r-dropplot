import React, { useEffect, useState } from "react";
import { range } from "lodash-es";
import { ChartTypeRegistry, InteractionMode, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import { binomialDistributionFunction, colorClassFromRarity } from "./common";
import { IDashboardPropType, REGULAR_COLOR, colorFromRarity } from "./common";
import { Locale } from "../engine/locale-dict";
import { getXMax } from "./RepeatedRuns";
import { createImportSpecifier } from "typescript";

Chart.defaults.font.family =
  "'Noto Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.color = REGULAR_COLOR;
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";

const getData = (runs: number, singleRunChance: number) => {
  const ys = [];
  let [prevY, y] = [0, 0];
  for (let x = 0; x <= Math.ceil(runs / 5); x++) {
    y = binomialDistributionFunction(runs, x, singleRunChance) * 100;
    if (y >= prevY || y > 1e-2 || x <= 1) {
      ys.push(y);
      prevY = y;
    } else {
      break;
    }
  }
  const xs = range(ys.length);
  return {
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
  selectedChance,
}: IDashboardPropType): JSX.Element => {
  const [runs, setRuns] = useState(-1);
  useEffect(() => {
    if (selectedChance.valueOf() > 0) {
      setRuns(getXMax(selectedChance.valueOf()));
    }
  }, [selectedChance]);
  useEffect(() => {
    if (baseItemName == "" || selectedChance.valueOf() <= 0) {
      return;
    }
    const { xs, ys } = getData(runs, selectedChance.valueOf());
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
              text: "Copies",
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
                  `to drop ${ctx[0].label} copies`,
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
  }, [runs]);

  const name = itemName === "" ? baseItemName : itemName;
  const styling = colorClassFromRarity(baseItemName, rarity);

  return (
    <div>
      <div className="chartTitle">
        Chance to drop x copies of{" "}
        <span className={"font-bold " + styling}>{Locale(name)}</span> over{" "}
        <input
          type="text"
          className="inline-textbox w-16"
          value={runs}
          onChange={(event) => setRuns(Number(event.target.value))}
        />{" "}
        runs
      </div>
      <canvas id="binomialRunsChart"></canvas>
    </div>
  );
};
