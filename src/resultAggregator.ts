import Fraction from "fraction.js";
import { reduce } from "lodash-es";

const ONE = new Fraction(1);

export type TCProbTuple = [string, Fraction];
type TCProbDict = { [key: string]: Fraction };

export class TCResultAggregator {
  dict: TCProbDict;

  constructor() {
    this.dict = {};
  }

  add(tc: string, prob: Fraction): void {
    if (this.dict.hasOwnProperty(tc)) {
      this.dict[tc] = this.dict[tc].add(prob);
    } else {
      this.dict[tc] = prob;
    }
  }

  withPositivePicks(picks: number): TCResultAggregator {
    if (picks == 1) {
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
  finalize(): TCResultAggregator {
    for (var key of Object.keys(this.dict)) {
      this.dict[key] = this.dict[key].simplify(1e-15);
    }
    return this;
  }

  result(): TCProbTuple[] {
    return Object.entries(this.dict);
  }
}
