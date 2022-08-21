import React, { useEffect, useState } from "react";
import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import {
  BaseItemProbTuple,
  TCProbTuple,
  TCResultAggregator,
} from "../engine/resultAggregator";
import {
  IDashboardPropType,
  WHITE_COLOR,
  colorFromRarity,
  SET_COLOR,
  UNIQUE_COLOR,
  TREEMAP_ACTIVE_ITEM_COLOR,
  TREEMAP_ACTIVE_TC_COLOR,
  TREEMAP_NEUTRAL_TC_COLOR,
  TREEMAP_NEUTRAL_ITEM_COLOR,
} from "./common";
import { range, sum } from "lodash-es";
import {
  ChartTypeRegistry,
  FontSpec,
  InteractionMode,
  TooltipItem,
} from "chart.js";
import Chart from "chart.js/auto";
import {
  TreemapController,
  TreemapElement,
  TreemapControllerDatasetOptions,
  TreemapDataPoint,
  TreemapControllerDatasetLabelsOptions,
  TreemapScriptableContext,
} from "chartjs-chart-treemap";
import Fraction from "fraction.js";
import { sortAlphabetical } from "../engine/display";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict, TCDictType } from "../engine/tc-dict";
import { AtomicDict, getAtomicFraction } from "../engine/atomic-dict";
import { color } from "chart.js/helpers";
import { hover } from "@testing-library/user-event/dist/hover";
import { Locale } from "../engine/locale-dict";

Chart.register(TreemapController, TreemapElement);
Chart.defaults.color = WHITE_COLOR;

type TreemapDataType = Record<string, unknown>;

const TC_REGEX = /^(weap|armo|bow|mele)\d+/;

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
  const tcsContainingItem: string[] = [];
  const data = tcs
    .map((tuple) => {
      const items = AtomicDict[tuple[0]].tcs;
      const denom = sum(items.map((item) => item[1]));
      return items.map((item) => {
        if (item[0] === baseItemName) {
          tcsContainingItem.push(tuple[0]);
        }
        return {
          type: TC_REGEX.exec(tuple[0])[1],
          item: item[0],
          absoluteChance: (tuple[1].valueOf() * item[1]) / denom,
          tc: tuple[0],
        } as TreemapDataType;
      });
    })
    .flat();
  return { data, tcsContainingItem };
};

const formatPercent = (num: number) => Math.round(num * 10000) / 100;

export const TreasureClassTreeMap = ({
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
    const backgroundColor = (c: TreemapScriptableContext) => {
      if (!c?.raw?.g) {
        return TREEMAP_NEUTRAL_TC_COLOR.rgbString();
      }
      const caption = c.raw.g;
      if (tcsContainingItem.indexOf(caption) >= 0) {
        return TREEMAP_ACTIVE_TC_COLOR.rgbString();
      } else if (caption === baseItemName) {
        return TREEMAP_ACTIVE_ITEM_COLOR.rgbString();
      } else if (TC_REGEX.test(caption)) {
        return TREEMAP_NEUTRAL_TC_COLOR.rgbString();
      }
      return TREEMAP_NEUTRAL_ITEM_COLOR.rgbString();
    };
    const hoverBackgroundColor = (c: TreemapScriptableContext) => {
      const bg = backgroundColor(c);
      return color(bg).lighten(0.2).rgbString();
    };
    const { data, tcsContainingItem } = getData(playerFormState, baseItemName);
    let ctx = (
      document.getElementById("treasureClassTreeMap") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "treemap" as keyof ChartTypeRegistry,
      data: {
        datasets: [
          {
            tree: data as TreemapDataType[],
            key: "absoluteChance",
            groups: ["type", "tc", "item"] as string[],
            borderWidth: 1,
            spacing: 1,
            borderColor: "rgba(200,200,200,1)",
            data: [] as TreemapDataPoint[],
            backgroundColor: backgroundColor,
            hoverBackgroundColor: hoverBackgroundColor,
          } as TreemapControllerDatasetOptions<TreemapDataType>,
        ],
      },
      options: {
        datasets: {
          treemap: {
            captions: {
              // font: { size: 4, lineHeight: 5 },
              // display: true,
              // color: "red",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Item Drop Chance Relative to all Treasure Classes",
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => "",
              label: (ctx: TooltipItem<"treemap">) => {
                const obj = ctx.dataset.data[ctx.dataIndex]._data;
                if (obj["item"]) {
                  return `Chance of ${Locale(
                    obj["item"]
                  )} given TC: ${getAtomicFraction(
                    obj["tc"],
                    obj["item"]
                  ).toFraction()}`;
                } else if (obj["tc"]) {
                  return `Chance of TC ${obj["tc"]}: ${formatPercent(
                    obj.absoluteChance
                  )}%`;
                }
                return "";
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
      <canvas id="treasureClassTreeMap"></canvas>
    </div>
  );
};
