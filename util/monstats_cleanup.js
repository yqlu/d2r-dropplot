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
    id: id,
    nameStr: obj.NameStr,
    levels: [obj.Level, obj["Level(N)"], obj["Level(H)"]],
    tcs: [
      obj.TreasureClass1, // normal
      obj.TreasureClass2, // champion
      obj.TreasureClass3, // unique
      obj["TreasureClass1(N)"],
      obj["TreasureClass2(N)"],
      obj["TreasureClass3(N)"],
      obj["TreasureClass1(H)"],
      obj["TreasureClass2(H)"],
      obj["TreasureClass3(H)"],
    ],
  };
  if (cleaned.tcs.filter((e) => e).length > 0 && obj.boss != 1) {
    Monsters[id] = cleaned;
  }
}
// This becomes src/engine/monstats.ts
// console.log(JSON.stringify(Monsters));

const Bosses = {
  minor: {},
  actbosses: {},
  pandemonium: {},
};
const minor = [
  "bloodraven",
  "griswold",
  "radament",
  "summoner",
  "izual",
  "nihlathakboss",
  "putriddefiler1",
  "putriddefiler2",
  "putriddefiler3",
  "putriddefiler4",
  "putriddefiler5",
];
const actbosses = ["andariel", "duriel", "mephisto", "diablo", "baalcrab"];
const pandemonium = [
  "uberandariel",
  "uberizual",
  "uberduriel",
  "ubermephisto",
  "uberdiablo",
  "uberbaal",
];
function populate(container, names) {
  for (var name of names) {
    const obj = json[name];
    container[name] = {
      id: name,
      nameStr: obj.NameStr,
      levels: [obj.Level, obj["Level(N)"], obj["Level(H)"]],
      tcs: [
        obj.TreasureClass1, // normal
        obj.TreasureClass4, // quest
        obj["TreasureClass1(N)"],
        obj["TreasureClass4(N)"],
        obj["TreasureClass1(H)"],
        obj["TreasureClass4(H)"],
      ],
    };
  }
}
populate(Bosses.minor, minor);
populate(Bosses.actbosses, actbosses);
populate(Bosses.pandemonium, pandemonium);

console.log(JSON.stringify(Bosses));
