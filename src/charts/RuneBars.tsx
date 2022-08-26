import React, { useEffect, useState } from "react";
import { max, range, sortBy, sum } from "lodash-es";
import { ChartDataset, ScriptableContext, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import { BaseItemProbTuple } from "../engine/resultAggregator";
import { Locale } from "../engine/locale-dict";

import {
  IDashboardPropType,
  REGULAR_COLOR,
  RUNE_COLOR,
  RUNE_REGEX,
} from "./common";
import { ItemDict } from "../engine/item-dict";

const getData = (results: BaseItemProbTuple[], baseItemName: string) => {
  const runes = results.filter(
    (tuple) =>
      RUNE_REGEX.test(tuple[0]) && Number(RUNE_REGEX.exec(tuple[0])![1]) > 0
  );
  return sortBy(runes, (tuple) => ItemDict[tuple[0]].level);
};

const LocaleShortForm = (rune: string) => Locale(rune).split(" ")[0];

export const RuneBars = ({
  playerFormState,
  results,
  baseItemName,
  itemName,
  rarity,
}: IDashboardPropType): JSX.Element => {
  const [runeFilter, setRuneFilter] = useState("r00");
  const filterOptions = range(1, 34).map((num) => {
    const str = "r" + `${num}`.padStart(2, "0");
    return (
      <option key={str} value={str}>
        {LocaleShortForm(str)}
      </option>
    );
  });
  useEffect(() => {
    if (baseItemName == "") {
      return;
    }
    const tcs = getData(results, baseItemName);
    const filterTcs = tcs.filter(
      (tuple) =>
        Number(tuple[0].substring(1)) >= Number(runeFilter.substring(1))
    );
    console.log(runeFilter, tcs, filterTcs);
    const labels = filterTcs.map((tuple) => LocaleShortForm(tuple[0]));
    const dataset = {
      data: filterTcs.map((tuple) => {
        return {
          x: LocaleShortForm(tuple[0]),
          tc: tuple[0],
          y: tuple[1].valueOf() * 100,
        };
      }),
      parsing: { yAxisKey: "y" },
    };
    let ctx = (
      document.getElementById("runeBarChart") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "bar" as "bar",
      data: {
        labels,
        datasets: [dataset],
      },
      options: {
        options: {
          animation: false,
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Chance %",
            },
          },
          x: {},
        },
        elements: {
          bar: {
            borderWidth: 1,
            backgroundColor: (ctx: ScriptableContext<"bar">) => {
              if (ctx.raw!.tc === baseItemName) {
                return REGULAR_COLOR;
              }
              return RUNE_COLOR;
            },
          },
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
              title: (cs: TooltipItem<"bar">[]) => "",
              label: (ctx: TooltipItem<"bar">) => {
                return `${ctx.label} ${ctx.raw.y}%`;
              },
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
  }, [results, baseItemName, runeFilter]);

  return (
    <div>
      <div className="chartTitle">
        Rune Drop Chance
        <div className="chartSubtitle">
          Filter runes above{" "}
          <select
            className="inline-select w-20"
            value={runeFilter}
            onChange={(evt) => setRuneFilter(evt.target.value)}
          >
            {filterOptions}
          </select>
        </div>
      </div>
      <canvas id="runeBarChart"></canvas>
    </div>
  );
};
