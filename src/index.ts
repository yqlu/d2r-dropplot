import { range, sum, map, clone, reduce } from "lodash-es";
import Fraction from "fraction.js";
import { TCDict, TCObject } from "./tc-dict";
import { ItemDict } from "./item-dict";
import { getAtomicTCs, sortTCs } from "./tc";

function compute() {
  const tcName = $("#tcs option:selected").text();
  const partyCount = parseInt($("#partyCount").val() as string);
  const playerCount = parseInt($("#playerCount").val() as string);

  let tcs = getAtomicTCs(tcName, partyCount, playerCount);
  tcs = sortTCs(tcs);

  let result = $("#result");
  result.html("");
  for (var tcTuple of tcs) {
    if (ItemDict[tcTuple[0]]) {
      tcTuple[0] = ItemDict[tcTuple[0]].name;
    }
    var f = tcTuple[1].inverse().valueOf();
    if (f < 50) {
      f = Math.round(f * 10) / 10;
    } else {
      f = Math.round(f);
    }
    result.append(
      `<div><span class='tcName'>${tcTuple[0]}</span><span class='tcValue'>${f}</span></div>`
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
