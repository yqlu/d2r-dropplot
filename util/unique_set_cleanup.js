import { range, sum, map, clone, pick } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    // new URL("../node_modules/d2-data/json/uniqueitems.json", import.meta.url)
    new URL("../node_modules/d2-data/json/setitems.json", import.meta.url)
  )
);

const UNIQUE_DICT = {};
const REVERSE_LOOKUP = {};

for (var obj of Object.values(json)) {
  //   if (!obj.enabled) {
  //     continue;
  //   }
  // 8 rainbow facet entries will get combined into one here
  //   if (UNIQUE_DICT[obj.index]) {
  //     console.log(obj.index + " is repeated!");
  //   }
  obj.code = obj.item;
  UNIQUE_DICT[obj.index] = pick(obj, ["index", "rarity", "lvl", "code"]);

  if (REVERSE_LOOKUP[obj.code]) {
    REVERSE_LOOKUP[obj.code].push(UNIQUE_DICT[obj.index]);
  } else {
    REVERSE_LOOKUP[obj.code] = [UNIQUE_DICT[obj.index]];
  }
}

// This becomes src/unique-set-dict.ts
console.log(JSON.stringify(UNIQUE_DICT));
// console.log(JSON.stringify(REVERSE_LOOKUP));
