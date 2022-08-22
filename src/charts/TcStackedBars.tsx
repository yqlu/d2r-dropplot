import React, { useEffect, useState } from "react";
import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import {
  BaseItemProbTuple,
  TCProbTuple,
  TCResultAggregator,
} from "../engine/resultAggregator";
import { IDashboardPropType, STACKED_BAR_COLORS, WHITE_COLOR } from "./common";
import { max, range, sum } from "lodash-es";
import {
  ChartTypeRegistry,
  FontSpec,
  InteractionMode,
  TooltipItem,
} from "chart.js";
import Chart from "chart.js/auto";
import Fraction from "fraction.js";
import { sortAlphabetical } from "../engine/display";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict, TCDictType } from "../engine/tc-dict";
import { AtomicDict } from "../engine/atomic-dict";
import { Locale } from "../engine/locale-dict";

const TC_REGEX = /^(weap|armo|bow|mele)(\d+)$/;
const MAX_ITEMS_PER_TC = 15;

const makeBlankDataset = (stack: string) => {
  return range(MAX_ITEMS_PER_TC).map((i) => {
    return {
      label: i,
      data: range(29).map(() => 0),
      stack: stack,
    };
  });
};

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
    .filter((tuple) => TC_REGEX.test(tuple[0]));
  const maxClass = max(tcs.map((tuple) => Number(TC_REGEX.exec(tuple[0])[2])));
  const labels = range(3, maxClass + 1, 3);
  const datasetMap = {
    weap: makeBlankDataset("weap"),
    armo: makeBlankDataset("armo"),
    mele: makeBlankDataset("mele"),
    bow: makeBlankDataset("bow"),
  };
  const tcsContainingItem: string[] = [];
  tcs.forEach((tuple) => {
    const items = AtomicDict[tuple[0]].tcs;
    const denom = sum(items.map((item) => item[1]));
    return items.map((item, idx) => {
      if (item[0] === baseItemName) {
        tcsContainingItem.push(tuple[0]);
      }
      const groups = TC_REGEX.exec(tuple[0]);
      const chance = (tuple[1].valueOf() * item[1]) / denom;
      datasetMap[groups[1]][idx].data[Number(groups[2]) / 3 - 1] = chance;
    });
  });
  return { labels, datasetMap, tcs, tcsContainingItem };
};

const formatPercent = (num: number) => Math.round(num * 10000) / 100;

export const TreasureClassStackedBars = ({
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
    const { labels, datasetMap, tcs, tcsContainingItem } = getData(
      playerFormState,
      baseItemName
    );
    const datasets = Object.values(datasetMap)
      .flat()
      .filter((dataset) => dataset.data.filter((i) => i !== 0).length > 0);
    let ctx = (
      document.getElementById("treasureClassStackedBars") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "bar" as keyof ChartTypeRegistry,
      data: {
        labels,
        datasets,
      },
      options: {
        options: {
          animation: false,
        },
        elements: {
          bar: {
            borderWidth: 1,
            backgroundColor: (ctx) => {
              if (ctx.raw === 0) {
                return;
              }
              const proto = Object.getPrototypeOf(ctx);
              const tc = proto.dataset.stack + (ctx.dataIndex + 1) * 3;
              const item = AtomicDict[tc].tcs[proto.dataset.label][0];
              if (item === baseItemName) {
                return STACKED_BAR_COLORS.ACTIVE;
              } else if (tcsContainingItem.indexOf(tc) >= 0) {
                return STACKED_BAR_COLORS.TC;
              }
              return STACKED_BAR_COLORS.NEUTRAL;
            },
            hoverBackgroundColor: (ctx) => {
              return WHITE_COLOR;
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Item Drop Chance Relative to Treasure Class",
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (cs: TooltipItem<"line">[]) => {
                const ctx = cs[0];
                const tc = ctx.dataset.stack + ctx.label;
                const item = AtomicDict[tc].tcs[ctx.dataset.label][0];
                // console.log(tcs.find((tuple) => tuple[0] === tc));
                return [
                  `Chance of rolling  ${formatPercent(
                    ctx.raw
                  )}% chance ${tc} ${Locale(item)}`,
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
      <canvas id="treasureClassStackedBars"></canvas>
    </div>
  );
};
