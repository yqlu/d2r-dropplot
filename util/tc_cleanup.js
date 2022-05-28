import { range, sum, map, clone } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL(
      "../node_modules/d2-data/json/treasureclassex.json",
      import.meta.url
    )
  )
);

const TCDICT = {};

for (var entry of Object.entries(json)) {
  const tcName = entry[0];
  const tcObject = entry[1];
  var tcs = [];
  for (var i in range(0, 10)) {
    if (tcObject["Item" + i]) {
      tcs.push([tcObject["Item" + i], parseInt(tcObject["Prob" + i])]);
    }
  }

  const qualityRatios = [
    parseInt(tcObject.Magic || 0),
    parseInt(tcObject.Rare || 0),
    parseInt(tcObject.Set || 0),
    parseInt(tcObject.Unique || 0),
  ];
  TCDICT[tcName] = {
    nodrop: parseInt(tcObject.NoDrop || 0),
    picks: parseInt(tcObject.Picks),
    qualityRatios: qualityRatios,
    tcs: tcs,
  };
}

// This becomes src/tc-dict.ts
console.log(JSON.stringify(TCDICT));
