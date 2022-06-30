import React from "react";
import Fraction from "fraction.js";

import { BaseItemProbTuple } from "./engine/resultAggregator";
import { ItemDict } from "./engine/item-dict";

type IAppPropType = { results: BaseItemProbTuple[] };

function format(percent: Fraction) {
  return Math.round(percent.valueOf() * 10000) / 100;
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
      let f = tcTuple[1].inverse().valueOf();
      if (f < 50) {
        f = Math.round(f * 10) / 10;
      } else {
        f = Math.round(f);
      }
      return (
        <tr key={name}>
          <td>{name}</td>
          <td>1/{f}</td>
          <td>{format(tcTuple[2].quality[0])}</td>
          <td>{format(tcTuple[2].quality[1])}</td>
          <td>{format(tcTuple[2].quality[2])}</td>
          <td>{format(tcTuple[2].quality[3])}</td>
        </tr>
      );
    });
    return (
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }
}
