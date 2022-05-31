import { range, sum, map, clone } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/itemtypes.json", import.meta.url)
  )
);

const ClassSpecificTypes = [];

for (var entry of Object.entries(json)) {
  const typeName = entry[0];
  const typeObject = entry[1];
  if (typeObject.Class) {
    ClassSpecificTypes.push(typeName);
  }
}

// This becomes ClassSpecificSet in item-dict.ts
console.log(JSON.stringify(ClassSpecificTypes));
