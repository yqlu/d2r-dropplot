import React, { useEffect } from "react";
import { max, range, sum } from "lodash-es";
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
  REGULAR_COLOR,
} from "./common";

const TC_REGEX = /^(weap|armo|bow|mele)(\d+)$/;
type tcClassType = "weap" | "armo" | "bow" | "mele";
const MAX_ITEMS_PER_TC = 15;

type datasetType = ChartDataset<"bar", number[]>;

type datasetMapType = {
  weap: datasetType[];
  armo: datasetType[];
  mele: datasetType[];
  bow: datasetType[];
};

type tcClass = keyof datasetMapType;

const makeBlankDataset = (stack: string): datasetType[] => {
  return range(MAX_ITEMS_PER_TC).map((i) => {
    return {
      label: i + "",
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
  if (tcs.length === 0) {
    throw new Error("No applicable TCs");
  }
  const maxClass =
    max(
      tcs.map((tuple) => {
        const groups = TC_REGEX.exec(tuple[0]);
        return groups ? Number(groups[2]) : 0;
      })
    ) ?? 3;
  const labels = range(3, maxClass + 1, 3);
  const datasetMap: datasetMapType = {
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
      if (!groups) {
        return;
      }
      const tcClass = groups[1] as tcClass;
      const chance = (tuple[1].valueOf() * item[1]) / denom;
      datasetMap[tcClass][idx].data[Number(groups[2]) / 3 - 1] = chance;
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
      type: "bar" as "bar",
      data: {
        labels,
        datasets,
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
          x: {
            title: {
              display: true,
              text: "TC Level",
            },
          },
        },
        elements: {
          bar: {
            borderWidth: 1,
            backgroundColor: (ctx: ScriptableContext<"bar">) => {
              if (ctx.raw === 0) {
                return;
              }
              const proto = Object.getPrototypeOf(ctx);
              const tc = proto.dataset.stack + (ctx.dataIndex + 1) * 3;
              const item = AtomicDict[tc].tcs[proto.dataset.label][0];
              if (item === baseItemName) {
                return STACKED_BAR_COLORS.ACTIVE;
              }
              return TC_GRADIENT[proto.dataset.stack as tcClassType][
                ctx.dataIndex
              ];
            },
            hoverBackgroundColor: (ctx: ScriptableContext<"bar">) => {
              return REGULAR_COLOR;
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
              title: (cs: TooltipItem<"bar">[]) => {
                const ctx = cs[0];
                const tcName = ctx.dataset.stack + ctx.label;
                const itemIdxWithinTc = (ctx.dataset.label || 0) as number;
                const item = AtomicDict[tcName].tcs[itemIdxWithinTc][0];
                const tc = tcs.filter((tuple) => tuple[0] === tcName)[0];
                const tcChance = `${formatPercent(tc[1].valueOf())}%`;
                const absoluteChance = `${formatPercent(ctx.raw as number)}%`;
                const itemInTcChance = getAtomicFraction(
                  tcName,
                  item
                ).toFraction();
                return [
                  `Chance of ${tcName} = ${tcChance}`,
                  `Chance of ${Locale(
                    item
                  )} = ${tcChance} x ${itemInTcChance} = ${absoluteChance}`,
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
      <div className="chartTitle">
        <span className="font-bold">{Locale(baseItemName)}</span> Drop Chance
        plotted by Treasure Class Level
      </div>
      <canvas id="treasureClassStackedBars"></canvas>
    </div>
  );
};
