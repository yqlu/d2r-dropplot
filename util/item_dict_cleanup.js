import { range, sum, map, clone } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL("../node_modules/d2-data/json/itemtypes.json", import.meta.url)
  )
);

const ClassSpecificTypes = [];
const NormalTypes = [];
const MagicTypes = [];
const RareTypes = [];

for (var entry of Object.entries(json)) {
  const typeName = entry[0];
  const typeObject = entry[1];
  if (typeObject.Class) {
    ClassSpecificTypes.push(typeName);
  }
  if (typeObject.Normal) {
    NormalTypes.push(typeName);
  }
  if (typeObject.Magic) {
    MagicTypes.push(typeName);
  }
  if (typeObject.Rare) {
    RareTypes.push(typeName);
  }
}

// This becomes ClassSpecificSet in item-dict.ts
// console.log(JSON.stringify(ClassSpecificTypes));

// This becomes OnlyNormalSet in item-dict.ts
// console.log(JSON.stringify(NormalTypes));

// This becomes AtLeastMagicSet in item-dict.ts
console.log(JSON.stringify(MagicTypes));

// This becomes RareableTypes in item-dict.ts
console.log(JSON.stringify(RareTypes));
