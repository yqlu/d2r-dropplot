import Fraction from "fraction.js";
import { range } from "lodash-es";

import {
  polynomialAdd,
  polynomialMul,
  scalarMultiply,
  ONE,
  ZERO,
  polynomialReduce,
} from "./polynomialOps";

export type OrDistributionTuple = [Distribution, Fraction];

export class Distribution {
  eval(): Polynomial {
    throw new Error("Child class must implement this!");
  }

  simplify(eps: number = 1e-15): void {
    this.eval().polySimplify(eps);
    return;
  }

  static Polynomial(coeffs: Fraction[]) {
    return new Polynomial(coeffs).eval();
  }

  // static constructors
  static Atomic(chance: Fraction): Distribution {
    return new Polynomial([ONE.sub(chance), chance]).eval();
  }

  static Binomial(d: Distribution, picks: number): Distribution {
    return new Binomial(d, picks).eval();
  }

  static Or(distTuples: OrDistributionTuple[]): Distribution {
    return new Or(distTuples).eval();
  }

  static And(dists: Distribution[]): Distribution {
    return new And(dists).eval();
  }

  static Substitute(parent: Distribution, child: Distribution): Distribution {
    return new Substitute(parent, child).eval();
  }
}

export class Polynomial extends Distribution {
  private _expectation: Fraction | null = null;
  private _atLeastOneChance: Fraction | null = null;
  private _variance: Fraction | null = null;
  public coeffs: Fraction[];

  constructor(coeffs: Fraction[]) {
    super();
    this.coeffs = polynomialReduce(coeffs);
  }

  polySimplify(eps: number) {
    for (let i = 0; i < this.coeffs.length; i++) {
      this.coeffs[i] = this.coeffs[i].simplify(eps);
    }
    while (!this.coeffs[this.coeffs.length - 1].compare(0)) {
      this.coeffs.pop();
    }
    this.coeffs[0] = ONE.sub(
      this.coeffs.slice(1).reduce((a, b) => a.add(b), ZERO)
    );
  }

  expectation() {
    if (this._expectation) {
      return this._expectation;
    }
    this._expectation = this.coeffs.reduce(
      (accum: Fraction, val: Fraction, idx: number) => {
        return accum.add(val.mul(new Fraction(idx)));
      },
      ZERO
    );
    return this._expectation;
  }

  variance() {
    if (this._variance) {
      return this._variance;
    }
    this._variance = this.coeffs
      .reduce((accum: Fraction, val: Fraction, idx: number) => {
        return accum.add(val.mul(new Fraction(idx * (idx - 1))));
      }, ZERO)
      .add(this.expectation())
      .sub(this.expectation().pow(2));
    return this._variance;
  }

  atLeastOneChance() {
    if (this._atLeastOneChance) {
      return this._atLeastOneChance;
    }
    this._atLeastOneChance = ONE.sub(this.coeffs[0]);
    return this._atLeastOneChance;
  }

  eval() {
    return this;
  }
}

class Binomial extends Distribution {
  private _eval: Polynomial | null = null;

  constructor(
    private readonly d: Distribution,
    private readonly picks: number
  ) {
    super();
  }

  eval() {
    if (this._eval) {
      return this._eval;
    }
    const baseCoeffs = this.d.eval().coeffs;
    let raisedToPower = [ONE];
    if (this.picks == 1) {
      raisedToPower = this.d.eval().coeffs;
    } else if (this.picks > 1) {
      raisedToPower = range(2, Math.max(2, this.picks + 1)).reduce(
        (accumCoeffs: Fraction[], idx: number) => {
          return polynomialMul(accumCoeffs, baseCoeffs);
        },
        baseCoeffs
      );
    }
    this._eval = new Polynomial(raisedToPower);
    return this._eval;
  }
}

class Or extends Distribution {
  private _eval: Polynomial | null = null;

  constructor(private readonly distTuples: OrDistributionTuple[]) {
    super();
  }

  eval() {
    if (this._eval) {
      return this._eval;
    }
    const evaluatedCoeffs = this.distTuples.reduce(
      (accumulator: Fraction[], distTuple: OrDistributionTuple) => {
        return polynomialAdd(
          accumulator,
          scalarMultiply(distTuple[0].eval().coeffs, distTuple[1])
        );
      },
      [] as Fraction[]
    );
    // ensure coeffs still sum to one
    evaluatedCoeffs[0] = ONE.sub(
      evaluatedCoeffs.slice(1).reduce((a, b) => a.add(b), ZERO)
    );
    this._eval = new Polynomial(evaluatedCoeffs);
    return this._eval;
  }
}

class And extends Distribution {
  private _eval: Polynomial | null = null;

  constructor(private readonly dists: Distribution[]) {
    super();
  }

  eval() {
    if (this._eval) {
      return this._eval;
    }
    const evaluatedCoeffs = this.dists.reduce(
      (accumulator: Fraction[], dist: Distribution) => {
        return polynomialMul(accumulator, dist.eval().coeffs);
      },
      [ONE]
    );
    this._eval = new Polynomial(evaluatedCoeffs);
    return this._eval;
  }
}

class Substitute extends Distribution {
  private _eval: Polynomial | null = null;

  constructor(
    private readonly parent: Distribution,
    private readonly child: Distribution
  ) {
    super();
  }

  eval() {
    if (this._eval) {
      return this._eval;
    }
    const or = Distribution.Or(
      this.parent.eval().coeffs.map((coeff: Fraction, degree: number) => {
        return [Distribution.Binomial(this.child, degree), coeff];
      })
    );
    this._eval = or.eval();
    return this._eval;
  }
}
