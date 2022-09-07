import { expect } from "chai";
import { describe, test as it } from "vitest";

import { binomialDistributionFunction } from "./common";

describe("binomialDistributionFunction structure", () => {
  it("should work for small n", () => {
    const p = 0.2;
    const n = 6;
    for (let k = 0; k <= n; k++) {
      console.log(binomialDistributionFunction(n, k, p));
    }
  });
});
