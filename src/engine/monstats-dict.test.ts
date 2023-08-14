import { expect } from "chai";
import { describe, test as it } from "vitest";

import { MonsterDict } from "./monstats-dict";
import { TCDict } from "./tc-dict";

describe("Monstats structure", () => {
  const UNDEFINED_TCS_OK = ["megademon6", "sk_archer11", "skeleton8"];
  const UNDEFINED_DESECRATED_TCS_OK: string[] = [
    "flyingscimitar",
    "mephistospirit",
    "trappedsoul1",
    "trappedsoul2",
  ];

  it("should contain a defined TC for every monster entry", () => {
    for (let [monst, entry] of Object.entries(MonsterDict)) {
      expect(entry.tcs).to.have.length(18);
      for (let [idx, tc] of entry.tcs.entries()) {
        if (tc) {
          expect(TCDict[tc], `${monst} ${tc}`).to.be.not.undefined;
        } else if (UNDEFINED_TCS_OK.indexOf(monst) > -1) {
          // These monsters can have undefined regular TCs
          // megademon6 shows up in Furnace of Pain; the other 2 are unreachable
        } else if (UNDEFINED_DESECRATED_TCS_OK.indexOf(monst) > -1) {
          // These monsters don't have any desecrated TCs
          expect(idx).to.be.greaterThanOrEqual(9, `${monst}, ${idx}`);
        } else {
          // All monsters can have undefined other desecrated TCs
          expect(idx).to.be.within(9, 15, `${monst}, ${idx}`);
        }
      }
    }
  });
});
