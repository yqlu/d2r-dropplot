import Fraction from "fraction.js";
import { sum, range, map } from "lodash-es";

import { ItemQualityRatios } from "./tc-dict";
import {
  ItemDict,
  ClassSpecificSet,
  OnlyNormalSet,
  AtLeastMagicSet,
  RareableSet,
} from "./item-dict";
import { WeaponsDict, ArmorDict } from "./weapon-armor-dict";
import { RARITY, ITEMTIER, getRarityConstants } from "./itemratio-dict";
import {
  UniqueBaseLookup,
  SetBaseLookup,
  UniqueSetBaseLookupType,
  isSunderCharmDictEntry,
} from "./unique-set-dict";
import { KEY_REGEX } from "../charts/common";
import { ONE } from "./polynomialOps";

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
  if (rarity === RARITY.MAGIC) {
    return mf;
  }
  const factor = mfFactor[rarity];
  return Math.trunc((mf * factor) / (mf + factor));
}

export function getRarityMultiplier(
  qualityObj: QualityProbabilityObject,
  rarity: RARITY,
  itemName: string
) {
  let chance = ONE;
  if (rarity === RARITY.SET) {
    chance = chance.mul(qualityObj.quality[2]);
    for (const setTuple of qualityObj.sets) {
      if (setTuple[0] === itemName) {
        chance = chance.mul(setTuple[1]);
      }
    }
  }
  if (rarity === RARITY.UNIQUE) {
    chance = chance.mul(qualityObj.quality[3]);
    for (const uniqueTuple of qualityObj.uniques) {
      if (uniqueTuple[0] === itemName) {
        chance = chance.mul(uniqueTuple[1]);
      }
    }
  }
  return chance;
}

// Does not take into account whether unique / set item exists and can be dropped
export function computeQualityProb(
  itemCode: string,
  rarity: RARITY,
  ilvl: number, // from monster
  magicFind: number, // from character
  qualityFactor: number // from ItemRarityRatios from TC,
): Fraction {
  // Special case: these items are always at least magical
  if (rarity === RARITY.MAGIC && AtLeastMagicSet.has(ItemDict[itemCode].type)) {
    return new Fraction(1);
  }

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
  if (chance <= 128) {
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
  let candidates = dict[itemCode].filter((candidate) => candidate.lvl <= ilvl);

  // For the purposes of item quality, a grand charm drop always has a 0% chance of being a sunder charm
  // Sunder charms are its own treasure class and spawned separately
  if (itemCode === "cm3") {
    candidates = candidates.filter(
      (candidate) => !isSunderCharmDictEntry(candidate)
    );
  }

  const denom = sum(map(candidates, (candidate) => candidate.rarity));
  return map(candidates, (candidate) => [
    candidate.index,
    new Fraction(candidate.rarity, denom),
  ]);
}

export function qualityNotApplicable(itemCode: string) {
  // If itemCode is not in itemDict, don't attempt to calculate quality
  if (!ItemDict.hasOwnProperty(itemCode)) {
    return true;
  }
  // Don't calculate rarity for special quest items like keys
  if (KEY_REGEX.test(itemCode)) {
    return true;
  }
  // Otherwise, only attempt calculating quality if not in OnlyNormalSet
  return OnlyNormalSet.has(ItemDict[itemCode].type);
}

export function computeQualityProbs(
  itemCode: string,
  ilvl: number,
  magicFind: number = 0,
  qualityFactors: ItemQualityRatios
): QualityProbabilityObject {
  if (qualityNotApplicable(itemCode)) {
    const ZERO = new Fraction(0);
    return {
      quality: [ZERO, ZERO, ZERO, ZERO],
      sets: [],
      uniques: [],
    };
  }
  let [magicProb, rareProb, setProb, uniqProb] = computeQualityProbsHelper(
    itemCode,
    ilvl,
    magicFind,
    qualityFactors
  );
  const candidateUniques = findCandidates(itemCode, ilvl, UniqueBaseLookup);
  const candidateSets = findCandidates(itemCode, ilvl, SetBaseLookup);

  // If there are no uniques that can be generated,
  // Generate a triple-durability rare in its place
  if (candidateUniques.length === 0) {
    rareProb = rareProb.add(uniqProb);
    uniqProb = new Fraction(0);
  }

  // If there are no sets that can be generated,
  // Generate a double-durability magic in its place
  if (candidateSets.length === 0) {
    magicProb = magicProb.add(setProb);
    setProb = new Fraction(0);
  }

  // If item cannot be rare, generate a magic item in its place
  if (!RareableSet.has(ItemDict[itemCode].type)) {
    magicProb = magicProb.add(rareProb);
    rareProb = new Fraction(0);
  }

  return {
    quality: [magicProb, rareProb, setProb, uniqProb],
    sets: candidateSets,
    uniques: candidateUniques,
  };
}

export const SUNDER_CHARM_CANDIDATE_UNIQUES: UniqueSetProbTuple[] = [
  ["Cold Rupture", new Fraction(30, 101)],
  ["Flame Rift", new Fraction(30, 101)],
  ["Crack of the Heavens", new Fraction(20, 101)],
  ["Rotting Fissure", new Fraction(12, 101)],
  ["Bone Break", new Fraction(6, 101)],
  ["Black Cleft", new Fraction(3, 101)],
];
