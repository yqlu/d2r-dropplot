import React, { useEffect, useState } from "react";
import { range } from "lodash-es";
import { ChartTypeRegistry, InteractionMode, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";
import gaussian from "gaussian";
import {
  binomialDistributionFunction,
  colorClassFromRarity,
  formatPercent,
  poissonDistributionFunction,
} from "./common";
import { IDashboardPropType, REGULAR_COLOR, colorFromRarity } from "./common";
import { Locale } from "../engine/locale-dict";
import { getXMax } from "./RepeatedRuns";
import { RARITY } from "../engine/itemratio-dict";
import { Distribution, Polynomial } from "../engine/distribution";

Chart.defaults.font.family =
  "'Noto Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.color = REGULAR_COLOR;
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";

const CLIPPING_COEFF = 1e-4;
const DIRECT_TO_BINOM_THRESHOLD = 100;

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

const getData = (runs: number, polynomial: Polynomial) => {
  let ys: number[] = [];
  let [prevY, y] = [0, 0];
  if (runs <= 0) {
    return { xs: [], ys: [] };
  } else if (
    // For complicated distributions and low powers, exponentiate directly
    polynomial.coeffs.length > 2 &&
    runs <= DIRECT_TO_BINOM_THRESHOLD
  ) {
    let raisedDistribution = Distribution.Binomial(polynomial, runs);
    raisedDistribution.simplify(CLIPPING_COEFF);
    ys = raisedDistribution.eval().coeffs.map((val) => val.valueOf() * 100);
  } else {
    // Reduce to a binomial distribution
    let n = runs;
    let p = polynomial.expectation().valueOf();
    // If this is a complicated distribution, find the equivalent B(n,p) that matches
    // the expectation runs * exp and the variance runs * variance.
    if (p > 0.2 && polynomial.coeffs.length > 2) {
      const exp = polynomial.expectation().valueOf();
      const variance = polynomial.variance().valueOf();
      p = 1 - variance / exp;
      n = Math.round((runs * exp * exp) / (exp - variance));
    }
    if (n > 20 && n * p < 5) {
      // approximate with poisson
      const lambda = n * p;
      for (let k = 0; k <= n; k++) {
        y = poissonDistributionFunction(lambda, k);
        if (k <= 1 || y >= prevY || y > CLIPPING_COEFF) {
          ys.push(y * 100);
          prevY = y;
        } else {
          break;
        }
      }
    } else if (n * p > 100 && n * (1 - p) > 100) {
      const mu = n * p;
      const sigma = Math.sqrt(n * p * (1 - p));
      // approximate with normal
      const normalDistribution = gaussian(
        mu,
        sigma * sigma,
        runs * polynomial.variance().valueOf()
      );
      for (let k = 0; k <= n; k += 1) {
        y = normalDistribution.cdf(k + 0.5) - normalDistribution.cdf(k - 0.5);
        if (k <= 1 || y >= prevY || y > CLIPPING_COEFF) {
          ys.push(y * 100);
          prevY = y;
        } else {
          break;
        }
      }
    } else {
      // Resort to the binomial
      for (let k = 0; k <= n; k++) {
        y = binomialDistributionFunction(n, k, p);
        if (k <= 1 || y >= prevY || y > CLIPPING_COEFF) {
          ys.push(y * 100);
          prevY = y;
        } else {
          break;
        }
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
  const polynomial = distribution.eval();
  const [runs, setRuns] = useState(-1);
  const [cumulative, setCumulative] = useState(false);
  useEffect(() => {
    if (polynomial.expectation().valueOf() > 0) {
      setRuns(getBinomialXMax(polynomial));
    }
  }, [polynomial]);
  useEffect(() => {
    if (baseItemName == "" || polynomial.eval().expectation().valueOf() <= 0) {
      return;
    }
    let { xs, ys } = getData(runs, polynomial);
    if (cumulative) {
      // https://stackoverflow.com/questions/20477177/creating-an-array-of-cumulative-sum-in-javascript
      ys = ys.map(
        (
          (sum) => (value) =>
            (sum += value)
        )(0)
      );
    }
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
                  `${formatPercent(ctx[0].raw as number)}% chance`,
                  `to drop ${ctx[0].label} ${
                    cumulative ? "or fewer " : ""
                  }copies`,
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
  }, [runs, cumulative]);

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
      <div className="chartSubtitle">
        <input
          type="checkbox"
          checked={cumulative}
          onChange={(event) => setCumulative(!cumulative)}
        />{" "}
        Cumulative
      </div>
      <canvas id="binomialRunsChart"></canvas>
    </div>
  );
};
