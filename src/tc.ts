import { range, sum, map, clone, reduce } from "lodash-es";
import Fraction from "fraction.js";

import { TCDictType, TCObject } from "./tc-dict.js";
import { ItemDict } from "./item-dict.js";

// TODO: handle Griswold quality rate
// TODO: handle countess rune rate
// TODO: handle Duriel drop rate

const ONE = new Fraction(1);

function adjustProbabilityByPicks(
  tcs: TCProbTuple[],
  picks: number
): TCProbTuple[] {
  if (picks == 1) {
    return tcs;
  }
  let adjProbFunction: (p: Fraction) => Fraction;
  if (picks <= 6) {
    // if p is probability of getting X in 1 pick
    // probability of at least 1 X in picks pick is 1 - (1 - X)^picks
    adjProbFunction = (p) => ONE.sub(ONE.sub(p).pow(picks));
  } else {
    // Act bosses have 7 drops, and we can assume that is the max because we verify it in tests
    const yesdrop = reduce(
      tcs,
      (acc, tcTuple) => acc.add(tcTuple[1]),
      new Fraction(0)
    );
    // Monsters can never drop more than 6 items, so discount the chance that
    //  7 items dropped in total, the first 6 items were not the TC but the 7th was
    adjProbFunction = function (p) {
      const naive = ONE.sub(ONE.sub(p).pow(picks));
      const probDropSomethingElse = yesdrop.sub(p);
      return naive.sub(probDropSomethingElse.pow(6).mul(p));
    };
  }
  return tcs.map((tcTuple: TCProbTuple) => {
    const [tcName, probability] = tcTuple;
    const adjProbability = adjProbFunction(probability);
    return [tcTuple[0], adjProbability];
  });
}

export type TCProbTuple = [string, Fraction];
export type TCProbMap = {
  [key: string]: TCProbTuple;
};
export type TCLookupFunction = (name: string) => TCObject;

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

export function makeLookupTcFunction(
  tcDict: TCDictType,
  atomicDict: TCDictType
): TCLookupFunction {
  return function (name: string): TCObject {
    if (tcDict.hasOwnProperty(name)) {
      return tcDict[name];
    } else if (atomicDict.hasOwnProperty(name)) {
      return atomicDict[name];
    } else {
      return null;
    }
  };
}

export function getTcCalculator(lookupTcFunction: TCLookupFunction) {
  // Define this function inside closure to gain access to passed in lookup fn
  // Take a TC name and player count and return a list of TCProbTuples
  // reflecting the probability of hitting each atomic TC
  function getAtomicTCs(
    tcName: string,
    totalPlayers = 1,
    partyCount = 1,
    filter = new Set() as Set<string>
  ): TCProbTuple[] {
    const tcObject = lookupTcFunction(tcName);

    let tcs: TCProbTuple[];
    if (tcObject.picks >= 1) {
      const atomicTCsOnePick = _getAtomicTCsOnePick(
        tcObject,
        totalPlayers,
        partyCount,
        filter
      );
      tcs = adjustProbabilityByPicks(atomicTCsOnePick, tcObject.picks);
    } else {
      tcs = getAtomicTCsNegativePicks(
        tcObject,
        totalPlayers,
        partyCount,
        filter
      );
    }

    // Up till now we've preserved exact fractional precision
    // Now simplify with an eps
    for (var tc of tcs) {
      tc[1] = tc[1].simplify(1e-15);
    }
    return tcs;
  }

  function getAtomicTCsNegativePicks(
    tcObject: TCObject,
    totalPlayers = 1,
    partyCount = 1,
    filter = new Set() as Set<string>
  ): TCProbTuple[] {
    const atomicTcMap: { [key: string]: TCProbTuple } = {};
    let cumulativePickCount = 0;
    // Picks = -4, with [TCA, 2], [TCB, 2]
    // means drawing 2 picks from TCA and 2 picks from TCB
    for (var tcTuple of tcObject.tcs) {
      let [subTC, subPicks] = tcTuple;
      subPicks = Math.min(
        subPicks,
        Math.abs(tcObject.picks) - cumulativePickCount
      );
      // Only recursively expand subTC and push to atomicTcMap if...
      // it is not atomic, or
      // it is atomic and there is no filter or it belongs in the filter
      if (lookupTcFunction(subTC) || filter.size == 0 || filter.has(subTC)) {
        // TODO: this will crash if subTC is atomic
        const atomicTcsOfSubTc = adjustProbabilityByPicks(
          getAtomicTCs(subTC, totalPlayers, partyCount),
          subPicks
        );
        for (var atomicSubTc of atomicTcsOfSubTc) {
          // atomicSubTC is atomic, but again apply the filter check
          if (filter.size > 0 && !filter.has(atomicSubTc[0])) {
            continue;
          }
          const entry = atomicTcMap[atomicSubTc[0]];
          // Insert into map if it doesn't exist
          if (!entry) {
            atomicTcMap[atomicSubTc[0]] = atomicSubTc;
          } else {
            // Coalesce probability into map
            // If item X has chance A of dropping from TCA and B of dropping from TCB
            // Combined chance to drop is 1 - (1 - A)(1 - B) = 1 - (1 - A - B + AB) = A + B - AB
            console.log("COALESCE", entry[1], atomicSubTc[1]);
            // TODO: track separately
            entry[1] = ONE.sub(ONE.sub(entry[1]).mul(ONE.sub(atomicSubTc[1])));
          }
        }
      }
      cumulativePickCount += tcTuple[1];
    }
    return Object.values(atomicTcMap);
  }

  function _getAtomicTCsOnePick(
    tcObject: TCObject,
    totalPlayers = 1,
    partyCount = 1,
    filter = new Set() as Set<string>
  ): TCProbTuple[] {
    // tcs gives relative probability
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
      // If subTC is not present in lookup, it is atomic
      if (!lookupTcFunction(subTC)) {
        // If there is a filter, only track if it is in the filter
        if (filter.size == 0 || filter.has(subTC)) {
          atomicBreakdown.push([subTC, subProb]);
        }
      } else {
        // Call getAtomicTCs recursively
        // TODO: if there is a filter and we know subTC expanded doesn't contain anything in the filter
        // we can afford to early exit.
        const atomicTCsOfSub = getAtomicTCs(
          subTC,
          totalPlayers,
          partyCount,
          filter
        );
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
        dedupedMap[atomicTC[0]][1] = dedupedMap[atomicTC[0]][1].add(
          atomicTC[1]
        );
      }
    }
    return Object.values(dedupedMap);
  }

  return getAtomicTCs;
}
