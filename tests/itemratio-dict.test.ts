import { assert, expect } from "chai";
import { map } from "lodash-es";

import { RARITY, ITEMTIER, getRarityConstants } from "../src/itemratio-dict.js";

describe("getRarityConstants", () => {
  it("should return the correct numbers from the underlying data", () => {
    expect(getRarityConstants(ITEMTIER.NORMAL, false, RARITY.UNIQUE)).to.eql([
      400, 1, 6400,
    ]);
    expect(getRarityConstants(ITEMTIER.NORMAL, false, RARITY.SET)).to.eql([
      160, 2, 5600,
    ]);
    expect(getRarityConstants(ITEMTIER.NORMAL, false, RARITY.RARE)).to.eql([
      100, 2, 3200,
    ]);
    expect(getRarityConstants(ITEMTIER.NORMAL, false, RARITY.MAGIC)).to.eql([
      34, 3, 192,
    ]);
    // TODO: add the rest of them
  });
});
