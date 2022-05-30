export enum RARITY {
  WHITE,
  MAGIC,
  RARE,
  SET,
  UNIQUE,
}

export enum ITEMTIER {
  NORMAL,
  EXCEPTIONAL,
  ELITE,
}

type RarityConstants = [number, number, number];

export const getRarityConstants = function (
  difficulty: ITEMTIER,
  classSpecific: boolean,
  rarity: RARITY
) {
  let lookup;
  if (difficulty == ITEMTIER.NORMAL) {
    if (classSpecific) {
      lookup = ItemRatioDict["Class Specific"];
    } else {
      lookup = ItemRatioDict.Normal;
    }
  } else {
    if (classSpecific) {
      lookup = ItemRatioDict["Class Specific Uber"];
    } else {
      lookup = ItemRatioDict.Uber;
    }
  }
  switch (rarity) {
    case RARITY.UNIQUE:
      return [lookup.Unique, lookup.UniqueDivisor, lookup.UniqueMin];
    case RARITY.SET:
      return [lookup.Set, lookup.SetDivisor, lookup.SetMin];
    case RARITY.RARE:
      return [lookup.Rare, lookup.RareDivisor, lookup.RareMin];
    case RARITY.MAGIC:
      return [lookup.Magic, lookup.MagicDivisor, lookup.MagicMin];
    default:
      throw new Error("Other rarities not supported");
  }
};

export const ItemRatioDict = {
  Normal: {
    Unique: 400,
    UniqueDivisor: 1,
    UniqueMin: 6400,
    Rare: 100,
    RareDivisor: 2,
    RareMin: 3200,
    Set: 160,
    SetDivisor: 2,
    SetMin: 5600,
    Magic: 34,
    MagicDivisor: 3,
    MagicMin: 192,
    HiQuality: 12,
    HiQualityDivisor: 8,
    Normal: 2,
    NormalDivisor: 2,
  },
  Uber: {
    Unique: 400,
    UniqueDivisor: 1,
    UniqueMin: 6400,
    Rare: 100,
    RareDivisor: 2,
    RareMin: 3200,
    Set: 160,
    SetDivisor: 2,
    SetMin: 5600,
    Magic: 34,
    MagicDivisor: 3,
    MagicMin: 192,
    HiQuality: 12,
    HiQualityDivisor: 8,
    Normal: 1,
    NormalDivisor: 1,
  },
  "Class Specific": {
    Unique: 240,
    UniqueDivisor: 3,
    UniqueMin: 6400,
    Rare: 80,
    RareDivisor: 3,
    RareMin: 3200,
    Set: 120,
    SetDivisor: 3,
    SetMin: 5600,
    Magic: 17,
    MagicDivisor: 6,
    MagicMin: 192,
    HiQuality: 9,
    HiQualityDivisor: 8,
    Normal: 2,
    NormalDivisor: 2,
  },
  "Class Specific Uber": {
    Unique: 240,
    UniqueDivisor: 3,
    UniqueMin: 6400,
    Rare: 80,
    RareDivisor: 3,
    RareMin: 3200,
    Set: 120,
    SetDivisor: 3,
    SetMin: 5600,
    Magic: 17,
    MagicDivisor: 6,
    MagicMin: 192,
    HiQuality: 9,
    HiQualityDivisor: 8,
    Normal: 1,
    NormalDivisor: 1,
  },
};
