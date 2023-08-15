import { sum, map, zip } from "lodash-es";
import Fraction from "fraction.js";

import { ResultAggregator } from "./resultAggregator";
import { TCDictType, TCObject, ItemQualityRatios, TCDict } from "./tc-dict";
import { ONE } from "./polynomialOps";

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
    tcObject.tcs.length > 0 &&
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

export function getTcDropProb(
  tcObject: TCObject,
  totalPlayers: number,
  partyCount: number
) {
  const denom = sum(map(tcObject.tcs, (tuple) => tuple[1]));
  const nodrop = getAdjustedNoDrop(
    denom,
    tcObject.nodrop,
    totalPlayers,
    partyCount
  );
  const itemDropProb = ONE.sub(new Fraction(nodrop, nodrop + denom));
  return itemDropProb;
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
      const tcDropProb =
        tcObject.picks > 1
          ? getTcDropProb(tcObject, totalPlayers, partyCount)
          : ONE;
      return this.getAtomicTCsOnePick(
        tcObject,
        totalPlayers,
        partyCount,
        filter,
        cumuProb,
        cumuQualityRatios,
        aggregator
      ).withPositivePicks(tcObject.picks, tcDropProb);
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
        const subTcObject = this.lookupTcFunction(subTC); // TODO: this will crash if subTC is atomic
        const subTcDropProb = getTcDropProb(
          subTcObject,
          totalPlayers,
          partyCount
        );
        this._getAtomicTCs(
          subTcObject,
          totalPlayers,
          partyCount,
          filter,
          cumuProb,
          tcObject.qualityRatios,
          subAggregator
        ).withPositivePicks(subPicks, subTcDropProb);
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
    // Either there are two child TCs (Item, Rune)
    // Or there are three child TCs (Sunder Charm, Item, Rune)
    const countessItemTc =
      tcObject.tcs.length === 2 ? tcObject.tcs[0] : tcObject.tcs[1];
    const countessRuneTc =
      tcObject.tcs.length === 2 ? tcObject.tcs[1] : tcObject.tcs[2];

    // First calculate the first TC (Countess Item) normally
    // writing into parentAggregator
    const itemTc = this.lookupTcFunction(countessItemTc[0]);
    this._getAtomicTCs(
      itemTc,
      totalPlayers,
      partyCount,
      filter,
      cumuProb,
      tcObject.qualityRatios,
      parentAggregator
    );

    // Now calculate the second TC (Countess Rune) into runeAggregator
    const runeAggregator = this.aggregatorFactory();
    const runeTc = this.lookupTcFunction(countessRuneTc[0]);
    this.getAtomicTCsOnePick(
      runeTc,
      totalPlayers,
      partyCount,
      filter,
      cumuProb,
      tcObject.qualityRatios,
      runeAggregator
    );

    // Run Countess special adjustment before combining the two
    const itemDropProb = getTcDropProb(itemTc, totalPlayers, partyCount);
    const runeDropProb = getTcDropProb(runeTc, totalPlayers, partyCount);
    runeAggregator.adjustCountessRune(itemDropProb, runeDropProb);
    parentAggregator.combineNegativePicks(runeAggregator);

    // If there is a sunder charm TC, aggregate it too
    if (tcObject.tcs.length === 3) {
      const sunderCharmAggregator = this.aggregatorFactory();
      const sunderCharmTc = this.lookupTcFunction(tcObject.tcs[0][0]);
      this.getAtomicTCsOnePick(
        sunderCharmTc,
        totalPlayers,
        partyCount,
        filter,
        cumuProb,
        tcObject.qualityRatios,
        sunderCharmAggregator
      );
      parentAggregator.combineNegativePicks(sunderCharmAggregator);
    }

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
    const itemTc = tcObject.tcs[1][0];
    // For adjustDurielPicks to work out correctly, expand itemTc
    // assuming nodrop = 0
    const itemTcObjectCopy = { ...TCDict[itemTc], nodrop: 0 };
    this.getAtomicTCsOnePick(
      itemTcObjectCopy,
      totalPlayers,
      partyCount,
      filter,
      cumuProb,
      tcObject.qualityRatios,
      parentAggregator
    ); // Don't amplify by number of picks!

    const itemDropProb = getTcDropProb(
      TCDict[itemTc],
      totalPlayers,
      partyCount
    );
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
