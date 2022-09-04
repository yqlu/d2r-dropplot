import React, { useEffect, useState } from "react";
import { sum } from "lodash-es";
import { ChartTypeRegistry, ScriptableContext, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";
import {
  TreemapController,
  TreemapElement,
  TreemapControllerDatasetOptions,
  TreemapDataPoint,
  TreemapScriptableContext,
} from "chartjs-chart-treemap";
import { color } from "chart.js/helpers";

import { AtomicDict } from "../engine/atomic-dict";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict, TCDictType } from "../engine/tc-dict";
import { Locale } from "../engine/locale-dict";
import { TCProbTuple, TCResultAggregator } from "../engine/resultAggregator";

import { PlayerFormState } from "../PlayerForm";
import {
  IDashboardPropType,
  REGULAR_COLOR,
  TREEMAP_COLORS,
  TC_GRADIENT,
} from "./common";
import Fraction from "fraction.js";
import { RARITY } from "../engine/itemratio-dict";

Chart.register(TreemapController, TreemapElement);
Chart.defaults.color = REGULAR_COLOR;

type TreemapDataType = Record<string, unknown>;

const TC_REGEX = /^(weap|armo|bow|mele)(\d+)/;
type tcClassType = "weap" | "armo" | "bow" | "mele";

const getData = (playerFormState: PlayerFormState, baseItemName: string) => {
  const tcLookup = makeLookupTcFunction(TCDict, {} as TCDictType);
  const tcCalculator = new TcCalculator<TCProbTuple[]>(
    tcLookup,
    () => new TCResultAggregator()
  );

  let tcs = tcCalculator
    .getAtomicTCs(
      playerFormState.tc,
      playerFormState.playerCount,
      playerFormState.partyCount
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
        const groups = TC_REGEX.exec(tuple[0]);
        const level = groups ? Number(groups[2]) : 0;
        const type = (groups ? groups[1] : "weap") as tcClassType;
        return {
          type,
          item: item[0],
          tcChance: tuple[1].valueOf(),
          itemInTcChance: new Fraction(item[1], denom).toFraction(),
          absoluteChance: (tuple[1].valueOf() * item[1]) / denom,
          backgroundColor: TC_GRADIENT[type][level / 3],
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
  onSelectItem,
}: IDashboardPropType): JSX.Element => {
  const [tcGrouped, setTcGrouped] = useState(false);

  useEffect(() => {
    if (baseItemName == "") {
      return;
    }
    const backgroundColor = (c: TreemapScriptableContext): string => {
      if (!c?.raw?.g) {
        return TREEMAP_COLORS.NEUTRAL.TC.rgbString();
      }
      const caption = c.raw.g;
      if (caption === baseItemName) {
        return TREEMAP_COLORS.ACTIVE.ITEM.rgbString();
      }
      return (c.raw as any)._data.children[0].backgroundColor as string;
    };
    const hoverBackgroundColor = (c: TreemapScriptableContext) => {
      const bg = backgroundColor(c);
      return color(bg).lighten(0.2).rgbString();
    };
    const { data, tcsContainingItem } = getData(playerFormState, baseItemName);
    let ctx = (
      document.getElementById("treasureClassTreeMap") as HTMLCanvasElement
    )?.getContext("2d");
    const groups = (tcGrouped ? ["type", "tc", "item"] : ["item"]) as string[];
    const config = {
      type: "treemap" as keyof ChartTypeRegistry,
      data: {
        datasets: [
          {
            tree: data as TreemapDataType[],
            key: "absoluteChance",
            groups: groups,
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
        resizeDelay: 50,
        onClick: (e) => {
          const activePoints = chart.getElementsAtEventForMode(
            e,
            "nearest",
            {
              intersect: true,
            },
            false
          );
          if (activePoints.length > 0) {
            const [{ index }] = activePoints;
            const item = chart.config.data.datasets[0].data[index]!.g;
            const tcTuple = results.find((tuple) => tuple[0] === item);
            if (tcTuple) {
              const chance = tcTuple[1];
              onSelectItem(item, "", RARITY.WHITE, chance);
            }
          }
        },
        onHover: (event, activeEvents) => {
          (event?.native?.target as HTMLElement).style.cursor =
            activeEvents?.length > 0 ? "pointer" : "auto";
        },
        datasets: {
          treemap: {
            captions: {
              display: true,
              color: REGULAR_COLOR,
            },
            labels: {
              display: true,
              align: "left",
              color: REGULAR_COLOR,
              font: { size: 8 },
              formatter: (ctx: ScriptableContext<"treemap">) => {
                return Locale((ctx.raw as any).g);
              },
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
            display: true,
            callbacks: {
              title: (ctx: TooltipItem<"treemap">[]) => {
                if (groups.length == 3 && ctx.length < 3) {
                  // `weap`
                  if (ctx.length == 1) {
                    const obj = (ctx[0].raw as any)._data as any;
                    // TODO: this should be an expectation
                    return `Chance of ${obj.type} = ${formatPercent(
                      obj.absoluteChance
                    )}%`;
                  } else {
                    // `weap12`
                    const obj = (ctx[1].raw as any)._data as any;
                    // TODO: this should be an expectation
                    return `Chance of ${obj.tc} = ${formatPercent(
                      obj.absoluteChance
                    )}%`;
                  }
                }
                // individual item
                // _data exists in Chartjs but not formally recognized in type system
                const obj = (
                  ctx[ctx.length - 1].dataset.data[
                    ctx[ctx.length - 1].dataIndex
                  ] as any
                )._data;
                if (!obj["item"]) {
                  return;
                }
                const itemName = Locale(obj["item"]);
                const tcChance = `${formatPercent(obj.children[0].tcChance)}%`;
                const absoluteChance = `${formatPercent(obj.absoluteChance)}%`;
                return [
                  `Chance of ${obj.children[0].tc} = ${tcChance}`,
                  `Chance of ${itemName} = ${tcChance} x ${obj.children[0].itemInTcChance} = ${absoluteChance}`,
                ];
              },
              label: (ctx: TooltipItem<"treemap">) => {},
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
  }, [playerFormState, results, baseItemName, itemName, rarity, tcGrouped]);

  // TODO: explanatory tooltip
  return (
    <div>
      <div className="chartTitle">
        <span className="font-bold">{Locale(baseItemName)}</span> Drop Chance
        relative to all Weapons and Armor
        <div className="chartSubtitle">
          <input
            type="checkbox"
            checked={tcGrouped}
            onChange={(event) => setTcGrouped(!tcGrouped)}
          />{" "}
          Group By TC
        </div>
      </div>
      <canvas id="treasureClassTreeMap"></canvas>
    </div>
  );
};
