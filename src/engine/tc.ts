import { sum, map, zip } from "lodash-es";
import Fraction from "fraction.js";

import { ResultAggregator } from "./resultAggregator";
import { TCDictType, TCObject, ItemQualityRatios, TCDict } from "./tc-dict";
import { ONE } from "./polynomialOps";

// TODO: handle countess rune rate
// TODO: handle Duriel drop rate

export type TCLookupFunction = (name: string) => TCObject;

const isCountess = (tcObject: TCObject) => {
  return (
    tcObject === TCDict["Countess"] ||
    tcObject === TCDict["Countess (N)"] ||
    tcObject === TCDict["Countess (H)"]
  );
};

const isDuriel = (tcObject: TCObject) => {
  return (
    tcObject !== null &&
    tcObject.tcs[0][0] === "tsc" &&
    tcObject.tcs[1][0].slice(0, 6) === "Duriel"
  );
};

export function maxQualityRatios(a: ItemQualityRatios, b: ItemQualityRatios) {
  return map(zip(a, b), ([ratioA, ratioB]) =>
    Math.max(ratioA, ratioB)
  ) as ItemQualityRatios;
}

export function getAdjustedDenom(
  tcDenom: number,
  tcNoDrop: number,
  totalPlayers: number = 1,
  partyCount: number = 1
): number {
  // Easy early optimization
  if (tcNoDrop === 0) {
    return tcDenom;
  } else if (totalPlayers === 1) {
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
  const adjustedNoDrop = getAdjustedNoDrop(
    tcDenom,
    tcNoDrop,
    totalPlayers,
    partyCount
  );
  return adjustedNoDrop + tcDenom;
}

export function getAdjustedNoDrop(
  tcDenom: number,
  tcNoDrop: number,
  totalPlayers: number,
  partyCount: number
) {
  // https://diablo2.diablowiki.net/Item_Generation_Tutorial
  const n = Math.floor(1 + (partyCount - 1) / 2 + (totalPlayers - 1) / 2);
  const adjustedNoDropRate = Math.pow(tcNoDrop / (tcNoDrop + tcDenom), n);
  // Hack for numerical instability where 19 for Countess Item would become 18.9999
  return Math.floor(
    (adjustedNoDropRate / (1 - adjustedNoDropRate)) * tcDenom * (1 + 1e-10)
  );
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

export class TcCalculator<T> {
  lookupTcFunction: TCLookupFunction;
  aggregatorFactory: () => ResultAggregator<T>;

  constructor(
    lookupTcFunction: TCLookupFunction,
    aggregatorFactory: () => ResultAggregator<T>
  ) {
    this.lookupTcFunction = lookupTcFunction;
    this.aggregatorFactory = aggregatorFactory;
  }

  // Define this function inside closure to gain access to passed in lookup fn
  // Take a TC name and player count and return a list of TCProbTuples
  // reflecting the probability of hitting each atomic TC
  getAtomicTCs(
    tcName: string,
    totalPlayers = 1,
    partyCount = 1,
    filter = new Set() as Set<string>
  ): ResultAggregator<T> {
    const aggregator = this.aggregatorFactory();
    const tcObject = this.lookupTcFunction(tcName);
    if (!tcObject) {
      console.trace(`${tcName} not a valid TC`);

      return this.aggregatorFactory().finalize();
    }
    return this._getAtomicTCs(
      tcObject,
      totalPlayers,
      partyCount,
      filter,
      ONE,
      [0, 0, 0, 0],
      aggregator
    ).finalize();
  }

  private _getAtomicTCs(
    tcObject: TCObject,
    totalPlayers: number,
    partyCount: number,
    filter: Set<string>,
    cumuProb: Fraction,
    cumuQualityRatios: ItemQualityRatios,
    aggregator: ResultAggregator<T>
  ): ResultAggregator<T> {
    if (isDuriel(tcObject)) {
      return this.getAtomicTcsDurielCase(
        tcObject,
        totalPlayers,
        partyCount,
        filter,
        cumuProb,
        aggregator
      );
    } else if (isCountess(tcObject)) {
      return this.getAtomicTcsCountessCase(
        tcObject,
        totalPlayers,
        partyCount,
        filter,
        cumuProb,
        aggregator
      );
    } else if (tcObject.picks >= 0) {
      return this.getAtomicTCsOnePick(
        tcObject,
        totalPlayers,
        partyCount,
        filter,
        cumuProb,
        cumuQualityRatios,
        aggregator
      ).withPositivePicks(tcObject.picks);
    } else {
      return this.getAtomicTCsNegativePicks(
        tcObject,
        totalPlayers,
        partyCount,
        filter,
        cumuProb,
        aggregator
      );
    }
  }

  private getAtomicTCsNegativePicks(
    tcObject: TCObject,
    totalPlayers: number,
    partyCount: number,
    filter: Set<string>,
    cumuProb: Fraction,
    parentAggregator: ResultAggregator<T>
  ): ResultAggregator<T> {
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
      if (
        this.lookupTcFunction(subTC) ||
        filter.size === 0 ||
        filter.has(subTC)
      ) {
        const subAggregator = this.aggregatorFactory();
        this._getAtomicTCs(
          this.lookupTcFunction(subTC), // TODO: this will crash if subTC is atomic
          totalPlayers,
          partyCount,
          filter,
          cumuProb,
          tcObject.qualityRatios,
          subAggregator
        ).withPositivePicks(subPicks);
        parentAggregator.combineNegativePicks(subAggregator);
      }
      cumulativePickCount += tcTuple[1];
    }
    return parentAggregator;
  }

  private getAtomicTcsCountessCase(
    tcObject: TCObject,
    totalPlayers: number,
    partyCount: number,
    filter: Set<string>,
    cumuProb: Fraction,
    parentAggregator: ResultAggregator<T>
  ): ResultAggregator<T> {
    // First calculate the first TC (Countess Item) normally
    // writing into parentAggregator
    const itemTc = tcObject.tcs[0][0];
    const itemTcObject = TCDict[itemTc];
    const itemDenom = sum(map(itemTcObject.tcs, (tuple) => tuple[1]));
    const itemNoDrop = getAdjustedNoDrop(
      itemDenom,
      itemTcObject.nodrop,
      totalPlayers,
      partyCount
    );
    const itemDropProb = ONE.sub(
      new Fraction(itemNoDrop, itemNoDrop + itemDenom)
    );
    this._getAtomicTCs(
      this.lookupTcFunction(itemTc),
      totalPlayers,
      partyCount,
      filter,
      cumuProb,
      tcObject.qualityRatios,
      parentAggregator
    );

    // Now calculate the second TC (Countess Rune) into runeAggregator
    const runeAggregator = this.aggregatorFactory();
    const runeTc = tcObject.tcs[1][0];
    const runeTcObject = TCDict[runeTc];
    const runeDenom = sum(map(runeTcObject.tcs, (tuple) => tuple[1]));
    const runeNoDrop = getAdjustedNoDrop(
      runeDenom,
      runeTcObject.nodrop,
      totalPlayers,
      partyCount
    );
    const runeDropProb = ONE.sub(
      new Fraction(runeNoDrop, runeNoDrop + runeDenom)
    );
    this._getAtomicTCs(
      this.lookupTcFunction(runeTc),
      totalPlayers,
      partyCount,
      filter,
      cumuProb,
      tcObject.qualityRatios,
      runeAggregator
    );

    // Run Countess special adjustment before combining the two
    runeAggregator.adjustCountessRune(itemDropProb, runeDropProb);
    parentAggregator.combineNegativePicks(runeAggregator);
    return parentAggregator;
  }

  private getAtomicTcsDurielCase(
    tcObject: TCObject,
    totalPlayers: number,
    partyCount: number,
    filter: Set<string>,
    cumuProb: Fraction,
    parentAggregator: ResultAggregator<T>
  ): ResultAggregator<T> {
    // First calculate the first TC (Countess Item) normally
    // writing into parentAggregator
    const itemTc = tcObject.tcs[1][0];
    const itemTcObjectCopy = { ...TCDict[itemTc] };
    const itemDenom = sum(map(itemTcObjectCopy.tcs, (tuple) => tuple[1]));
    const itemNoDrop = getAdjustedNoDrop(
      itemDenom,
      itemTcObjectCopy.nodrop,
      totalPlayers,
      partyCount
    );
    const itemDropProb = ONE.sub(
      new Fraction(itemNoDrop, itemNoDrop + itemDenom)
    );
    // For adjustDurielPicks to work out correctly, expand itemTc
    // assuming nodrop = 0
    itemTcObjectCopy.nodrop = 0;
    this.getAtomicTCsOnePick(
      itemTcObjectCopy,
      totalPlayers,
      partyCount,
      filter,
      cumuProb,
      tcObject.qualityRatios,
      parentAggregator
    ); // Don't amplify by number of picks!

    parentAggregator.adjustDurielPicks(itemDropProb);

    // Now add back tsc
    return parentAggregator;
  }

  private getAtomicTCsOnePick(
    tcObject: TCObject,
    totalPlayers: number,
    partyCount: number,
    filter: Set<string>,
    cumuProb: Fraction,
    cumuQualityRatios: ItemQualityRatios,
    aggregator: ResultAggregator<T>
  ): ResultAggregator<T> {
    // tcs gives relative probability
    const tcDenom = sum(map(tcObject.tcs, (tuple) => tuple[1]));
    // Actual probability is derived by dividing by the sum over all sub TCs (and nodrop)
    const tcDenomAdjustedNoDrop = getAdjustedDenom(
      tcDenom,
      tcObject.nodrop,
      totalPlayers,
      partyCount
    );

    cumuQualityRatios = maxQualityRatios(
      cumuQualityRatios,
      tcObject.qualityRatios
    );

    // Some of these TCs are recursively defined, so break them down to their terminal nodes only
    for (var tcTuple of tcObject.tcs) {
      const [subTC, subNum] = tcTuple;
      const subProb = new Fraction(subNum, tcDenomAdjustedNoDrop).mul(cumuProb);
      // If subTC is not present in lookup, it is atomic
      if (!this.lookupTcFunction(subTC)) {
        // If there is a filter, only track if it is in the filter
        if (filter.size === 0 || filter.has(subTC)) {
          aggregator.add(subTC, subProb, cumuQualityRatios);
        }
      } else {
        // Call getAtomicTCs recursively
        // TODO: if there is a filter and we know subTC expanded doesn't contain anything in the filter
        // we can afford to early exit.
        this._getAtomicTCs(
          this.lookupTcFunction(subTC),
          totalPlayers,
          partyCount,
          filter,
          subProb,
          cumuQualityRatios,
          aggregator
        );
      }
    }
    return aggregator;
  }
}
