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
  formatPercent,
  round2dp,
} from "./common";
import { Locale } from "../engine/locale-dict";

const calculateMagicFind = (
  playerFormState: PlayerFormState,
  magicFind: number,
  baseItemName: string
) => {
  const mlvl = parseInt(playerFormState.mlvl);
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  // No need to use more accurate DistributionAggregator
  // Since we are only looking at quality
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

export const MagicFindChart = ({
  playerFormState,
  results,
  baseItemName,
  itemName,
  rarity,
}: IDashboardPropType): JSX.Element => {
  useEffect(() => {
    const tension = 0.3;
    const { xs, ys } = getData(playerFormState, baseItemName);
    const white = {
      label: "Normal",
      data: ys.map((ratio) => {
        const chance = round2dp(
          new Fraction(1)
            .sub(ratio[0])
            .sub(ratio[1])
            .sub(ratio[2])
            .sub(ratio[3])
            .valueOf()
        );
        return chance;
      }),
      backgroundColor: REGULAR_COLOR,
      borderColor: REGULAR_COLOR,
      tension,
    };
    const magic = {
      label: "Magic",
      data: ys.map((ratio) => ratio[0].valueOf() * 100),
      backgroundColor: MAGIC_COLOR,
      borderColor: MAGIC_COLOR,
      tension,
    };
    const rare = {
      label: "Rare",
      data: ys.map((ratio) => ratio[1].valueOf() * 100),
      backgroundColor: RARE_COLOR,
      borderColor: RARE_COLOR,
      tension,
    };
    const set = {
      label: "Set",
      data: ys.map((ratio) => ratio[2].valueOf() * 100),
      backgroundColor: SET_COLOR,
      borderColor: SET_COLOR,
      tension,
    };
    const unique = {
      label: "Unique",
      data: ys.map((ratio) => ratio[3].valueOf() * 100),
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
                `${ctx.dataset.label}: ${formatPercent(
                  ctx.parsed.y as number
                )}%`,
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
        magic find
      </div>
      <canvas id="magicFindChart"></canvas>
    </div>
  );
};
