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
  boss: string,
  terrorZone: boolean = false,
  playerLvl: number = 99
): [tc: string, mlvl: number] {
  switch (monsterType) {
    case MonsterType.NORMAL:
    case MonsterType.CHAMP:
    case MonsterType.MINION:
    case MonsterType.UNIQUE:
      return getStandardTCMlvl(
        difficulty,
        monsterType,
        levelId,
        monster,
        terrorZone,
        playerLvl
      );
    case MonsterType.SUPERUNIQUE:
      return getSuperUniqueTCMlvl(
        difficulty,
        superunique,
        terrorZone,
        playerLvl
      );
    case MonsterType.BOSS:
      return getBossTCMlvl(difficulty, boss, terrorZone, playerLvl);
    case MonsterType.TREASURE_CLASS:
      return ["Act 1 (H) Bow A", 94];
  }
}

function getStandardTCMlvl(
  difficulty: Difficulty,
  monsterType: MonsterType,
  levelId: number,
  monster: string,
  terrorZone: boolean = false,
  playerLvl: number = 99
): [tc: string, mlvl: number] {
  let mlvl = getStandardMlvl(difficulty, monsterType, levelId, monster);
  if (terrorZone) {
    mlvl = modifyByTerrorZone(mlvl, monsterType, difficulty, playerLvl);
  }

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
  superunique: string,
  terrorZone: boolean = false,
  playerLvl: number = 99
): [tc: string, mlvl: number] {
  // TC is read from SuperuniqueDict
  const superuniqueEntry = SuperuniqueDict[superunique];
  const tc = superuniqueEntry.tcs[difficulty];
  // mlvl is read from LevelsDict alvl, + 3
  let mlvl = getStandardMlvl(
    difficulty,
    MonsterType.UNIQUE,
    superuniqueEntry.areaId,
    superuniqueEntry.class
  );
  if (terrorZone) {
    mlvl = modifyByTerrorZone(
      mlvl,
      MonsterType.SUPERUNIQUE,
      difficulty,
      playerLvl
    );
  }
  return [tc, mlvl];
}

function getBossTCMlvl(
  difficulty: Difficulty,
  boss: string,
  terrorZone: boolean = false,
  playerLvl: number = 99
): [tc: string, mlvl: number] {
  let bossName = boss;
  let quest = 0;
  if (boss.substring(0, 5) === "quest") {
    bossName = boss.substring(5);
    quest = 1;
  }
  const bossEntry = FlatBossDict[bossName];
  const tc = bossEntry.tcs[difficulty * 2 + quest];
  let mlvl = bossEntry.levels[difficulty];
  if (terrorZone) {
    mlvl = modifyByTerrorZone(
      mlvl,
      MonsterType.SUPERUNIQUE,
      difficulty,
      playerLvl
    );
  }
  return [tc, mlvl];
}

function getStandardMlvl(
  difficulty: Difficulty,
  monsterType: MonsterType,
  levelId: number,
  monster: keyof typeof MonsterDict
) {
  const monsterEntry = MonsterDict[monster];
  // Mlvl is read from MonsterDict (for normal) and LevelsDict (for nightmare / hell)
  // and modified by monsterType
  let baseMlvl;
  if (difficulty === Difficulty.NORMAL) {
    baseMlvl = monsterEntry.levels[0];
  } else {
    baseMlvl = LevelsDict[levelId].levels[difficulty];
  }
  return baseMlvl + getMlvlOffset(monsterType);
}

function getTcOffset(monsterType: MonsterType) {
  if (monsterType === MonsterType.CHAMP) {
    return 1;
  } else if (monsterType === MonsterType.UNIQUE) {
    return 2;
  }
  return 0;
}

function getMlvlOffset(monsterType: MonsterType): number {
  if (monsterType === MonsterType.CHAMP) {
    return 2;
  } else if (
    monsterType === MonsterType.MINION ||
    monsterType === MonsterType.UNIQUE
  ) {
    return 3;
  }
  return 0;
}

function getTerrorZoneMlvlOffset(monsterType: MonsterType): number {
  if (monsterType === MonsterType.CHAMP) {
    return 4;
  } else if (
    monsterType === MonsterType.MINION ||
    monsterType === MonsterType.UNIQUE ||
    monsterType === MonsterType.SUPERUNIQUE ||
    monsterType === MonsterType.BOSS
  ) {
    return 5;
  }
  return 2;
}

function getPlayerLvlMax(difficulty: Difficulty) {
  switch (difficulty) {
    case Difficulty.NORMAL:
      return 43;
    case Difficulty.NIGHTMARE:
      return 69;
    case Difficulty.HELL:
      return 94;
  }
}

export function modifyByTerrorZone(
  mlvl: number,
  monsterType: MonsterType,
  difficulty: Difficulty,
  playerLvl: number
): number {
  const mlvlOffset = getTerrorZoneMlvlOffset(monsterType);
  const playerLvlMax = getPlayerLvlMax(difficulty);
  return Math.max(mlvl, Math.min(playerLvl, playerLvlMax) + mlvlOffset);
}
