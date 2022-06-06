import Fraction from "fraction.js";

import { TCDict } from "./tc-dict";
import { AtomicDict } from "./atomic-dict";
import { ItemDict } from "./item-dict";
import { makeLookupTcFunction, TcCalculator } from "./tc";
import {
  BaseItemProbTuple,
  BaseItemResultAggregator,
  TCProbTuple,
} from "./resultAggregator";
import { sortTCs } from "./display";

function format(percent: Fraction) {
  return Math.round(percent.valueOf() * 10000) / 100;
}

function compute() {
  const tcName = $("#tcs option:selected").text();
  const mlvl = parseInt($("#mlvl").val() as string);
  const magicFind = parseInt($("#magicFind").val() as string);
  const partyCount = parseInt($("#partyCount").val() as string);
  const playerCount = parseInt($("#playerCount").val() as string);

  // const tcLookup = makeLookupTcFunction(TCDict, {} as TCDictType);
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  const tcCalculator = new TcCalculator(
    tcLookup,
    () => new BaseItemResultAggregator(mlvl, magicFind)
  );
  let tcs = tcCalculator.getAtomicTCs(tcName, partyCount, playerCount).result();
  tcs = sortTCs(
    tcs as unknown as TCProbTuple[]
  ) as unknown as BaseItemProbTuple[];

  let result = $("#result");
  result.html("<table id='resulttable'><tr></tr></table>");
  for (var tcTuple of tcs) {
    if (ItemDict[tcTuple[0]]) {
      tcTuple[0] = `${ItemDict[tcTuple[0]].name} (${
        ItemDict[tcTuple[0]].level
      })`;
    }
  }

  for (var tcTuple of tcs) {
    var f = tcTuple[1].inverse().valueOf();
    if (f < 50) {
      f = Math.round(f * 10) / 10;
    } else {
      f = Math.round(f);
    }
    $("#resulttable tr:last").after(
      `<tr><td class='tcName'>${tcTuple[0]}</td>
      <td class='tcValue'>1/${f}</td>
      <td>${format(tcTuple[2].quality[0])}</td>
      <td>${format(tcTuple[2].quality[1])}</td>
      <td>${format(tcTuple[2].quality[2])}</td>
      <td>${format(tcTuple[2].quality[3])}</td>
      </tr>`
    );
  }
}

$(document).ready(function () {
  let dropdown = $("#tcs");
  for (var tcName of Object.keys(TCDict)) {
    dropdown.append($("<option />").val(tcName).text(tcName));
  }
  $("#compute").on("click", compute);
});
