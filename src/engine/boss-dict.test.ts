import { expect } from "chai";
import { describe, test as it } from "vitest";

import { getBossHierarchy, FlatBossDict } from "./boss-dict";
import { Difficulty } from "./monstats-dict";
import { TCDict } from "./tc-dict";

describe("BossDict structure", () => {
  it("should contain a defined BossFlatDict entry for every monster in the hierarchy", () => {
    const hierarchy = getBossHierarchy(Difficulty.HELL);
    for (let mon of hierarchy.actbosses
      .concat(hierarchy.minor)
      .concat(hierarchy.pandemonium)) {
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
