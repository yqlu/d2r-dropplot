import { range, sum, map, clone } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL(
      "../node_modules/@blizzhackers/d2data/json/levels.json",
      import.meta.url
    )
  )
);

const Levels = {};

for (var entry of Object.entries(json)) {
  const id = entry[0];
  const obj = entry[1];
  const cleaned = {
    id: parseInt(id),
    name: obj["LevelName"],
    act: obj.Act + 1,
    levels: [obj.MonLvlEx, obj["MonLvlEx(N)"], obj["MonLvlEx(H)"]],
    mon: range(10)
      .map((i) => obj[`mon${i + 1}`])
      .filter((e) => e),
    umon: range(10)
      .map((i) => obj[`umon${i + 1}`])
      .filter((e) => e),
    nmon: range(10)
      .map((i) => obj[`nmon${i + 1}`])
      .filter((e) => e),
  };
  if (cleaned.id == 120) {
    // Arreat Summit -- skip because we manually cleaned the 3 ancients
    continue;
  }
  if (
    (cleaned.levels.filter((e) => e).length > 0 && cleaned.mon.length > 0) ||
    cleaned.id == 121 // Nithlathak's Temple
  ) {
    Levels[id] = cleaned;
  }
}
// This becomes src/engine/levels.ts
console.log(JSON.stringify(Levels));
