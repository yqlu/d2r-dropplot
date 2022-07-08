import { expect } from "chai";

import { MonsterDict } from "./monstats-dict";
import { LevelsDict } from "./levels-dict";

describe("LevelsDict structure", () => {
  const exceptions = new Set([
    // Putrid Defilers are considered bosses even though they show up in the level spawn list
    "putriddefiler1",
    "putriddefiler2",
    "putriddefiler3",
    "putriddefiler4",
    "putriddefiler5",
    // These were cleaned up prematurely because they don't have TCs
    "baaltaunt",
    "suicideminion6",
  ]);
  it("should contain valid monster references", () => {
    for (let [id, entry] of Object.entries(LevelsDict)) {
      for (let mon of entry.mon.concat(entry.nmon).concat(entry.umon)) {
        if (exceptions.has(mon)) {
          continue;
        }
        expect(MonsterDict[mon], id + mon).to.be.not.undefined;
      }
    }
  });
});
