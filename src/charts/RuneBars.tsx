import React, { useEffect } from "react";
import { max, range, sortBy, sum } from "lodash-es";
import { ChartDataset, ScriptableContext, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import { TCProbTuple, TCResultAggregator } from "../engine/resultAggregator";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict, TCDictType } from "../engine/tc-dict";
import { AtomicDict, getAtomicFraction } from "../engine/atomic-dict";
import { Locale } from "../engine/locale-dict";

import { PlayerFormState } from "../PlayerForm";
import {
  TC_GRADIENT,
  IDashboardPropType,
  STACKED_BAR_COLORS,
  WHITE_COLOR,
  RUNE_COLOR,
} from "./common";
import { ItemDict } from "../engine/item-dict";

const TC_REGEX = /^r(\d+)$/;

const getData = (playerFormState: PlayerFormState, baseItemName: string) => {
  const tcLookup = makeLookupTcFunction(TCDict, {} as TCDictType);
  const tcCalculator = new TcCalculator<TCProbTuple[]>(
    tcLookup,
    () => new TCResultAggregator()
  );

  let tcs = tcCalculator
    .getAtomicTCs(
      playerFormState.tc,
      playerFormState.partyCount,
      playerFormState.playerCount
    )
    .result()
    .filter(
      (tuple) =>
        TC_REGEX.test(tuple[0]) && Number(TC_REGEX.exec(tuple[0])[1]) > 0
    );
  if (tcs.length === 0) {
    throw new Error("No applicable TCs");
  }
  return sortBy(tcs, (tuple) => ItemDict[tuple[0]].level);
};

const formatPercent = (num: number) => Math.round(num * 10000) / 100;

export const RuneBars = ({
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
    const tcs = getData(playerFormState, baseItemName);
    const labels = tcs.map((tuple) => Locale(tuple[0]));
    const dataset = {
      data: tcs.map((tuple) => tuple[1].valueOf()),
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
            // type: "logarithmic",
          },
          x: {
            title: {
              display: true,
              text: "Runes",
            },
          },
        },
        elements: {
          bar: {
            borderWidth: 1,
            backgroundColor: RUNE_COLOR,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Rune Drop Chance",
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (cs: TooltipItem<"bar">[]) => "",
              label: (ctx: TooltipItem<"bar">) => {
                return `${ctx.label} ${ctx.raw}%`;
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
  }, [playerFormState, results, baseItemName, itemName, rarity]);

  return (
    <div>
      <canvas id="runeBarChart"></canvas>
    </div>
  );
};
