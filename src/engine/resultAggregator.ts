import Fraction from "fraction.js";
import { reduce, range, map, sum } from "lodash-es";

import { ItemQualityRatios } from "./tc-dict";
import {
  computeQualityProbs,
  ItemRarityProb,
  QualityProbabilityObject,
} from "./rarity";
import { ONE, scalarMultiply, ZERO } from "./polynomialOps";
import { Distribution } from "./distribution";
import { BinomialRunsChart } from "../charts/BinomialRuns";
import { propagateMarkov, histogramResult } from "./duriel-markov";

export enum ProbabilityAggregation {
  EXPECTED_VALUE,
  CHANCE_OF_FIRST,
}

// TODO abstract out common parts of TCResultAggregator and BaseItemResultAggregator
// TODO build out E2E web framework

export type TCProbTuple = [string, Fraction];
export type TCProbDict = { [key: string]: Fraction };

export type BaseItemProbTuple = [string, Fraction, QualityProbabilityObject];
export type BaseItemProbDict = {
  [key: string]: [Fraction, QualityProbabilityObject];
};

export type BaseItemDistributionTuple = [
  string,
  Distribution,
  QualityProbabilityObject
];
export type BaseItemDistributionDict = {
  [key: string]: [Distribution, QualityProbabilityObject];
};

export interface ResultAggregator<T> {
  add(tc: string, prob: Fraction, qualityRatio?: ItemQualityRatios): void;
  withPositivePicks(picks: number): this;
  combineNegativePicks(other: this): void;
  finalize(): this;
  result(): T;
  adjustCountessRune(itemDropProb: Fraction, runeDropProb: Fraction): void;
  adjustDurielPicks(itemDropProb: Fraction): void;
}

export class TCResultAggregator implements ResultAggregator<TCProbTuple[]> {
  dict: TCProbDict;

  constructor() {
    this.dict = {};
  }

  add(tc: string, prob: Fraction, qual?: ItemQualityRatios): void {
    if (!this.dict.hasOwnProperty(tc)) {
      this.dict[tc] = prob;
    } else {
      this.dict[tc] = this.dict[tc].add(prob);
    }
  }

