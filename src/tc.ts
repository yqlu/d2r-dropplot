import { range, sum, map, clone } from "lodash-es";
import Fraction from "fraction.js";

import { TCDict } from "./tc_dict.js";

export type TCProbTuple = [string, Fraction];
export type TCProbMap = {
  [key: string]: TCProbTuple;
};

export function getAdjustedDenom(
  tcDenom: number,
  tcNoDrop: number,
  totalPlayers: number = 1,
  partyCount: number = 1
): number {
  // Easy early optimization
  if (tcNoDrop == 0) {
    return tcDenom;
  } else if (totalPlayers == 1) {
    return tcDenom + tcNoDrop;
  }
  // validate inputs
  if (partyCount > totalPlayers) {
    throw new Error(
      `Party count ${partyCount} cannot exceed total number of players ${totalPlayers}`
    );
  }
  if (totalPlayers > 8) {
    throw new Error(`Number of players ${totalPlayers} cannot exceed 8`);
  }
  // https://diablo2.diablowiki.net/Item_Generation_Tutorial
  const n = Math.floor(1 + (partyCount - 1) / 2 + (totalPlayers - 1) / 2);
  const adjustedNoDropRate = Math.pow(tcNoDrop / (tcNoDrop + tcDenom), n);
  const adjustedNoDrop = Math.floor(
    (adjustedNoDropRate / (1 - adjustedNoDropRate)) * tcDenom
  );
  return adjustedNoDrop + tcDenom;
}

// Take a TC name and player count and return a list of TCProbTuples
// reflecting the probability of hitting each atomic TC
export function getAtomicTCs(
  tcName: string,
  totalPlayers = 1,
  partyCount = 1
): TCProbTuple[] {
  const tcObject = TCDict[tcName];

  let tcs: TCProbTuple[];
  if (tcObject.picks >= 1) {
    const atomicTCsOnePick = _getAtomicTCsOnePick(
      tcName,
      totalPlayers,
      partyCount
    );
    tcs = adjustProbabilityByPicks(atomicTCsOnePick, tcObject.picks);
  } else {
    // negative picks
    tcs = [];
  }

  // Up till now we've preserved exact fractional precision
  // Now simplify with an eps
  for (var tc of tcs) {
    tc[1] = tc[1].simplify(1e-15);
  }
  return tcs;
}

function adjustProbabilityByPicks(
  tcs: TCProbTuple[],
  picks: number
): TCProbTuple[] {
  if (picks == 1) {
    return tcs;
  }
  return tcs.map((tcTuple: TCProbTuple) => {
    const [tcName, probability] = tcTuple;
    const one = new Fraction(1);
    const adjProbability = one.sub(one.sub(probability).pow(picks));
    return [tcTuple[0], adjProbability];
  });
}

// TODO: positive picks > 1
// TODO: negative picks (HARD)
// TODO: track max over item quality ratios

function _getAtomicTCsOnePick(
  tcName: string,
  totalPlayers = 1,
  partyCount = 1
): TCProbTuple[] {
  const tcObject = TCDict[tcName];
  if (!tcObject) {
    return [];
  }

  // TCDict gives relative probability
  const tcDenom = sum(map(tcObject.tcs, 1));
  // Actual probability is derived by dividing by the sum over all sub TCs (and nodrop)
  const tcDenomAdjustedNoDrop = getAdjustedDenom(
    tcDenom,
    tcObject.nodrop,
    totalPlayers,
    partyCount
  );

  // Some of these TCs are recursively defined, so break them down to their terminal nodes only
  const atomicBreakdown: TCProbTuple[] = [];
  for (var tcTuple of tcObject.tcs) {
    const [subTC, subNum] = tcTuple;
    const subProb = new Fraction(subNum, tcDenomAdjustedNoDrop);
    // If subTC is not present in TCDict, it is atomic - pass it over to atomicBreakdown
    if (!TCDict[subTC]) {
      atomicBreakdown.push([subTC, subProb]);
    } else {
      // Call getAtomicTCs recursively
      const atomicTCsOfSub = getAtomicTCs(subTC);
      for (var atomicTC of atomicTCsOfSub) {
        atomicTC[1] = atomicTC[1].mul(subProb);
        atomicBreakdown.push(atomicTC);
      }
    }
  }

  // Due to recursive calls and duplicates in the TC table, the same TC (e.g. weap15) may show up
  // multiple times.
  // Consolidate them in a map and sum up all probabilities of duplicate entries
  const dedupedMap: TCProbMap = {};
  for (var atomicTC of atomicBreakdown) {
    if (!dedupedMap[atomicTC[0]]) {
      dedupedMap[atomicTC[0]] = atomicTC;
    } else {
      dedupedMap[atomicTC[0]][1] = dedupedMap[atomicTC[0]][1].add(atomicTC[1]);
    }
  }

  return Object.values(dedupedMap);
}
