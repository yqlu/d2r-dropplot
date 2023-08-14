import { range, sum, map, clone, pick } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL(
      // "../node_modules/@blizzhackers/d2data/json/uniqueitems.json",
      "../node_modules/@blizzhackers/d2data/json/setitems.json",
      import.meta.url
    )
  )
);

const UNIQUE_DICT = {};
const REVERSE_LOOKUP = {};

for (var obj of Object.values(json)) {
  // if (!obj.enabled && obj.code !== "cm3") {
  //   // If unique: all items without enabled = true are skipped (Except for sunder charms)
  //   console.log(obj.index, "skipped");
  //   continue;
  // }
  // 8 rainbow facet entries will get combined into one here
  //   if (UNIQUE_DICT[obj.index]) {
  //     console.log(obj.index + " is repeated!");
  //   }
  obj.code = obj.item; // Only applicable for sets
  UNIQUE_DICT[obj.index] = pick(obj, ["index", "rarity", "lvl", "code"]);

  if (REVERSE_LOOKUP[obj.code]) {
    REVERSE_LOOKUP[obj.code].push(UNIQUE_DICT[obj.index]);
  } else {
    REVERSE_LOOKUP[obj.code] = [UNIQUE_DICT[obj.index]];
  }
}

// This becomes src/unique-set-dict.ts
// You need to manually dedupe rainbow facets yourself
// console.log(JSON.stringify(UNIQUE_DICT));
console.log(JSON.stringify(REVERSE_LOOKUP));
