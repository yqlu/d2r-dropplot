import React, { useEffect, useState } from "react";
import { range } from "lodash-es";
import { ChartTypeRegistry, InteractionMode, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import { binomialDistributionFunction, colorClassFromRarity } from "./common";
import { IDashboardPropType, REGULAR_COLOR, colorFromRarity } from "./common";
import { Locale } from "../engine/locale-dict";
import { getXMax } from "./RepeatedRuns";
import { RARITY } from "../engine/itemratio-dict";
import { Distribution } from "../engine/distribution";

Chart.defaults.font.family =
  "'Noto Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.color = REGULAR_COLOR;
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";

const CLIPPING_COEFF = 1e-4;
const DIRECT_TO_BINOM_THRESHOLD = 10;

export type IBinomialPropType = {
  baseItemName: string;
  itemName: string;
  rarity: RARITY;
  distribution: Distribution;
};

const getBinomialXMax = (distribution: Distribution): number => {
  const raw = distribution.eval().coeffs.map((val) => val.valueOf());
  if (raw.length > 2 && raw[0] + raw[1] < 0.99) {
    return 1;
  }
  return getXMax(distribution.eval().expectation().valueOf());
};

const getData = (runs: number, distribution: Distribution) => {
  let ys = [];
  let [prevY, y] = [0, 0];
  if (runs <= 0) {
    return { xs: [], ys: [] };
  } else if (runs <= DIRECT_TO_BINOM_THRESHOLD) {
    let raisedDistribution = Distribution.Binomial(distribution, runs);
    raisedDistribution.simplify(CLIPPING_COEFF);
    ys = raisedDistribution.eval().coeffs.map((val) => val.valueOf() * 100);
  } else {
    // This is a bad approximation when expectation is high (because of multi-drop) -- close to 1
    // and completely breaks when expectation > 1 (e.g. for gld, Duriel)
    for (let x = 0; x <= runs; x++) {
      y = binomialDistributionFunction(
        runs,
        x,
        distribution.eval().expectation().valueOf()
      );
      if (y >= prevY || y > CLIPPING_COEFF || x <= 1) {
        ys.push(y * 100);
        prevY = y;
      } else {
        break;
      }
    }
  }
  const xs = range(ys.length);
  return {
    xs,
    ys,
  };
};

export const BinomialRunsChart = ({
  baseItemName,
  itemName,
  rarity,
  distribution,
}: IBinomialPropType): JSX.Element => {
  const [runs, setRuns] = useState(-1);
  useEffect(() => {
    if (distribution.eval().expectation().valueOf() > 0) {
      setRuns(getBinomialXMax(distribution));
    }
  }, [distribution]);
  useEffect(() => {
    if (
      baseItemName == "" ||
      distribution.eval().expectation().valueOf() <= 0
    ) {
      return;
    }
    const { xs, ys } = getData(runs, distribution);
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
