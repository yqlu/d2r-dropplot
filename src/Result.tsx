import React from "react";
import Fraction from "fraction.js";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { ItemDict } from "./engine/item-dict";
import { Locale } from "./engine/locale-dict";

type IAppPropType = { results: BaseItemProbTuple[] };

function format(percent: Fraction) {
  if (percent.valueOf() === 0) {
    return "-";
  }
  return Math.round(percent.valueOf() * 10000) / 100;
}

function formatReciprocal(chance: Fraction) {
  if (chance.valueOf() === 0) {
    return `1/0`;
  }
  let f = chance.inverse().valueOf();
  if (f < 50) {
    f = Math.round(f * 10) / 10;
  } else {
    f = Math.round(f);
  }
  return `1/${f}`;
}

export class Result extends React.Component<IAppPropType, null> {
  render() {
    const tableRows = this.props.results.map((tcTuple) => {
      let name;
      if (ItemDict[tcTuple[0]]) {
        name = `${Locale(tcTuple[0])} (${ItemDict[tcTuple[0]].level})`;
      } else {
        name = tcTuple[0];
      }
      const children: JSX.Element[] = [];
      for (const item of tcTuple[2].uniques) {
        children.push(
          <tr key={item[0]}>
            <td className="px-5 text-orange-400">{Locale(item[0])}</td>
            <td>{formatReciprocal(item[1].mul(tcTuple[2].quality[3]))}</td>
          </tr>
        );
      }
      for (const item of tcTuple[2].sets) {
        children.push(
          <tr key={item[0]}>
            <td className="px-5 text-lime-500">{Locale(item[0])}</td>
            <td>{formatReciprocal(item[1].mul(tcTuple[2].quality[2]))}</td>
          </tr>
        );
      }
      return (
        <React.Fragment key={tcTuple[0]}>
          <tr className="border-t dark:border-gray-700">
            <td>{name}</td>
            <td>{formatReciprocal(tcTuple[1])}</td>
            <td className="text-sky-400">{format(tcTuple[2].quality[0])}</td>
            <td className="text-yellow-400">{format(tcTuple[2].quality[1])}</td>
            <td className="text-lime-500">{format(tcTuple[2].quality[2])}</td>
            <td className="text-orange-400">{format(tcTuple[2].quality[3])}</td>
          </tr>
          {children}
        </React.Fragment>
      );
    });
    return (
      <div className="bg-gray-900 border border-gray-800 rounded shadow w-full xl:w-2/3">
        <div className="p-5">
          <table className="w-full p-5">
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
