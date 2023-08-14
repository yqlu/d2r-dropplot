import { range, sum, map, clone, pick } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL(
      //   "../node_modules/@blizzhackers/d2data/json/armor.json",
      "../node_modules/@blizzhackers/d2data/json/weapons.json",
      import.meta.url
    )
  )
);

const WEAPONS_DICT = {};

for (var entry of Object.entries(json)) {
  const itemCode = entry[0];
  const itemObj = entry[1];
  let tier;
  if (itemObj.code == itemObj.normcode) {
    tier = 0;
  } else if (itemObj.code == itemObj.ubercode) {
    tier = 1;
  } else if (itemObj.code == itemObj.ultracode) {
    tier = 2;
  } else {
    // Quest items like Khalim's Flail
    continue;
    // console.log(itemCode);
    // throw new Error(itemCode);
  }
  WEAPONS_DICT[itemCode] = { tier };
}

// This becomes src/weapon-armor-dict.ts
console.log(JSON.stringify(WEAPONS_DICT));
