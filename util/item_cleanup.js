import { range, sum, map, clone, pick } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/items.json", import.meta.url)
  )
);

const ITEM_DICT = {};

for (var entry of Object.entries(json)) {
  const itemCode = entry[0];
  const itemObj = entry[1];
  ITEM_DICT[itemCode] = pick(itemObj, ["name", "type", "code", "level"]);
}

// This becomes src/item-dict.ts
console.log(JSON.stringify(ITEM_DICT));
