import { expect } from "chai";

import { BossHierarchy, FlatBossDict } from "./boss-dict";
import { TCDict } from "./tc-dict";

describe("BossDict structure", () => {
  it("should contain a defined BossFlatDict entry for every monster in the hierarchy", () => {
    for (let mon of BossHierarchy.actbosses
      .concat(BossHierarchy.minor)
      .concat(BossHierarchy.pandemonium)) {
      expect(FlatBossDict[mon], mon).to.not.be.undefined;
    }
  });

  it("should have well-defined TCs and levels", () => {
    for (let [mon, entry] of Object.entries(FlatBossDict)) {
      expect(entry.levels[0]).to.not.be.undefined;
      expect(entry.levels[1]).to.not.be.undefined;
      expect(entry.levels[2]).to.not.be.undefined;
      for (let tc of entry.tcs) {
        if (tc) {
          expect(TCDict[tc]).to.not.be.undefined;
        }
      }
    }
  });
});
