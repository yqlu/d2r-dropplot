import React, { useEffect } from "react";
import Fraction from "fraction.js";
import { range, uniq } from "lodash-es";
import { ChartTypeRegistry, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import { RARITY } from "../engine/itemratio-dict";
import { BaseItemResultAggregator } from "../engine/resultAggregator";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict } from "../engine/tc-dict";
import { AtomicDict } from "../engine/atomic-dict";
import { PlayerFormState } from "../PlayerForm";
import {
  IDashboardPropType,
  REGULAR_COLOR,
  MAGIC_COLOR,
  RARE_COLOR,
  SET_COLOR,
  UNIQUE_COLOR,
} from "./common";
import { Locale } from "../engine/locale-dict";

const calculateMagicFind = (
  playerFormState: PlayerFormState,
  magicFind: number,
  baseItemName: string
) => {
  const mlvl = parseInt(playerFormState.mlvl);
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  const tcCalculator = new TcCalculator(
    tcLookup,
    () => new BaseItemResultAggregator(mlvl, magicFind)
  );
  let tcs = tcCalculator
    .getAtomicTCs(
      playerFormState.tc,
      playerFormState.playerCount,
      playerFormState.partyCount,
      new Set([baseItemName])
    )
    .result();
  if (tcs.length == 0) {
    const ZERO = new Fraction(0);
    return [ZERO, ZERO, ZERO, ZERO];
  }
  return tcs[0][2].quality;
};

const getData = (playerFormState: PlayerFormState, baseItemName: string) => {
  const intervals = 20;
  const max = 500;
  const xs = range(intervals + 1).map((x) => x * (max / intervals));
  const ys = xs.map((x) =>
    calculateMagicFind(playerFormState, x, baseItemName)
  );
  return {
    xs,
    ys,
  };
};

const formatPercent = (num: number) => Math.round(num * 10000) / 100;

export const MagicFindChart = ({
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

    const tension = 0.3;
    const { xs, ys } = getData(playerFormState, baseItemName);
    const white = {
      label: "Normal",
      data: ys.map((ratio) => {
        const chance = new Fraction(1)
          .sub(ratio[0])
          .sub(ratio[1])
          .sub(ratio[2])
          .sub(ratio[3])
          .valueOf();
        return formatPercent(chance);
      }),
      backgroundColor: REGULAR_COLOR,
      borderColor: REGULAR_COLOR,
      tension,
    };
    const magic = {
      label: "Magic",
      data: ys.map((ratio) => formatPercent(ratio[0].valueOf())),
      backgroundColor: MAGIC_COLOR,
      borderColor: MAGIC_COLOR,
      tension,
    };
    const rare = {
      label: "Rare",
      data: ys.map((ratio) => formatPercent(ratio[1].valueOf())),
      backgroundColor: RARE_COLOR,
      borderColor: RARE_COLOR,
      tension,
    };
    const set = {
      label: "Set",
      data: ys.map((ratio) => formatPercent(ratio[2].valueOf())),
      backgroundColor: SET_COLOR,
      borderColor: SET_COLOR,
      tension,
    };
    const unique = {
      label: "Unique",
      data: ys.map((ratio) => formatPercent(ratio[3].valueOf())),
      backgroundColor: UNIQUE_COLOR,
      borderColor: UNIQUE_COLOR,
      tension,
    };

    let ctx = (
      document.getElementById("magicFindChart") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "line" as keyof ChartTypeRegistry,
      data: {
        labels: xs,
        datasets: [white, magic, rare, set, unique].filter((dataset) => {
          return uniq(dataset.data)[0] != 0;
        }),
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
              text: "Magic Find",
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index" as "index",
        },
        plugins: {
          title: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: (ctx: TooltipItem<"line">[]) => `${ctx[0].label}% MF`,
              label: (ctx: TooltipItem<"line">) =>
                `${ctx.dataset.label}: ${ctx.formattedValue}%`,
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
  }, [playerFormState.tc, playerFormState.mlvl, baseItemName]);

  return (
    <div>
      <div className="chartTitle">
        <span className="font-bold">{Locale(baseItemName)}</span> rarity vs
        Magic Find
      </div>
      <canvas id="magicFindChart"></canvas>
    </div>
  );
};
