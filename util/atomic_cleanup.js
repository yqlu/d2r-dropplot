import { range, sum, map, clone, reduce } from "lodash-es";
import { readFile } from "fs/promises";
import Fraction from "fraction.js";
const json = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/atomic.json", import.meta.url)
  )
);

for (var entry of Object.entries(json)) {
  const atomicTc = entry[0];
  const items = entry[1];
  for (var [itemCode, itemProb] of Object.entries(items)) {
    items[itemCode] = new Fraction(itemProb).simplify(1e-5);
  }
}

// This becomes src/atomic-dict.ts
console.log(JSON.stringify(json));
