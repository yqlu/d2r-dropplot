import { range, sum, map, clone, reduce } from "lodash-es";
import Fraction from "fraction.js";

import { TCDict, TCObject } from "./tc_dict.js";

// TODO: handle countess rune rate
// TODO: handle Duriel drop rate

const ONE = new Fraction(1);

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
      tcObject,
      totalPlayers,
      partyCount
    );
    tcs = adjustProbabilityByPicks(atomicTCsOnePick, tcObject.picks);
  } else {
    tcs = getAtomicTCsNegativePicks(tcObject, totalPlayers, partyCount);
  }

  // Up till now we've preserved exact fractional precision
  // Now simplify with an eps
  for (var tc of tcs) {
    tc[1] = tc[1].simplify(1e-15);
  }
  return tcs;
}

export function sortTCs(tcs: TCProbTuple[]): TCProbTuple[] {
  let runeTCs: TCProbTuple[] = [];
  let weapTCs: TCProbTuple[] = [];
  let armoTCs: TCProbTuple[] = [];
  let bowTCs: TCProbTuple[] = [];
  let meleTCs: TCProbTuple[] = [];
  let others: TCProbTuple[] = [];

  for (var tcTuple of tcs) {
    if (/^r[0-9]{2}$/.exec(tcTuple[0])) {
      runeTCs.push(tcTuple);
    } else if (/^weap[0-9]+$/.exec(tcTuple[0])) {
      weapTCs.push(tcTuple);
    } else if (/^armo[0-9]+$/.exec(tcTuple[0])) {
      armoTCs.push(tcTuple);
    } else if (/^bow[0-9]+$/.exec(tcTuple[0])) {
      bowTCs.push(tcTuple);
    } else if (/^mele[0-9]+$/.exec(tcTuple[0])) {
      meleTCs.push(tcTuple);
    } else {
      others.push(tcTuple);
    }
  }
  runeTCs.sort(
    (a, b) => parseInt(a[0].substring(1)) - parseInt(b[0].substring(1))
  );
  weapTCs.sort(
    (a, b) => parseInt(a[0].substring(4)) - parseInt(b[0].substring(4))
  );
  armoTCs.sort(
    (a, b) => parseInt(a[0].substring(4)) - parseInt(b[0].substring(4))
  );
  bowTCs.sort(
    (a, b) => parseInt(a[0].substring(3)) - parseInt(b[0].substring(3))
  );
  meleTCs.sort(
    (a, b) => parseInt(a[0].substring(4)) - parseInt(b[0].substring(4))
  );
  others.sort((a, b) => a[0].localeCompare(b[0]));
  return runeTCs
    .concat(weapTCs)
    .concat(armoTCs)
    .concat(bowTCs)
    .concat(meleTCs)
    .concat(others);
}

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
    // Monsters can never drop more than 6 items, so discount the chance that 7 items dropped,
    // the first 6 items were not the TC but the 7th was
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

function getAtomicTCsNegativePicks(
  tcObject: TCObject,
  totalPlayers = 1,
  partyCount = 1
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
    const atomicTcsOfSubTc = adjustProbabilityByPicks(
      getAtomicTCs(subTC, totalPlayers, partyCount),
      subPicks
    );

    for (var atomicSubTc of atomicTcsOfSubTc) {
      const entry = atomicTcMap[atomicSubTc[0]];
      // Insert into map if it doesn't exist
      if (!entry) {
        atomicTcMap[atomicSubTc[0]] = atomicSubTc;
      } else {
        // Coalesce probability into map
        // If item X has chance A of dropping from TCA and B of dropping from TCB
        // Combined chance to drop is 1 - (1 - A)(1 - B)
        entry[1] = ONE.sub(ONE.sub(entry[1]).mul(ONE.sub(atomicSubTc[1])));
      }
    }
    cumulativePickCount += tcTuple[1];
  }
  return Object.values(atomicTcMap);
}

function _getAtomicTCsOnePick(
  tcObject: TCObject,
  totalPlayers = 1,
  partyCount = 1
): TCProbTuple[] {
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
