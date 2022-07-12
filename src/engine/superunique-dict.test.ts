import { expect } from "chai";
import { describe, test as it } from "vitest";

import { MonsterDict } from "./monstats-dict";
import { SuperuniqueDict } from "./superunique-dict";
import { FlatBossDict } from "./boss-dict";
import { LevelsDict } from "./levels-dict";
import { TCDict } from "./tc-dict";

describe("SuperuniqueDict structure", () => {
  it("should contain valid class, TCs and areaId references", () => {
    for (let [id, entry] of Object.entries(SuperuniqueDict)) {
      expect(LevelsDict[entry.areaId]).to.not.be.undefined;
      expect(MonsterDict[entry.class]).to.not.be.undefined;
      expect(entry.tcs).to.have.length(3);
      for (let tc of entry.tcs) {
        expect(TCDict[tc]).to.not.be.undefined;
      }
      expect(FlatBossDict[entry.class]).to.be.undefined;
    }
  });
});
