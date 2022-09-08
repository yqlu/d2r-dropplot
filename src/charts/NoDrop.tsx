import React, { useEffect } from "react";
import { map, range, sum } from "lodash-es";
import { ChartTypeRegistry, TooltipItem } from "chart.js";
import Chart from "chart.js/auto";

import { getAdjustedNoDrop } from "../engine/tc";
import { TCDict } from "../engine/tc-dict";
import { IDashboardPropType, REGULAR_COLOR, RUNE_COLOR } from "./common";

Chart.defaults.borderColor = "rgba(255,255,255,0.2)";

const getData = (tc: string) => {
  const xs = range(1, 9);
  const tcObject = TCDict[tc];
  const tcDenom = sum(map(tcObject.tcs, (tuple) => tuple[1]));
  const tcNoDrop = tcObject.nodrop;
  const players = xs.map((x) => getAdjustedNoDrop(tcDenom, tcNoDrop, x, 1));
  const party = xs.map((x) => getAdjustedNoDrop(tcDenom, tcNoDrop, x, x));
  return {
    xs,
    players,
    party,
  };
};

const isDuriel = (tcName: string) => {
  return /Duriel.*/.test(tcName) && TCDict[tcName].tcs[0][0] === "tsc";
};
const isCountess = (tcName: string) => {
  return /Countess.*/.test(tcName) && /Countess/.test(TCDict[tcName].tcs[0][0]);
};

export const NoDropChart = ({
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
    let tc = playerFormState.tc;
    if (isDuriel(tc)) {
      tc = TCDict[tc].tcs[1][0];
    }
    let { xs, players, party } = getData(tc);
    const playerDataset = {
      label: "Player",
      data: players,
      backgroundColor: REGULAR_COLOR,
      borderColor: REGULAR_COLOR,
    };
    const partyDataset = {
      label: "Party",
      data: party,
      backgroundColor: RUNE_COLOR,
      borderColor: RUNE_COLOR,
    };
    let datasets = [partyDataset, playerDataset];

    if (isCountess(tc)) {
      const tcObject = TCDict[tc];
      let tc1 = getData(tcObject.tcs[0][0]);
      let tc2 = getData(tcObject.tcs[1][0]);
      const player1Dataset = {
        label: `${tcObject.tcs[0][0]}`,
        data: tc1.players,
        backgroundColor: REGULAR_COLOR,
        borderColor: REGULAR_COLOR,
      };
      const player2Dataset = {
        label: `${tcObject.tcs[1][0]}`,
        data: tc2.players,
        backgroundColor: RUNE_COLOR,
        borderColor: RUNE_COLOR,
      };
      datasets = [player1Dataset, player2Dataset];
    }

    let ctx = (
      document.getElementById("NoDropChart") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "line" as keyof ChartTypeRegistry,
      data: {
        labels: xs,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Nodrop",
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
                `${ctx.dataset.label} ${ctx.label}: ${ctx.formattedValue}`,
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
  }, [playerFormState.tc]);

  let tc = playerFormState.tc;
  if (isDuriel(tc)) {
    tc = TCDict[tc].tcs[1][0];
  }
  let title = <span className="font-bold">{tc}</span>;
  if (isCountess(tc)) {
    const tcObject = TCDict[tc];
    title = (
      <span className="font-bold">
        {tcObject.tcs[0][0]}, {tcObject.tcs[1][0]}
      </span>
    );
  }

  return (
    <div>
      <div className="chartTitle">{title} nodrop vs player count</div>
      <canvas id="NoDropChart"></canvas>
    </div>
  );
};
