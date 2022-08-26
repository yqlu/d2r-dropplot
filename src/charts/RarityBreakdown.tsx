import React, { useEffect } from "react";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import {
  ChartTypeRegistry,
  SankeyControllerDatasetOptions,
  SankeyDataPoint,
  TooltipItem,
} from "chart.js";
import Chart from "chart.js/auto";
import Fraction from "fraction.js";

import { RARITY } from "../engine/itemratio-dict";
import { BaseItemProbTuple } from "../engine/resultAggregator";
import { Locale } from "../engine/locale-dict";
import {
  IDashboardPropType,
  REGULAR_COLOR,
  MAGIC_COLOR,
  RARE_COLOR,
  SET_COLOR,
  UNIQUE_COLOR,
} from "./common";

Chart.register(SankeyController, Flow);

const formatPercent = (num: number) => Math.round(num * 10000) / 100;

const getData = (results: BaseItemProbTuple[], baseItemName: string) => {
  let result = results.filter((tuple) => tuple[0] == baseItemName);
  if (result.length !== 1) {
    return { data: [], labels: {}, colors: {}, setUniqueDisplays: {} };
  }
  const value = result[0][2];
  // TODO: BETTER LABELS?
  // TODO: FORK FOR ALPHA
  const labels: Record<string, string> = { base: Locale(baseItemName) };
  const colors: Record<string, string> = {
    base: REGULAR_COLOR,
    normal: REGULAR_COLOR,
    magic: MAGIC_COLOR,
    rare: RARE_COLOR,
    set: SET_COLOR,
    unique: UNIQUE_COLOR,
  };
  const setUniqueDisplays: Record<string, Fraction> = {};
  const data: Array<SankeyDataPoint> = [];
  let normalChance = 1;
  if (value.quality[3].valueOf() > 0) {
    const prob = value.quality[3].valueOf();
    normalChance -= prob;
    labels["unique"] = "Unique";
    data.push({ from: "base", to: "unique", flow: prob });
    for (const unique of value.uniques) {
      labels[unique[0]] = Locale(unique[0]);
      colors[unique[0]] = UNIQUE_COLOR;
      data.push({
        from: "unique",
        to: unique[0],
        flow: unique[1].valueOf() * prob,
      });
      setUniqueDisplays[unique[0]] = unique[1];
    }
  }
  if (value.quality[2].valueOf() > 0) {
    const prob = value.quality[2].valueOf();
    normalChance -= prob;
    labels["set"] = "Set";
    data.push({ from: "base", to: "set", flow: prob });
    const sets = [...value.sets].sort(
      (a, b) => b[1].valueOf() - a[1].valueOf()
    );
    for (const [index, set] of sets.entries()) {
      labels[set[0]] = Locale(set[0]);
      colors[set[0]] = SET_COLOR;
      data.push({
        from: "set",
        to: set[0],
        flow: set[1].valueOf() * prob,
      });
      setUniqueDisplays[set[0]] = set[1];
    }
  }
  if (value.quality[1].valueOf() > 0) {
    const prob = value.quality[1].valueOf();
    normalChance -= prob;
    labels["rare"] = "Rare";
    data.push({ from: "base", to: "rare", flow: prob });
  }
  if (value.quality[0].valueOf() > 0) {
    const prob = value.quality[0].valueOf();
    normalChance -= prob;
    labels["magic"] = "Magic";
    data.push({ from: "base", to: "magic", flow: prob });
  }
  if (normalChance > 1e-6) {
    labels["normal"] = "Normal";
    data.push({ from: "base", to: "normal", flow: normalChance });
  }
  return { data, labels, colors, setUniqueDisplays };
};

export const RarityBreakdownChart = ({
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
    let ctx = (
      document.getElementById("rarityBreakdownChart") as HTMLCanvasElement
    )?.getContext("2d");

    const { data, labels, colors, setUniqueDisplays } = getData(
      results,
      baseItemName
    );

    if (data.length == 0) {
      return;
    }

    const config = {
      type: "sankey" as keyof ChartTypeRegistry,
      data: {
        datasets: [
          {
            label: "Item rarity breakdown",
            data: data,
            color: "white",
            colorFrom: (c) =>
              colors[c.dataset.data[c.dataIndex].from] ?? REGULAR_COLOR,
            colorTo: (c) =>
              colors[c.dataset.data[c.dataIndex].to] ?? REGULAR_COLOR,
            colorMode: "to",
            labels: labels,
            column: { normal: 1, magic: 1, rare: 1 },
            priority: {
              base: 0,
              normal: 4,
              magic: 3,
              rare: 2,
              set: 1,
              unique: 0,
            },
            borderWidth: 0,
          },
        ] as SankeyControllerDatasetOptions[],
      },
      options: {
        resizeDelay: 50,
        plugins: {
          title: {
            display: false,
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              title: () => "",
              label: (ctx: TooltipItem<"sankey">) => {
                const item = ctx.dataset.data[ctx.dataIndex];
                if (setUniqueDisplays[item.to]) {
                  const fraction = setUniqueDisplays[item.to];
                  return `${labels[item.to]}: ${fraction.n}/${
                    fraction.d
                  } chance if ${item.from} rolled`;
                }
                return `${labels[item.to]}: ${formatPercent(
                  item.flow
                )}% chance if base item rolled`;
              },
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
  }, [results, baseItemName]);

  return (
    <div>
      <div className="chartTitle">
        <span className="font-bold">{Locale(baseItemName)}</span> rarity
        breakdown
      </div>
      <canvas id="rarityBreakdownChart"></canvas>
    </div>
  );
};
