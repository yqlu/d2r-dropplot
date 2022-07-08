import { expect } from "chai";

import { MonsterDict } from "./monstats-dict";
import { TCDict } from "./tc-dict";

describe("Monstats structure", () => {
  it("should contain a defined TC for every monster entry", () => {
    for (let [monst, entry] of Object.entries(MonsterDict)) {
      expect(entry.tcs).to.have.length(9);
      for (let tc of entry.tcs) {
        if (tc) {
          expect(TCDict[tc], `${monst} ${tc}`).to.be.not.undefined;
        } else {
          // Only 3 monster entries have undefined TCs
          // megademon6 shows in in Furnace of Pain; the others are unreachable
          expect(
            ["megademon6", "sk_archer11", "skeleton8"].indexOf(monst)
          ).to.be.greaterThanOrEqual(0);
        }
      }
    }
  });
});
