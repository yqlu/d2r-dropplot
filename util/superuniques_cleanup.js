import { range, sum, map, clone } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/superuniques.json", import.meta.url)
  )
);
const monstats = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/monstats.json", import.meta.url)
  )
);

const SuperUniques = {};

for (var entry of Object.entries(json)) {
  const id = entry[0];
  const obj = entry[1];
  const cleaned = {
    id: id,
    class: obj.Class,
    tcs: [obj.TC, obj["TC(N)"], obj["TC(H)"]],
    grp: [obj.MinGrp, obj.MaxGrp],
    areaId: obj.areaId,
  };
  if (cleaned.areaId && !monstats[obj.Class].boss && cleaned.tcs[0]) {
    SuperUniques[id] = cleaned;
  } else if (cleaned.id == "Ancient Kaa the Soulless") {
    cleaned.areaId = 66; // Arbitrarily fill in one of Tal Rasha's Tombs
    // } else {
    //   console.log("skipping", id, cleaned);
  }
}
// This becomes src/engine/superuniques.ts
console.log(JSON.stringify(SuperUniques));
