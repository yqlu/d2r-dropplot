import { range, sum, map, clone, pick } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    // new URL("../node_modules/d2-data/json/armor.json", import.meta.url)
    new URL("../node_modules/d2-data/json/weapons.json", import.meta.url)
  )
);

const WEAPONS_DICT = {};

for (var entry of Object.entries(json)) {
  const itemCode = entry[0];
  const itemObj = entry[1];
  let tier = "";
  if (itemObj.code == itemObj.normcode) {
    tier = "norm";
  } else if (itemObj.code == itemObj.ubercode) {
    tier = "exceptional";
  } else if (itemObj.code == itemObj.ultracode) {
    tier = "elite";
  } else {
    // Quest items like Khalim's Flail
    continue;
    // console.log(itemCode);
    // throw new Error(itemCode);
  }
  WEAPONS_DICT[itemCode] = pick(itemObj, ["name", "code", "level"]);
  WEAPONS_DICT[itemCode].tier = tier;
}

// This becomes src/weapon-armor-dict.ts
console.log(JSON.stringify(WEAPONS_DICT));