  withPositivePicks(picks: number) {
    if (picks === 1) {
      return this;
    }
    let adjProbFunction: (p: Fraction) => Fraction;
    if (picks <= 6) {
      // if p is probability of getting X in 1 pick
      // probability of at least 1 X in picks pick is 1 - (1 - X)^picks
      adjProbFunction = (p) => ONE.sub(ONE.sub(p).pow(picks));
    } else {
      // Act bosses have 7 drops, and we can assume that is the max because we verify it in tests
      const yesdrop = reduce(
        Object.values(this.dict),
        (acc, prob) => acc.add(prob),
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
    this.dict = reduce(
      Object.keys(this.dict),
      (accum: TCProbDict, tc: string) => {
        accum[tc] = adjProbFunction(this.dict[tc]);
        return accum;
      },
      {} as TCProbDict
    );
    return this;
  }

  combineNegativePicks(other: TCResultAggregator): void {
    for (var [key, value] of Object.entries(other.dict)) {
      // Insert into map if it doesn't exist
      if (!this.dict.hasOwnProperty(key)) {
        this.dict[key] = value;
      } else {
        // Coalesce probability into map
        // If item X has chance A of dropping from TCA and B of dropping from TCB
        // Combined chance to drop is 1 - (1 - A)(1 - B) = 1 - (1 - A - B + AB) = A + B - AB
        this.dict[key] = ONE.sub(
          ONE.sub(other.dict[key]).mul(ONE.sub(this.dict[key]))
        );
      }
    }
  }

  // Up till now we've preserved exact fractional precision
  // Now simplify with an eps
  finalize() {
    for (var key of Object.keys(this.dict)) {
      this.dict[key] = this.dict[key].simplify(1e-15);
    }
    return this;
  }

  result(): TCProbTuple[] {
    return Object.entries(this.dict);
  }

  adjustCountessRune(itemDropProb: Fraction, runeDropProb: Fraction) {
    // Unimplemented
  }

  adjustDurielPicks(itemDropProb: Fraction) {
    // Unimplemented
  }
}

export class BaseItemResultAggregator
  implements ResultAggregator<BaseItemProbTuple[]>
{
  mlvl: number;
  magicFind: number;
  dict: BaseItemProbDict;
  aggregationStyle: ProbabilityAggregation;

  constructor(
    mlvl: number,
    magicFind: number = 0,
    aggregationStyle: ProbabilityAggregation = ProbabilityAggregation.CHANCE_OF_FIRST
  ) {
    this.mlvl = mlvl;
    this.magicFind = magicFind;
    this.dict = {};
    this.aggregationStyle = aggregationStyle;
  }

  add(
    tc: string,
    prob: Fraction,
    qualityRatios: ItemQualityRatios = [0, 0, 0, 0]
  ): void {
    const qualityProbObject = computeQualityProbs(
      tc,
      this.mlvl,
      this.magicFind,
      qualityRatios
    );
    if (!this.dict.hasOwnProperty(tc)) {
      this.dict[tc] = [prob, qualityProbObject];
    } else {
      // Combine the two
      // Base item prob is additive
      const baseItemProb = this.dict[tc][0].add(prob);
      // But magic / rare / set / unique prob needs to be individually calculated
      const rarityCombined = range(4).map((idx) =>
        qualityProbObject.quality[idx]
          .mul(prob)
          .add(this.dict[tc][1].quality[idx].mul(this.dict[tc][0]))
          .div(baseItemProb)
      ) as ItemRarityProb;
      this.dict[tc] = [
        baseItemProb,
        {
          quality: rarityCombined,
          sets: this.dict[tc][1].sets,
          uniques: this.dict[tc][1].uniques,
        },
      ];
    }
  }

  withPositivePicks(picks: number) {
    if (picks === 1) {
      return this;
    }
    let adjProbFunction: (p: Fraction) => Fraction;
    if (picks <= 6) {
      if (this.aggregationStyle === ProbabilityAggregation.CHANCE_OF_FIRST) {
        // if p is probability of getting X in 1 pick
        // probability of at least 1 X in picks pick is 1 - (1 - X)^picks
        adjProbFunction = (p) => ONE.sub(ONE.sub(p).pow(picks));
      } else {
        adjProbFunction = (p) => p.mul(picks);
      }
    } else {
      // Act bosses have 7 drops, and we can assume that is the max because we verify it in tests
      const yesdrop = reduce(
        Object.values(this.dict),
        (acc, entry) => acc.add(entry[0]),
        new Fraction(0)
      );
      if (this.aggregationStyle === ProbabilityAggregation.CHANCE_OF_FIRST) {
        // Monsters can never drop more than 6 items, so discount the chance that
        //  7 items dropped in total, the first 6 items were not the TC but the 7th was
        adjProbFunction = function (p) {
          const naive = ONE.sub(ONE.sub(p).pow(picks));
          const probDropSomethingElse = yesdrop.sub(p);
          return naive.sub(probDropSomethingElse.pow(6).mul(p));
        };
      } else {
        // Expectation = 7p - (yesDrop)^6 * p
        // Since the last p is not dropped if 6 things dropped before it
        const multiplier = new Fraction(7).sub(yesdrop.pow(6));
        adjProbFunction = (p) => p.mul(multiplier);
      }
    }
    for (let tc in this.dict) {
      const dictEntry = this.dict[tc];
      dictEntry[0] = adjProbFunction(dictEntry[0]);
    }
    return this;
  }

  combineNegativePicks(other: BaseItemResultAggregator): void {
    for (let [key, value] of Object.entries(other.dict)) {
      // Insert into map if it doesn't exist
      if (!this.dict.hasOwnProperty(key)) {
        this.dict[key] = value;
      } else {
        let baseItemProb: Fraction;

        // Coalesce probability into map
        // If item X has chance A of dropping from TCA and B of dropping from TCB
        // Combined chance to drop is 1 - (1 - A)(1 - B) = 1 - (1 - A - B + AB) = A + B - AB
        if (this.aggregationStyle === ProbabilityAggregation.CHANCE_OF_FIRST) {
          baseItemProb = ONE.sub(
            ONE.sub(other.dict[key][0]).mul(ONE.sub(this.dict[key][0]))
          );
        } else {
          baseItemProb = this.dict[key][0].add(other.dict[key][0]);
        }
        const rarityCombined = range(4).map((idx) =>
          value[1].quality[idx]
            .mul(value[0])
            .add(this.dict[key][1].quality[idx].mul(this.dict[key][0]))
            .div(baseItemProb)
        ) as ItemRarityProb;
        this.dict[key] = [
          baseItemProb,
          {
            quality: rarityCombined,
            sets: this.dict[key][1].sets,
            uniques: this.dict[key][1].uniques,
          },
        ];
      }
    }
  }

  // Up till now we've preserved exact fractional precision
  // Now simplify with an eps
  finalize() {
    for (var key of Object.keys(this.dict)) {
      this.dict[key][0] = this.dict[key][0].simplify(1e-15);
    }
    return this;
  }

  result(): BaseItemProbTuple[] {
    return map(Object.keys(this.dict) as string[], (key: string) => {
      const a = this.dict[key];
      return [key, a[0], a[1]];
    });
  }

  adjustCountessRune(itemDropProb: Fraction, runeDropProb: Fraction) {
    if (this.aggregationStyle === ProbabilityAggregation.CHANCE_OF_FIRST) {
      // Unimplemented
      return;
    }
    // If calculating expectation
    const fiveItemDroppedMultiplier = itemDropProb.pow(5);
    const fourItemDroppedMultiplier = new Fraction(5)
      .mul(itemDropProb.pow(4))
      .mul(ONE.sub(itemDropProb));
    const runeNoDrop = ONE.sub(runeDropProb);
    for (let tc of Object.keys(this.dict)) {
      const dProb = this.dict[tc][0];
      const fiveItemDroppedAdjustment = dProb
        .mul(runeDropProb)
        .mul(new Fraction(2).add(runeNoDrop));

      const fourItemDroppedAdjustment = dProb.mul(runeDropProb.pow(2));
      this.dict[tc][0] = this.dict[tc][0]
        .mul(new Fraction(3))
        .sub(fiveItemDroppedMultiplier.mul(fiveItemDroppedAdjustment))
        .sub(fourItemDroppedMultiplier.mul(fourItemDroppedAdjustment));
    }
  }

  adjustDurielPicks(itemDropProb: Fraction) {
    if (this.aggregationStyle === ProbabilityAggregation.CHANCE_OF_FIRST) {
      // Unimplemented
      return;
    }
    const [resultVector] = propagateMarkov(itemDropProb);
    const { tscHistogram, itemHistogram } = histogramResult(resultVector);
    const itemFractionHistogram = itemHistogram.map((val: number) =>
      new Fraction(`${val * 1e10}`).div(new Fraction(1e10))
    );
    const itemDist = Distribution.Polynomial(itemFractionHistogram);
    const expectationModifier = itemDist.eval().expectation();
    for (let tc of Object.keys(this.dict)) {
      const expBefore = this.dict[tc][0];
      this.dict[tc][0] = this.dict[tc][0].mul(expectationModifier);
      const expAfter = this.dict[tc][0];
    }
    const tscExpectationModifier = Distribution.Polynomial(
      tscHistogram.map((val: number) =>
        new Fraction(`${val * 1e10}`).div(new Fraction(1e10))
      )
    )
      .eval()
      .expectation();
    if (this.dict["tsc"]) {
      this.dict["tsc"][0] = this.dict["tsc"][0].add(tscExpectationModifier);
    } else {
      this.dict["tsc"] = [
        tscExpectationModifier,
        computeQualityProbs("tsc", this.mlvl, this.magicFind, [0, 0, 0, 0]),
      ];
    }
  }
}

export class BaseItemDistributionAggregator
  implements ResultAggregator<BaseItemDistributionTuple[]>
{
  mlvl: number;
  magicFind: number;
  dict: BaseItemDistributionDict;

  constructor(mlvl: number, magicFind: number = 0) {
    this.mlvl = mlvl;
    this.magicFind = magicFind;
    this.dict = {};
  }

  add(
    tc: string,
    prob: Fraction,
    qualityRatios: ItemQualityRatios = [0, 0, 0, 0]
  ): void {
    const qualityProbObject = computeQualityProbs(
      tc,
      this.mlvl,
      this.magicFind,
      qualityRatios
    );
    if (!this.dict.hasOwnProperty(tc)) {
      this.dict[tc] = [Distribution.Atomic(prob), qualityProbObject];
    } else {
      // Combine the two
      // Base item prob is additive
      const baseItemDistribution = Distribution.Or([
        [this.dict[tc][0], ONE],
        [Distribution.Atomic(prob), ONE],
      ]);
      // But magic / rare / set / unique prob needs to be individually calculated
      const rarityCombined = range(4).map((idx) =>
        qualityProbObject.quality[idx]
          .mul(prob)
          .add(
            this.dict[tc][1].quality[idx].mul(
              this.dict[tc][0].eval().expectation()
            )
          )
          .div(baseItemDistribution.eval().expectation())
      ) as ItemRarityProb;
      this.dict[tc] = [
        baseItemDistribution,
        {
          quality: rarityCombined,
          sets: this.dict[tc][1].sets,
          uniques: this.dict[tc][1].uniques,
        },
      ];
    }
  }

  withPositivePicks(picks: number) {
    if (picks === 1) {
      return this;
    }
    let adjustedDistFn: (d: Distribution) => Distribution;
    if (picks <= 6) {
      // if p is probability of getting X in 1 pick
      // probability of at least 1 X in picks pick is 1 - (1 - X)^picks
      adjustedDistFn = (d: Distribution) => Distribution.Binomial(d, picks);
    } else {
      // Act bosses have 7 drops, and we can assume that is the max because we verified it in tests
      const yesdrop = reduce(
        Object.values(this.dict),
        (acc, entry) => acc.add(entry[0].eval().atLeastOneChance()),
        new Fraction(0)
      );
      // Monsters can never drop more than 6 items, so discount the chance that
      //  7 items dropped in total, the first 6 items were not the TC but the 7th was
      adjustedDistFn = (d: Distribution) => {
        // Assume that d is atomic for now -- TODO: challenge this
        const dProb = d.eval().coeffs[1];

        const naive = Distribution.Binomial(d, picks);
        const somethingDrops = Distribution.Polynomial([
          yesdrop.sub(dProb),
          dProb,
        ]);
        const firstSixAllDrop = Distribution.Binomial(
          somethingDrops,
          picks - 1
        );
        const correctionFactor = Distribution.And([
          firstSixAllDrop,
          Distribution.Polynomial([dProb, dProb.mul(-1)]),
        ]);
        return Distribution.Or([
          [naive, ONE],
          [correctionFactor, ONE],
        ]);
      };
    }
    for (let tc of Object.keys(this.dict)) {
      this.dict[tc][0] = adjustedDistFn(this.dict[tc][0]);
    }
    return this;
  }

  combineNegativePicks(other: BaseItemDistributionAggregator): void {
    for (let [key, value] of Object.entries(other.dict)) {
      // Insert into map if it doesn't exist
      if (!this.dict.hasOwnProperty(key)) {
        this.dict[key] = value;
      } else {
        let baseItemDistribution: Distribution;
        baseItemDistribution = Distribution.And([
          this.dict[key][0],
          other.dict[key][0],
        ]);
        const rarityCombined = range(4).map((idx) =>
          value[1].quality[idx]
            .mul(value[0].eval().expectation())
            .add(
              this.dict[key][1].quality[idx].mul(
                this.dict[key][0].eval().expectation()
              )
            )
            .div(baseItemDistribution.eval().expectation())
        ) as ItemRarityProb;
        this.dict[key] = [
          baseItemDistribution,
          {
            quality: rarityCombined,
            sets: this.dict[key][1].sets,
            uniques: this.dict[key][1].uniques,
          },
        ];
      }
    }
  }

  // Up till now we've preserved exact fractional precision
  // Now simplify with an eps
  finalize() {
    for (var key of Object.keys(this.dict)) {
      this.dict[key][0].simplify(1e-15);
    }
    return this;
  }

  result(): BaseItemDistributionTuple[] {
    return map(Object.keys(this.dict) as string[], (key: string) => {
      const a = this.dict[key];
      return [key, a[0], a[1]];
    });
  }

  adjustCountessRune(itemDropProb: Fraction, runeDropProb: Fraction) {
    const fiveItemDroppedMultiplier = itemDropProb.pow(5);
    const fourItemDroppedMultiplier = new Fraction(5)
      .mul(itemDropProb.pow(4))
      .mul(ONE.sub(itemDropProb));
    for (let tc of Object.keys(this.dict)) {
      // Assume that d is atomic for now -- TODO: challenge this
      const dComp = this.dict[tc][0].eval().coeffs[0];
      const dProb = this.dict[tc][0].eval().coeffs[1];
      const otherRuneDropProb = runeDropProb.sub(dProb);
      const fiveItemDroppedAdjustment = Distribution.And([
        Distribution.Polynomial([otherRuneDropProb, dProb]),
        Distribution.Polynomial([dProb, dProb.mul(new Fraction(-1))]),
        Distribution.Polynomial([
          dComp.mul(new Fraction(2)).add(ONE.sub(runeDropProb)),
          dProb.mul(new Fraction(2)),
        ]),
      ]);
      const fourItemDroppedAdjustment = Distribution.And([
        Distribution.Binomial(
          Distribution.Polynomial([otherRuneDropProb, dProb]),
          2
        ),
        Distribution.Polynomial([dProb, dProb.mul(new Fraction(-1))]),
      ]);
      this.dict[tc][0] = Distribution.Or([
        [Distribution.Binomial(this.dict[tc][0], 3), ONE],
        [fiveItemDroppedAdjustment, fiveItemDroppedMultiplier],
        [fourItemDroppedAdjustment, fourItemDroppedMultiplier],
      ]);
    }
  }

  adjustDurielPicks(itemDropProb: Fraction) {
    const [resultVector] = propagateMarkov(itemDropProb);
    const { tscHistogram, itemHistogram } = histogramResult(resultVector);
    const itemFractionHistogram = itemHistogram.map((val: number) =>
      new Fraction(`${val * 1e10}`).div(new Fraction(1e10))
    );
    const itemDist = Distribution.Polynomial(itemFractionHistogram);
    for (let tc of Object.keys(this.dict)) {
      const substituteResult = Distribution.Substitute(
        itemDist,
        this.dict[tc][0]
      );
      this.dict[tc][0] = substituteResult;
    }
    // Specially account for tsc
    const tscDistribution = Distribution.Polynomial(
      tscHistogram.map((val: number) =>
        new Fraction(`${val * 1e10}`).div(new Fraction(1e10))
      )
    );
    if (this.dict["tsc"]) {
      this.dict["tsc"][0] = Distribution.Or([
        [this.dict["tsc"][0], ONE],
        [tscDistribution, ONE],
      ]);
    } else {
      this.dict["tsc"] = [
        tscDistribution,
        computeQualityProbs("tsc", this.mlvl, this.magicFind, [0, 0, 0, 0]),
      ];
    }
  }
}
