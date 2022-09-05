import { expect } from "chai";
import { describe, test as it } from "vitest";

import { Matrix, makeEmpty, multiply } from "./matrix-utils";

describe("multiply", () => {
  it("can multiply a 2x2 matrix", () => {
    const a: Matrix = [
      [1, 2],
      [3, 4],
    ];
    const b: Matrix = [
      [5, 6],
      [7, 8],
    ];
    expect(multiply(a, b)).to.eql([
      [19, 22],
      [43, 50],
    ]);
  });
});
