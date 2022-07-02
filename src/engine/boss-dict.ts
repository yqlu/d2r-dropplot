export type BossEntry = {
  id: string;
  nameStr: string;
  levels: [number, number, number];
  tcs: [string?, string?, string?, string?, string?, string?];
};

type BossDictType = {
  minor: { [key: string]: BossEntry };
  actbosses: { [key: string]: BossEntry };
  pandemonium: { [key: string]: BossEntry };
};

export const BossDict: BossDictType = {
  minor: {
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
  },
  actbosses: {
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
  },
  pandemonium: {
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
  },
};
