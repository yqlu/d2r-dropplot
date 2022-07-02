import { Difficulty, MonsterType, MonsterDict } from "./monstats-dict";
import { SuperuniqueDict } from "./superunique-dict";
import { BossDict } from "./boss-dict";
import { LevelsDict } from "./levels-dict";

export function getTcAndMlvlFromMonster(
  difficulty: Difficulty,
  monsterType: MonsterType,
  levelId: number,
  monster: string,
  superunique: string,
  boss: string
): [tc: string, mlvl: number] {
  return ["Act 1 H2H A", 50];
}
