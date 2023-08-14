import { range, sum, map, clone } from "lodash-es";
import { readFile } from "fs/promises";
const json = JSON.parse(
  await readFile(
    new URL(
      "../node_modules/@blizzhackers/d2data/json/monstats.json",
      import.meta.url
    )
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
      obj.TreasureClass,
      obj.TreasureClassChamp,
      obj.TreasureClassUnique,
      obj["TreasureClass(N)"],
      obj["TreasureClassChamp(N)"],
      obj["TreasureClassUnique(N)"],
      obj["TreasureClass(H)"],
      obj["TreasureClassChamp(H)"],
      obj["TreasureClassUnique(H)"],
      obj["TreasureClassDesecrated"],
      obj["TreasureClassDesecratedChamp"],
      obj["TreasureClassDesecratedUnique"],
      obj["TreasureClassDesecrated(N)"],
      obj["TreasureClassDesecratedChamp(N)"],
      obj["TreasureClassDesecratedUnique(N)"],
      obj["TreasureClassDesecrated(H)"],
      obj["TreasureClassDesecratedChamp(H)"],
      obj["TreasureClassDesecratedUnique(H)"],
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
        obj.TreasureClass, // normal
        obj.TreasureClassQuest, // quest
        obj["TreasureClass(N)"],
        obj["TreasureClassQuest(N)"],
        obj["TreasureClass(H)"],
        obj["TreasureClassQuest(H)"],
        obj.TreasureClassDesecrated,
        obj["TreasureClassDesecrated(N)"],
        obj["TreasureClassDesecrated(H)"],
      ],
    };
  }
}
populate(Bosses.minor, minor);
populate(Bosses.actbosses, actbosses);
populate(Bosses.pandemonium, pandemonium);

// This becomes src/engine/boss-dict.ts
console.log(JSON.stringify(Bosses));
