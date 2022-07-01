import React from "react";
import Fraction from "fraction.js";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { ItemDict } from "./engine/item-dict";

type IAppPropType = { results: BaseItemProbTuple[] };

function format(percent: Fraction) {
  return Math.round(percent.valueOf() * 10000) / 100;
}

function formatReciprocal(chance: Fraction) {
  if (chance.valueOf() == 0) {
    console.log();
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
        name = `${ItemDict[tcTuple[0]].name} (${ItemDict[tcTuple[0]].level})`;
      } else {
        name = tcTuple[0];
      }
      const children: JSX.Element[] = [];
      for (const item of tcTuple[2].uniques) {
        children.push(
          <tr key={item[0]}>
            <td>{item[0]} (U)</td>
            <td>{formatReciprocal(item[1].mul(tcTuple[2].quality[3]))}</td>
          </tr>
        );
      }
      for (const item of tcTuple[2].sets) {
        children.push(
          <tr key={item[0]}>
            <td>{item[0]} (S)</td>
            <td>{formatReciprocal(item[1].mul(tcTuple[2].quality[2]))}</td>
          </tr>
        );
      }
      return (
        <>
          <tr key={name}>
            <td>{name}</td>
            <td>{formatReciprocal(tcTuple[1])}</td>
            <td>{format(tcTuple[2].quality[0])}</td>
            <td>{format(tcTuple[2].quality[1])}</td>
            <td>{format(tcTuple[2].quality[2])}</td>
            <td>{format(tcTuple[2].quality[3])}</td>
          </tr>
          {children}
        </>
      );
    });
    return (
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }
}
