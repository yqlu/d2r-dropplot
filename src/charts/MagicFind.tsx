import React, { useEffect, useState } from "react";
import { PlayerFormState } from "../PlayerForm";
import { RARITY } from "../engine/itemratio-dict";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
} from "../engine/resultAggregator";
import {
  IDashboardPropType,
  WHITE_COLOR,
  MAGIC_COLOR,
  RARE_COLOR,
  SET_COLOR,
  UNIQUE_COLOR,
} from "./common";
import { range, uniq } from "lodash-es";
import { ChartTypeRegistry } from "chart.js";
import Chart from "chart.js/auto";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict } from "../engine/tc-dict";
import { AtomicDict } from "../engine/atomic-dict";
import Fraction from "fraction.js";

Chart.defaults.font.family =
  "'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.color = WHITE_COLOR;
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";

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
      playerFormState.partyCount,
      playerFormState.playerCount,
      new Set([baseItemName])
    )
    .result();
  if (tcs.length == 0) {
    const ZERO = new Fraction(0);
    return [ZERO, ZERO, ZERO, ZERO];
  }
  return tcs[0][2].quality;
};

const getData = (
  playerFormState: PlayerFormState,
  baseItemName: string,
  itemName: string,
  rarity: RARITY
) => {
  const xs = range(11).map((x) => x * 50);
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
    if (baseItemName == "") {
      return;
    }

    const { xs, ys } = getData(playerFormState, baseItemName, itemName, rarity);
    const white = {
      label: "Normal %",
      data: ys.map((ratio) => {
        const chance = new Fraction(1)
          .sub(ratio[0])
          .sub(ratio[1])
          .sub(ratio[2])
          .sub(ratio[3])
          .valueOf();
        return Math.round(chance * 1000) / 100;
      }),
      backgroundColor: WHITE_COLOR,
      borderColor: WHITE_COLOR,
    };
    const magic = {
      label: "Magic",
      data: ys.map((ratio) => ratio[0].valueOf() * 100),
      backgroundColor: MAGIC_COLOR,
      borderColor: MAGIC_COLOR,
    };
    const rare = {
      label: "Rare",
      data: ys.map((ratio) => ratio[1].valueOf() * 100),
      backgroundColor: RARE_COLOR,
      borderColor: RARE_COLOR,
    };
    const set = {
      label: "Set",
      data: ys.map((ratio) => ratio[2].valueOf() * 100),
      backgroundColor: SET_COLOR,
      borderColor: SET_COLOR,
    };
    const unique = {
      label: "Unique",
      data: ys.map((ratio) => ratio[3].valueOf() * 100),
      backgroundColor: UNIQUE_COLOR,
      borderColor: UNIQUE_COLOR,
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
        plugins: {
          title: {
            display: true,
            text: "Item Rarity as MF varies",
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
  }, [playerFormState, results, baseItemName, itemName]);

  return (
    <div>
      <canvas id="magicFindChart"></canvas>
    </div>
  );
};
