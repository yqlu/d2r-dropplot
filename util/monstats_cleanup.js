import { range, sum, map, clone } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/monstats.json", import.meta.url)
  )
);

const Monsters = {};

for (var entry of Object.entries(json)) {
  const id = entry[0];
  const obj = entry[1];
  // TODO: use minion1, minion2, PartyMin, PartyMax, MinGrp, MaxGrp to calculate mobs
  const cleaned = {
    nameStr: obj.NameStr,
    boss: obj.bos == 1,
    levels: [obj.Level, obj["Level(N)"], obj["Level(H)"]],
    tcs: [
      obj.TreasureClass1,
      obj.TreasureClass2,
      obj.TreasureClass3,
      obj.TreasureClass4,
      obj["TreasureClass1(N)"],
      obj["TreasureClass2(N)"],
      obj["TreasureClass3(N)"],
      obj["TreasureClass4(N)"],
      obj["TreasureClass1(H)"],
      obj["TreasureClass2(H)"],
      obj["TreasureClass3(H)"],
      obj["TreasureClass4(H)"],
    ],
  };
  if (cleaned.tcs.filter((e) => e).length > 0) {
    Monsters[id] = cleaned;
  }
}
// This becomes src/engine/monstats.ts
console.log(JSON.stringify(Monsters));
