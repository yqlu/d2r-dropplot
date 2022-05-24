import { range, sum, map, clone } from "lodash-es";
import Fraction from "fraction.js";

import { TCDict } from "./tc_dict.js";

export type TCProbTuple = [string, Fraction];
export type TCProbMap = {
  [key: string]: TCProbTuple;
};

export function getAtomicTCs(tc: string): TCProbTuple[] {
  const tcObject = TCDict[tc];
  if (!tcObject) {
    return [];
  }

  // TODO: nodrop as a function of player count
  const nodrop = tcObject.nodrop;
  // TCDict gives relative probability
  // Actual probability is derived by dividing by the sum over all sub TCs (and nodrop)
  const denom = nodrop + sum(map(tcObject.tcs, 1));

  // Some of these TCs are recursively defined, so break them down to their terminal nodes only
  const atomicBreakdown: TCProbTuple[] = [];
  for (var tcTuple of tcObject.tcs) {
    const [subTC, subNum] = tcTuple;
    const subProb = new Fraction(subNum, denom);
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
  // TODO: tests

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

  const dedupedTCs = Object.values(dedupedMap);

  // Up till now we've preserved exact fractional precision
  // Now simplify with an eps
  for (var dedupedTC of dedupedTCs) {
    dedupedTC[1] = dedupedTC[1].simplify(1e-15);
  }

  return dedupedTCs;
}
