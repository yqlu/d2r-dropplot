import { sum, map, zip } from "lodash-es";
import Fraction from "fraction.js";

import { ResultAggregator } from "./resultAggregator";
import { TCDictType, TCObject, ItemQualityRatios } from "./tc-dict";

// TODO: handle countess rune rate
// TODO: handle Duriel drop rate

const ONE = new Fraction(1);
export type TCLookupFunction = (name: string) => TCObject;

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
      console.error(`${tcName} not a valid TC`);
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
    if (tcObject.picks >= 1) {
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
    const tcDenom = sum(map(tcObject.tcs, 1));
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
