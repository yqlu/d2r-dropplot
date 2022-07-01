import { range, sum, map, clone } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/superuniques.json", import.meta.url)
  )
);

const SuperUniques = {};

for (var entry of Object.entries(json)) {
  const id = entry[0];
  const obj = entry[1];
  const cleaned = {
    tcs: [obj.TC, obj["TC(N)"], obj["TC(H)"]],
    grp: [obj.MinGrp, obj.MaxGrp],
    areaId: obj.areaId,
  };
  if (cleaned.areaId) {
    SuperUniques[id] = cleaned;
    // } else {
    //   console.log("skipping", id, cleaned);
  }
}
// This becomes src/engine/superuniques.ts
console.log(JSON.stringify(SuperUniques));
