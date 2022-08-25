import React, { useEffect } from "react";
import { range } from "lodash-es";
import { ChartTypeRegistry, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";
import Fraction from "fraction.js";

import { RARITY } from "../engine/itemratio-dict";
import { BaseItemResultAggregator } from "../engine/resultAggregator";
import { makeLookupTcFunction, TcCalculator } from "../engine/tc";
import { TCDict } from "../engine/tc-dict";
import { AtomicDict } from "../engine/atomic-dict";
import { IDashboardPropType, WHITE_COLOR, UNIQUE_COLOR } from "./common";
import { PlayerFormState } from "../PlayerForm";
import { Locale } from "../engine/locale-dict";

Chart.defaults.color = WHITE_COLOR;
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";

const calculateBaseItemProbability = (
  tc: string,
  mlvl: number,
  playerCount: number,
  baseItemName: string
) => {
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  const tcCalculator = new TcCalculator(
    tcLookup,
    () => new BaseItemResultAggregator(mlvl, 0)
  );
  const playerTcs = tcCalculator
    .getAtomicTCs(tc, playerCount, 1, new Set([baseItemName]))
    .result();
  const partyTcs = tcCalculator
    .getAtomicTCs(tc, playerCount, playerCount, new Set([baseItemName]))
    .result();
  if (playerTcs.length == 0) {
    const ZERO = new Fraction(0);
    return {
      player: ZERO,
      party: ZERO,
    };
  }
  return {
    player: playerTcs[0][1],
    party: partyTcs[0][1],
  };
};

const getData = (tc: string, mlvl: number, baseItemName: string) => {
  const xs = range(1, 9);
  const ys = xs.map((x) =>
    calculateBaseItemProbability(tc, mlvl, x, baseItemName)
  );
  return {
    xs,
    ys,
  };
};

const makePercent = (num: number) => num * 100; //Math.round(num * 10000) / 100;

export const PartyCountChart = ({
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
    const { xs, ys } = getData(
      playerFormState.tc,
      Number(playerFormState.mlvl),
      baseItemName
    );
    const player = {
      label: "Player",
      data: ys.map((val) => makePercent(val.player.valueOf())),
      backgroundColor: WHITE_COLOR,
      borderColor: WHITE_COLOR,
    };
    const party = {
      label: "Party",
      data: ys.map((val) => makePercent(val.party.valueOf())),
      backgroundColor: UNIQUE_COLOR,
      borderColor: UNIQUE_COLOR,
    };

    let ctx = (
      document.getElementById("partyCountChart") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "line" as keyof ChartTypeRegistry,
      data: {
        labels: xs,
        datasets: [party, player],
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
              text: "Count",
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
              title: () => "",
              label: (ctx: TooltipItem<"line">) =>
                `${ctx.dataset.label} ${ctx.label}: ${ctx.formattedValue}%`,
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
        <span className="font-bold">{Locale(baseItemName)}</span> Drop Rate vs
        Player Count
      </div>
      <canvas id="partyCountChart"></canvas>
    </div>
  );
};
