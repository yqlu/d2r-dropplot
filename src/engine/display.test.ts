import { expect } from "chai";
import Fraction from "fraction.js";
import { map } from "lodash-es";

import { TCProbTuple } from "./resultAggregator";
import { sortTCs } from "./display";

describe("sortTCs", () => {
  it("should sort TCs in their relative categories", () => {
    const tcs = ["armo3", "r08", "rin", "weap60"].map(
      (str) => [str, new Fraction(1)] as TCProbTuple
    );
    let sorted = sortTCs(tcs);
    expect(map(sorted, 0)).to.eql(["r08", "weap60", "armo3", "rin"]);
  });

  it("should sort each category numerically, not lexicographically", () => {
    const tcs = ["armo3", "armo30", "armo9", "armo6"].map(
      (str) => [str, new Fraction(1)] as TCProbTuple
    );
    let sorted = sortTCs(tcs);
    expect(map(sorted, 0)).to.eql(["armo3", "armo6", "armo9", "armo30"]);
  });
});
