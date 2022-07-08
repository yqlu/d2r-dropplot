import { expect } from "chai";

import { MonsterDict } from "./monstats-dict";
import { SuperuniqueDict } from "./superunique-dict";
import { FlatBossDict } from "./boss-dict";
import { LevelsDict } from "./levels-dict";
import { ItemDict } from "./item-dict";
import { UniqueDict, SetDict } from "./unique-set-dict";

describe("locale creation", () => {
  it("should contain strings for items, uniques, sets, levels, monsters, superuniques, bosses", () => {
    let strings = Object.keys(ItemDict)
      .concat(Object.keys(UniqueDict))
      .concat(Object.keys(SetDict))
      .concat(Object.values(LevelsDict).map((levelEntry) => levelEntry.name))
      .concat(
        Object.values(MonsterDict).map((monsterEntry) => monsterEntry.nameStr)
      )
      .concat(Object.keys(SuperuniqueDict))
      .concat(
        Object.values(FlatBossDict).map((monsterEntry) => monsterEntry.nameStr)
      );
    console.log(JSON.stringify(strings));
  });
});
