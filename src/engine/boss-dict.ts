import { Difficulty } from "./monstats-dict";

export type BossEntry = {
  id: string;
  nameStr: string;
  levels: [number, number, number];
  tcs: [string?, string?, string?, string?, string?, string?];
};

type BossHierarchyType = {
  minor: string[];
  actbosses: string[];
  pandemonium: string[];
};

export function getBossHierarchy(difficulty: Difficulty): BossHierarchyType {
  let bossHierarchy = {
    minor: [
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
    ],
    actbosses: ["andariel", "duriel", "mephisto", "diablo", "baalcrab"],
    pandemonium: [
      "uberandariel",
      "uberizual",
      "uberduriel",
      "ubermephisto",
      "uberdiablo",
      "uberbaal",
    ],
  };
  if (difficulty !== Difficulty.HELL) {
    bossHierarchy.pandemonium = [];
  }
  return bossHierarchy;
}

export const FlatBossDict: { [key: string]: BossEntry } = {
  bloodraven: {
    id: "bloodraven",
    nameStr: "Bloodraven",
    levels: [10, 43, 88],
    tcs: [
      "Blood Raven",
      null,
      "Blood Raven (N)",
      null,
      "Blood Raven (H)",
      null,
    ],
  },
  griswold: {
    id: "griswold",
    nameStr: "Griswold",
    levels: [5, 39, 84],
    tcs: ["Griswold", null, "Griswold (N)", null, "Griswold (H)", null],
  },
  radament: {
    id: "radament",
    nameStr: "Radament",
    levels: [16, 49, 83],
    tcs: ["Radament", null, "Radament (N)", null, "Radament (H)", null],
  },
  summoner: {
    id: "summoner",
    nameStr: "Summoner",
    levels: [18, 55, 80],
    tcs: ["Summoner", null, "Summoner (N)", null, "Summoner (H)", null],
  },
  izual: {
    id: "izual",
    nameStr: "izual",
    levels: [29, 60, 86],
    tcs: ["Izual", null, "Izual (N)", null, "Izual (H)", null],
  },
  nihlathakboss: {
    id: "nihlathakboss",
    nameStr: "Nihlathak",
    levels: [65, 70, 92],
    tcs: ["Nihlathak", null, "Nihlathak (N)", null, "Nihlathak (H)", null],
  },
  putriddefiler1: {
    id: "putriddefiler1",
    nameStr: "Putrid Defiler1",
    levels: [35, 61, 80],
    tcs: [
      "Act 5 Cast A",
      null,
      "Act 5 (N) Cast A",
      null,
      "Act 5 (H) Cast A",
      null,
    ],
  },
  putriddefiler2: {
    id: "putriddefiler2",
    nameStr: "Putrid Defiler2",
    levels: [37, 62, 81],
    tcs: [
      "Act 5 Cast A",
      null,
      "Act 5 (N) Cast A",
      null,
      "Act 5 (H) Cast A",
      null,
    ],
  },
  putriddefiler3: {
    id: "putriddefiler3",
    nameStr: "Putrid Defiler3",
    levels: [38, 63, 82],
    tcs: [
      "Act 5 Cast B",
      null,
      "Act 5 (N) Cast B",
      null,
      "Act 5 (H) Cast B",
      null,
    ],
  },
  putriddefiler4: {
    id: "putriddefiler4",
    nameStr: "Putrid Defiler4",
    levels: [39, 64, 83],
    tcs: [
      "Act 5 Cast B",
      null,
      "Act 5 (N) Cast B",
      null,
      "Act 5 (H) Cast B",
      null,
    ],
  },
  putriddefiler5: {
    id: "putriddefiler5",
    nameStr: "Putrid Defiler5",
    levels: [40, 65, 84],
    tcs: [
      "Act 5 Cast B",
      null,
      "Act 5 (N) Cast B",
      null,
      "Act 5 (H) Cast B",
      null,
    ],
  },
  andariel: {
    id: "andariel",
    nameStr: "Andariel",
    levels: [12, 49, 75],
    tcs: [
      "Andarielq",
      "Andarielq",
      "Andarielq (N)",
      "Andarielq (N)",
      "Andarielq (H)",
      "Andarielq (H)",
    ],
  },
  duriel: {
    id: "duriel",
    nameStr: "Duriel",
    levels: [22, 55, 88],
    tcs: [
      "Duriel",
      "Durielq",
      "Duriel (N)",
      "Durielq (N)",
      "Duriel (H)",
      "Durielq (H)",
    ],
  },
  mephisto: {
    id: "mephisto",
    nameStr: "Mephisto",
    levels: [26, 59, 87],
    tcs: [
      "Mephisto",
      "Mephistoq",
      "Mephisto (N)",
      "Mephistoq (N)",
      "Mephisto (H)",
      "Mephistoq (H)",
    ],
  },
  diablo: {
    id: "diablo",
    nameStr: "Diablo",
    levels: [40, 62, 94],
    tcs: [
      "Diablo",
      "Diabloq",
      "Diablo (N)",
      "Diabloq (N)",
      "Diablo (H)",
      "Diabloq (H)",
    ],
  },
  baalcrab: {
    id: "baalcrab",
    nameStr: "Baal Crab",
    levels: [60, 75, 99],
    tcs: ["Baal", "Baalq", "Baal (N)", "Baalq (N)", "Baal (H)", "Baalq (H)"],
  },
  uberandariel: {
    id: "uberandariel",
    nameStr: "Lilith",
    levels: [110, 110, 110],
    tcs: [null, null, null, null, "Uber Andariel", null],
  },
  uberizual: {
    id: "uberizual",
    nameStr: "izual",
    levels: [110, 110, 110],
    tcs: [null, null, null, null, "Uber Izual", null],
  },
  uberduriel: {
    id: "uberduriel",
    nameStr: "Duriel",
    levels: [110, 110, 110],
    tcs: [null, null, null, null, "Uber Duriel", null],
  },
  ubermephisto: {
    id: "ubermephisto",
    nameStr: "Mephisto",
    levels: [110, 110, 110],
    tcs: [null, null, null, null, null, null],
  },
  uberdiablo: {
    id: "uberdiablo",
    nameStr: "Diablo",
    levels: [110, 110, 110],
    tcs: [null, null, null, null, null, null],
  },
  uberbaal: {
    id: "uberbaal",
    nameStr: "Baal Crab",
    levels: [110, 110, 110],
    tcs: [null, null, null, null, null, null],
  },
};
