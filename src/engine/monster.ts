import { Difficulty, MonsterType, MonsterDict } from "./monstats-dict";
import { SuperuniqueDict } from "./superunique-dict";
import { FlatBossDict } from "./boss-dict";
import { LevelsDict } from "./levels-dict";
import { TCDict } from "./tc-dict";
import { TcGroupDict } from "./tcgroup-dict";
import { max } from "lodash-es";

export function getTcAndMlvlFromMonster(
  difficulty: Difficulty,
  monsterType: MonsterType,
  levelId: number,
  monster: string,
  superunique: string,
  boss: string
): [tc: string, mlvl: number] {
  switch (monsterType) {
    case MonsterType.NORMAL:
    case MonsterType.CHAMP:
    case MonsterType.MINION:
    case MonsterType.UNIQUE:
      return getStandardTCMlvl(difficulty, monsterType, levelId, monster);
    case MonsterType.SUPERUNIQUE:
      return getSuperUniqueTCMlvl(difficulty, superunique);
    case MonsterType.BOSS:
      return getBossTCMlvl(difficulty, boss);
  }
}

function getStandardTCMlvl(
  difficulty: Difficulty,
  monsterType: MonsterType,
  levelId: number,
  monster: string
): [tc: string, mlvl: number] {
  const mlvl = getStandardMlvl(difficulty, monsterType, levelId, monster);

  // TC is read from MonsterDict
  const monsterEntry = MonsterDict[monster];
  const idx = 3 * difficulty + getTcOffset(monsterType);
  let tc = monsterEntry.tcs[idx];
  // If this is an invalid TC, just propagate it up and rely on downstream error handling
  if (!tc || !TCDict[tc]) {
    return [tc, mlvl];
  }
  if (difficulty !== Difficulty.NORMAL && mlvl > TCDict[tc].level) {
    const tcGroup = TCDict[tc].group;
    if (tcGroup != null && TcGroupDict[tcGroup]) {
      const eligibleKeys = Object.keys(TcGroupDict[tcGroup])
        .map((x) => parseInt(x))
        .filter((x) => x <= mlvl);
      tc = TcGroupDict[tcGroup][max(eligibleKeys)];
    }
  }
  return [tc, mlvl];
}

function getSuperUniqueTCMlvl(
  difficulty: Difficulty,
  superunique: string
): [tc: string, mlvl: number] {
  // TC is read from SuperuniqueDict
  const superuniqueEntry = SuperuniqueDict[superunique];
  const tc = superuniqueEntry.tcs[difficulty];
  // mlvl is read from LevelsDict alvl, + 3
  const mlvl = getStandardMlvl(
    difficulty,
    MonsterType.UNIQUE,
    superuniqueEntry.areaId,
    superuniqueEntry.class
  );
  return [tc, mlvl];
}

function getBossTCMlvl(
  difficulty: Difficulty,
  boss: string
): [tc: string, mlvl: number] {
  const bossEntry = FlatBossDict[boss];
  const quest = 0; // TODO fix
  const tc = bossEntry.tcs[difficulty * 2 + quest];
  const mlvl = bossEntry.levels[difficulty];
  return [tc, mlvl];
}

function getStandardMlvl(
  difficulty: Difficulty,
  monsterType: MonsterType,
  levelId: number,
  monster: string
) {
  const monsterEntry = MonsterDict[monster];
  // Mlvl is read from MonsterDict (for normal) and LevelsDict (for nightmare / hell)
  // and modified by monsterType
  let baseMlvl;
  if (difficulty == Difficulty.NORMAL) {
    baseMlvl = monsterEntry.levels[0];
  } else {
    baseMlvl = LevelsDict[levelId].levels[difficulty];
  }
  return baseMlvl + getMlvlOffset(monsterType);
}

function getTcOffset(monsterType: MonsterType) {
  if (monsterType == MonsterType.CHAMP) {
    return 1;
  } else if (monsterType == MonsterType.UNIQUE) {
    return 2;
  }
  return 0;
}

function getMlvlOffset(monsterType: MonsterType) {
  if (monsterType == MonsterType.CHAMP) {
    return 2;
  } else if (
    monsterType == MonsterType.MINION ||
    monsterType == MonsterType.UNIQUE
  ) {
    return 3;
  }
  return 0;
}
