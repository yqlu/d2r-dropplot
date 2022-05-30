import Fraction from "fraction.js";
import { range } from "lodash-es";

import { ItemQualityRatios } from "./tc-dict.js";
import { ItemDict } from "./item-dict.js";
import {
  WeaponsDict,
  ArmorDict,
  WeaponArmorDictEntryType,
} from "./weapon-armor-dict.js";
import { RARITY, ITEMTIER, getRarityConstants } from "./itemratio-dict.js";

export type ItemRarityProb = [Fraction, Fraction, Fraction, Fraction];

export function mergeRatios(
  ratioA: ItemQualityRatios,
  ratioB: ItemQualityRatios
): ItemQualityRatios {
  return range(4).map((i) =>
    Math.max(ratioA[i], ratioB[i])
  ) as ItemQualityRatios;
}

export function getItemTier(itemEntry: WeaponArmorDictEntryType) {
  return [ITEMTIER.NORMAL, ITEMTIER.EXCEPTIONAL, ITEMTIER.ELITE][
    itemEntry.tier
  ];
}

const mfFactor: { [key in RARITY]: number } = {
  [RARITY.WHITE]: 0, // unused
  [RARITY.MAGIC]: 0, // unused
  [RARITY.RARE]: 600,
  [RARITY.SET]: 500,
  [RARITY.UNIQUE]: 250,
};

export function getEffectiveMf(mf: number, rarity: RARITY) {
  if (rarity == RARITY.MAGIC) {
    return mf;
  }
  const factor = mfFactor[rarity];
  return Math.trunc((mf * factor) / (mf + factor));
}

function getItemEntry(code: string) {
  if (WeaponsDict.hasOwnProperty(code)) {
    return WeaponsDict[code];
  } else if (ArmorDict.hasOwnProperty(code)) {
    return ArmorDict[code];
  }
  // TODO: handle jewels, rings, amulets, charms
  throw new Error("Could not find item");
}

// Does not take into account whether unique / set item exists and can be dropped
export function computeQualityProb(
  itemCode: string,
  rarity: RARITY,
  ilvl: number, // from monster
  magicFind: number, // from character
  qualityFactor: number // from ItemRarityRatios from TC,
): Fraction {
  const itemEntry = getItemEntry(itemCode);
  const qlvl = itemEntry.level;
  const itemTier = getItemTier(itemEntry);
  const classSpecific = false; // TODO: look up itemEntry.class in itemTypes
  const [baseChance, chanceDivisor, chanceMin] = getRarityConstants(
    itemTier,
    classSpecific,
    rarity
  );

  let chance = (baseChance - Math.trunc((ilvl - qlvl) / chanceDivisor)) * 128;

  // Apply MF
  const effectiveMf = getEffectiveMf(magicFind, rarity);
  // This reduces chance, a good thing because chance is the denom of the final RNG
  chance = Math.trunc((chance * 100) / (100 + effectiveMf));
  chance = Math.max(chance, chanceMin);

  // Apply drop factor from TC
  chance -= Math.trunc((chance * qualityFactor) / 1024);
  if (chance < 128) {
    return new Fraction(1);
  }
  return new Fraction(128, chance);
}

export function computeAllQualityProb(
  itemCode: string,
  ilvl: number,
  magicFind: number,
  qualityFactors: ItemQualityRatios
) {
  const ONE = new Fraction(1);
  // Start with unique, and then cascade downwards
  const uniqProb = computeQualityProb(
    itemCode,
    RARITY.UNIQUE,
    ilvl,
    magicFind,
    qualityFactors[3]
  );
  const setProb = computeQualityProb(
    itemCode,
    RARITY.SET,
    ilvl,
    magicFind,
    qualityFactors[2]
  ).mul(ONE.sub(uniqProb));
  const rareProb = computeQualityProb(
    itemCode,
    RARITY.RARE,
    ilvl,
    magicFind,
    qualityFactors[1]
  ).mul(ONE.sub(uniqProb.add(setProb)));
  const magicProb = computeQualityProb(
    itemCode,
    RARITY.MAGIC,
    ilvl,
    magicFind,
    qualityFactors[0]
  ).mul(ONE.sub(uniqProb.add(setProb).add(rareProb)));
  return [magicProb, rareProb, setProb, uniqProb];
}
