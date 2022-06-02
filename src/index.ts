import { TCDict } from "./tc-dict";
import { AtomicDict } from "./atomic-dict";
import { ItemDict } from "./item-dict";
import { makeLookupTcFunction, TcCalculator } from "./tc";
import { TCResultAggregator } from "./resultAggregator";
import { sortTCs } from "./display";

function compute() {
  const tcName = $("#tcs option:selected").text();
  const partyCount = parseInt($("#partyCount").val() as string);
  const playerCount = parseInt($("#playerCount").val() as string);

  // const tcLookup = makeLookupTcFunction(TCDict, {} as TCDictType);
  const tcLookup = makeLookupTcFunction(TCDict, AtomicDict);
  const tcCalculator = new TcCalculator(
    tcLookup,
    () => new TCResultAggregator()
  );
  let tcs = tcCalculator.getAtomicTCs(tcName, partyCount, playerCount).result();
  tcs = sortTCs(tcs);

  let result = $("#result");
  result.html("");
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
