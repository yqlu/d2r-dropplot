import Fraction from "fraction.js";
import { sum, range, map } from "lodash-es";

import { ItemQualityRatios } from "./tc-dict.js";
import { ItemDict, ClassSpecificSet } from "./item-dict.js";
import {
  WeaponsDict,
  ArmorDict,
  WeaponArmorDictEntryType,
} from "./weapon-armor-dict.js";
import { RARITY, ITEMTIER, getRarityConstants } from "./itemratio-dict.js";
import {
  UNIQUE_BASE_LOOKUP,
  SET_BASE_LOOKUP,
  UniqueSetBaseLookupType,
} from "./unique-set-dict.js";

export type ItemRarityProb = [Fraction, Fraction, Fraction, Fraction];

export type UniqueSetProbTuple = [string, Fraction];

export type QualityProbabilityObject = {
  quality: ItemRarityProb;
  sets: UniqueSetProbTuple[];
  uniques: UniqueSetProbTuple[];
};

export function mergeRatios(
  ratioA: ItemQualityRatios,
  ratioB: ItemQualityRatios
): ItemQualityRatios {
  return range(4).map((i) =>
    Math.max(ratioA[i], ratioB[i])
  ) as ItemQualityRatios;
}

export function getItemTier(itemCode: string): ITEMTIER {
  // Unlike the other characteristics, item tier lives solely in WeaponsDict and ArmorDict
  let tier = 0; // Normal by default (e.g. for rings, amulets, jewels, charms)
  if (WeaponsDict.hasOwnProperty(itemCode)) {
    tier = WeaponsDict[itemCode].tier;
  } else if (ArmorDict.hasOwnProperty(itemCode)) {
    tier = ArmorDict[itemCode].tier;
  }
  return [ITEMTIER.NORMAL, ITEMTIER.EXCEPTIONAL, ITEMTIER.ELITE][tier];
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

// Does not take into account whether unique / set item exists and can be dropped
export function computeQualityProb(
  itemCode: string,
  rarity: RARITY,
  ilvl: number, // from monster
  magicFind: number, // from character
  qualityFactor: number // from ItemRarityRatios from TC,
): Fraction {
  const itemEntry = ItemDict[itemCode];
  const qlvl = itemEntry.level;
  const itemTier = getItemTier(itemCode);
  const classSpecific = ClassSpecificSet.has(ItemDict[itemCode].type);
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

export function computeQualityProbsHelper(
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
  // computeQualityProb returns probability of rolling set
  // conditional on it having failed the unique roll...
  // so normalize this
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

export function findCandidates(
  itemCode: string,
  ilvl: number,
  dict: UniqueSetBaseLookupType
): UniqueSetProbTuple[] {
  if (!dict.hasOwnProperty(itemCode)) {
    return [];
  }
  const candidates = dict[itemCode].filter(
    (candidates) => candidates.lvl <= ilvl
  );
  const denom = sum(map(candidates, (candidate) => candidate.rarity));
  return map(candidates, (candidate) => [
    candidate.index,
    new Fraction(candidate.rarity, denom),
  ]);
}

export function computeQualityProbs(
  itemCode: string,
  ilvl: number,
  magicFind: number,
  qualityFactors: ItemQualityRatios
): QualityProbabilityObject {
  let [magicProb, rareProb, setProb, uniqProb] = computeQualityProbsHelper(
    itemCode,
    ilvl,
    magicFind,
    qualityFactors
  );
  const candidateUniques = findCandidates(itemCode, ilvl, UNIQUE_BASE_LOOKUP);
  const candidateSets = findCandidates(itemCode, ilvl, SET_BASE_LOOKUP);

  // If there are no uniques that can be generated,
  // Generate a triple-durability rare in its place
  if (candidateUniques.length == 0) {
    rareProb = rareProb.add(uniqProb);
    uniqProb = new Fraction(0);
  }

  // If there are no uniques that can be generated,
  // Generate a triple-durability rare in its place
  if (candidateSets.length == 0) {
    magicProb = magicProb.add(setProb);
    setProb = new Fraction(0);
  }

  return {
    quality: [magicProb, rareProb, setProb, uniqProb],
    sets: candidateSets,
    uniques: candidateUniques,
  };
}
