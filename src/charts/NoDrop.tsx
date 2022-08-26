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
    const { xs, players, party } = getData(playerFormState.tc);
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

    let ctx = (
      document.getElementById("NoDropChart") as HTMLCanvasElement
    )?.getContext("2d");
    const config = {
      type: "line" as keyof ChartTypeRegistry,
      data: {
        labels: xs,
        datasets: [partyDataset, playerDataset],
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

  return (
    <div>
      <div className="chartTitle">
        <span className="font-bold">{playerFormState.tc}</span> Nodrop vs Player
        Count
      </div>
      <canvas id="NoDropChart"></canvas>
    </div>
  );
};
