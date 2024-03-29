import { expect } from "chai";
import { describe, test as it } from "vitest";

import { Difficulty, MonsterType } from "./monstats-dict";
import { getTcAndMlvlFromMonster, modifyByTerrorZone } from "./monster";

describe("getTcAndMlvlFromMonster", () => {
  const DEFAULT = {
    difficulty: Difficulty.HELL,
    monsterType: MonsterType.BOSS,
    levelId: 2, // Blood Moor
    monster: "zombie1",
    superunique: "Bishibosh",
    boss: "diablo",
  };

  const testStandard = (
    difficulty: Difficulty,
    monsterType: MonsterType,
    levelId: number,
    monster: string
  ) => {
    return getTcAndMlvlFromMonster(
      difficulty,
      monsterType,
      levelId,
      monster,
      DEFAULT.superunique,
      DEFAULT.boss
    );
  };

  const testSuperunique = (difficulty: Difficulty, superunique: string) => {
    return getTcAndMlvlFromMonster(
      difficulty,
      MonsterType.SUPERUNIQUE,
      DEFAULT.levelId,
      DEFAULT.monster,
      superunique,
      DEFAULT.boss
    );
  };

  const testBoss = (difficulty: Difficulty, boss: string) => {
    return getTcAndMlvlFromMonster(
      difficulty,
      MonsterType.BOSS,
      DEFAULT.levelId,
      DEFAULT.monster,
      DEFAULT.superunique,
      boss
    );
  };

  it("should handle regular monsters in normal difficulty", () => {
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.NORMAL, 2, "fallen1")
    ).to.eql(["Act 1 H2H A", 1]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.NORMAL, 56, "slinger2")
    ).to.eql(["Act 2 Miss A", 15]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.NORMAL, 82, "cantor3")
    ).to.eql(["Act 3 Cast B", 24]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.NORMAL, 106, "fingermage2")
    ).to.eql(["Act 4 Wraith B", 27]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.NORMAL, 117, "siegebeast2")
    ).to.eql(["Act 5 H2H C", 38]);
  });

  it("should handle minion monsters in normal difficulty", () => {
    // Same as above, but +3 to all mlvls
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.MINION, 2, "fallen1")
    ).to.eql(["Act 1 H2H A", 4]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.MINION, 56, "slinger2")
    ).to.eql(["Act 2 Miss A", 18]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.MINION, 82, "cantor3")
    ).to.eql(["Act 3 Cast B", 27]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.MINION, 106, "fingermage2")
    ).to.eql(["Act 4 Wraith B", 30]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.MINION, 117, "siegebeast2")
    ).to.eql(["Act 5 H2H C", 41]);
  });

  it("should handle champion monsters in normal difficulty", () => {
    // Champion TCs, +2 to all mlvls
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.CHAMP, 2, "fallen1")
    ).to.eql(["Act 1 Champ A", 3]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.CHAMP, 56, "slinger2")
    ).to.eql(["Act 2 Champ A", 17]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.CHAMP, 82, "cantor3")
    ).to.eql(["Act 3 Champ B", 26]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.CHAMP, 106, "fingermage2")
    ).to.eql(["Act 4 Champ B", 29]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.CHAMP, 117, "siegebeast2")
    ).to.eql(["Act 5 Champ C", 40]);
  });

  it("should handle unique monsters in normal difficulty", () => {
    // Unique TCs, +3 to all mlvls
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.UNIQUE, 2, "fallen1")
    ).to.eql(["Act 1 Unique A", 4]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.UNIQUE, 56, "slinger2")
    ).to.eql(["Act 2 Unique A", 18]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.UNIQUE, 82, "cantor3")
    ).to.eql(["Act 3 Unique B", 27]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.UNIQUE, 106, "fingermage2")
    ).to.eql(["Act 4 Unique B", 30]);
    expect(
      testStandard(Difficulty.NORMAL, MonsterType.UNIQUE, 117, "siegebeast2")
    ).to.eql(["Act 5 Unique C", 41]);
  });

  it("should handle superuniques in normal difficulty", () => {
    expect(testSuperunique(Difficulty.NORMAL, "Rakanishu")).to.eql([
      "Act 1 Super B",
      8,
    ]);
    expect(testSuperunique(Difficulty.NORMAL, "Beetleburst")).to.eql([
      "Act 2 Super B",
      19,
    ]);
    expect(testSuperunique(Difficulty.NORMAL, "Ismail Vilehand")).to.eql([
      "Council",
      28,
    ]);
    expect(testSuperunique(Difficulty.NORMAL, "Lord De Seis")).to.eql([
      "Act 4 Super C",
      33,
    ]);
    expect(testSuperunique(Difficulty.NORMAL, "Pindleskin")).to.eql([
      "Act 5 Super Cx",
      45,
    ]);
  });

  it("should handle bosses in normal difficulty", () => {
    expect(testBoss(Difficulty.NORMAL, "bloodraven")).to.eql([
      "Blood Raven",
      10,
    ]);
    expect(testBoss(Difficulty.NORMAL, "summoner")).to.eql(["Summoner", 18]);
    expect(testBoss(Difficulty.NORMAL, "andariel")).to.eql(["Andarielq", 12]);
    expect(testBoss(Difficulty.NORMAL, "mephisto")).to.eql(["Mephisto", 26]);
  });

  it("should handle regular monsters in nightmare difficulty", () => {
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.NORMAL, 2, "fallen1")
    ).to.eql(["Act 1 (N) H2H A", 36]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.NORMAL, 56, "slinger2")
    ).to.eql(["Act 2 (N) Miss B", 44]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.NORMAL, 82, "cantor3")
    ).to.eql(["Act 4 (N) Cast A", 53]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.NORMAL, 106, "fingermage2")
    ).to.eql(["Act 5 (N) Wraith A", 57]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.NORMAL, 117, "siegebeast2")
    ).to.eql(["Act 5 (N) H2H C", 60]);
  });

  it("should handle minion monsters in nightmare difficulty", () => {
    // Same as above, but +3 to all mlvls
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.MINION, 2, "fallen1")
    ).to.eql(["Act 1 (N) H2H A", 39]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.MINION, 56, "slinger2")
    ).to.eql(["Act 3 (N) Miss A", 47]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.MINION, 82, "cantor3")
    ).to.eql(["Act 4 (N) Cast B", 56]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.MINION, 106, "fingermage2")
    ).to.eql(["Act 5 (N) Wraith B", 60]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.MINION, 117, "siegebeast2")
    ).to.eql(["Act 1 (H) H2H A", 63]);
  });

  it("should handle champion monsters in nightmare difficulty", () => {
    // Champion TCs, +2 to all mlvls
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.CHAMP, 2, "fallen1")
    ).to.eql(["Act 1 (N) Champ A", 38]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.CHAMP, 56, "slinger2")
    ).to.eql(["Act 3 (N) Champ A", 46]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.CHAMP, 82, "cantor3")
    ).to.eql(["Act 4 (N) Champ B", 55]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.CHAMP, 106, "fingermage2")
    ).to.eql(["Act 5 (N) Champ A", 59]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.CHAMP, 117, "siegebeast2")
    ).to.eql(["Act 5 (N) Champ C", 62]);
  });

  it("should handle unique monsters in nightmare difficulty", () => {
    // Unique TCs, +3 to all mlvls
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.UNIQUE, 2, "fallen1")
    ).to.eql(["Act 1 (N) Unique A", 39]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.UNIQUE, 56, "slinger2")
    ).to.eql(["Act 3 (N) Unique A", 47]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.UNIQUE, 82, "cantor3")
    ).to.eql(["Act 4 (N) Unique B", 56]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.UNIQUE, 106, "fingermage2")
    ).to.eql(["Act 5 (N) Unique B", 60]);
    expect(
      testStandard(Difficulty.NIGHTMARE, MonsterType.UNIQUE, 117, "siegebeast2")
    ).to.eql(["Act 1 (H) Unique A", 63]);
  });

  it("should handle superuniques in nightmare difficulty", () => {
    expect(testSuperunique(Difficulty.NIGHTMARE, "Rakanishu")).to.eql([
      "Act 1 (N) Super B",
      40,
    ]);
    expect(testSuperunique(Difficulty.NIGHTMARE, "Beetleburst")).to.eql([
      "Act 3 (N) Super A",
      48,
    ]);
    expect(testSuperunique(Difficulty.NIGHTMARE, "Ismail Vilehand")).to.eql([
      "Council (N)",
      57,
    ]);
    expect(testSuperunique(Difficulty.NIGHTMARE, "Lord De Seis")).to.eql([
      "Act 4 (N) Super C",
      61,
    ]);
    expect(testSuperunique(Difficulty.NIGHTMARE, "Pindleskin")).to.eql([
      "Act 5 (N) Super Cx",
      66,
    ]);
  });

  it("should handle bosses in nightmare difficulty", () => {
    expect(testBoss(Difficulty.NIGHTMARE, "bloodraven")).to.eql([
      "Blood Raven (N)",
      43,
    ]);
    expect(testBoss(Difficulty.NIGHTMARE, "summoner")).to.eql([
      "Summoner (N)",
      55,
    ]);
    expect(testBoss(Difficulty.NIGHTMARE, "andariel")).to.eql([
      "Andarielq (N)",
      49,
    ]);
    expect(testBoss(Difficulty.NIGHTMARE, "mephisto")).to.eql([
      "Mephisto (N)",
      59,
    ]);
  });

  it("should handle regular monsters in hell difficulty", () => {
    expect(
      testStandard(Difficulty.HELL, MonsterType.NORMAL, 2, "fallen1")
    ).to.eql(["Act 1 (H) H2H B", 67]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.NORMAL, 56, "slinger2")
    ).to.eql(["Act 4 (H) Miss A", 79]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.NORMAL, 82, "cantor3")
    ).to.eql(["Act 5 (H) Cast A", 81]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.NORMAL, 106, "fingermage2")
    ).to.eql(["Act 5 (H) Wraith B", 84]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.NORMAL, 117, "siegebeast2")
    ).to.eql(["Act 5 (H) H2H B", 81]);
  });

  it("should handle minion monsters in hell difficulty", () => {
    // Same as above, but +3 to all mlvls
    expect(
      testStandard(Difficulty.HELL, MonsterType.MINION, 2, "fallen1")
    ).to.eql(["Act 2 (H) H2H A", 70]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.MINION, 56, "slinger2")
    ).to.eql(["Act 5 (H) Miss A", 82]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.MINION, 82, "cantor3")
    ).to.eql(["Act 5 (H) Cast B", 84]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.MINION, 106, "fingermage2")
    ).to.eql(["Act 5 (H) Wraith C", 87]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.MINION, 117, "siegebeast2")
    ).to.eql(["Act 5 (H) H2H B", 84]);
  });

  it("should handle champion monsters in hell difficulty", () => {
    // Champion TCs, +2 to all mlvls
    expect(
      testStandard(Difficulty.HELL, MonsterType.CHAMP, 2, "fallen1")
    ).to.eql(["Act 2 (H) Champ A", 69]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.CHAMP, 56, "slinger2")
    ).to.eql(["Act 5 (H) Champ A", 81]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.CHAMP, 82, "cantor3")
    ).to.eql(["Act 5 (H) Champ B", 83]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.CHAMP, 106, "fingermage2")
    ).to.eql(["Act 5 (H) Champ C", 86]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.CHAMP, 117, "siegebeast2")
    ).to.eql(["Act 5 (H) Champ B", 83]);
  });

  it("should handle unique monsters in hell difficulty", () => {
    // Unique TCs, +3 to all mlvls
    expect(
      testStandard(Difficulty.HELL, MonsterType.UNIQUE, 2, "fallen1")
    ).to.eql(["Act 2 (H) Unique A", 70]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.UNIQUE, 56, "slinger2")
    ).to.eql(["Act 5 (H) Unique A", 82]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.UNIQUE, 82, "cantor3")
    ).to.eql(["Act 5 (H) Unique B", 84]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.UNIQUE, 106, "fingermage2")
    ).to.eql(["Act 5 (H) Unique C", 87]);
    expect(
      testStandard(Difficulty.HELL, MonsterType.UNIQUE, 117, "siegebeast2")
    ).to.eql(["Act 5 (H) Unique B", 84]);
  });

  it("should handle superuniques in hell difficulty", () => {
    expect(testSuperunique(Difficulty.HELL, "Rakanishu")).to.eql([
      "Act 2 (H) Super B",
      71,
    ]);
    expect(testSuperunique(Difficulty.HELL, "Beetleburst")).to.eql([
      "Act 3 (H) Super C",
      79,
    ]);
    expect(testSuperunique(Difficulty.HELL, "Ismail Vilehand")).to.eql([
      "Council (H)",
      85,
    ]);
    expect(testSuperunique(Difficulty.HELL, "Lord De Seis")).to.eql([
      "Act 4 (H) Super C",
      88,
    ]);
    expect(testSuperunique(Difficulty.HELL, "Pindleskin")).to.eql([
      "Act 5 (H) Super Cx",
      86,
    ]);
  });

  it("should handle bosses in hell difficulty", () => {
    expect(testBoss(Difficulty.HELL, "bloodraven")).to.eql([
      "Blood Raven (H)",
      88,
    ]);
    expect(testBoss(Difficulty.HELL, "summoner")).to.eql(["Summoner (H)", 80]);
    expect(testBoss(Difficulty.HELL, "andariel")).to.eql(["Andarielq (H)", 75]);
    expect(testBoss(Difficulty.HELL, "mephisto")).to.eql(["Mephisto (H)", 87]);
  });

  describe("terror zones", () => {
    const testTzMonster = (
      difficulty: Difficulty,
      monsterType: MonsterType,
      levelId: number,
      monster: string,
      playerLevel: number = 99
    ) => {
      return getTcAndMlvlFromMonster(
        difficulty,
        monsterType,
        levelId,
        monster,
        DEFAULT.superunique,
        DEFAULT.boss,
        true,
        playerLevel
      );
    };

    const testTzSuperunique = (
      difficulty: Difficulty,
      superunique: string,
      playerLvl: number
    ) => {
      return getTcAndMlvlFromMonster(
        difficulty,
        MonsterType.SUPERUNIQUE,
        DEFAULT.levelId,
        DEFAULT.monster,
        superunique,
        DEFAULT.boss,
        true,
        playerLvl
      );
    };

    const testTzBoss = (
      difficulty: Difficulty,
      boss: string,
      playerLvl: number
    ) => {
      return getTcAndMlvlFromMonster(
        difficulty,
        MonsterType.BOSS,
        DEFAULT.levelId,
        DEFAULT.monster,
        DEFAULT.superunique,
        boss,
        true,
        playerLvl
      );
    };

    it("should not change the TC of monsters in normal or nightmare", () => {
      expect(
        testTzMonster(Difficulty.NORMAL, MonsterType.NORMAL, 2, "fallen1")[0]
      ).to.not.have.string("Desecrated");
      expect(
        testTzMonster(Difficulty.NORMAL, MonsterType.NORMAL, 56, "slinger2")[0]
      ).to.not.have.string("Desecrated");
      expect(
        testTzMonster(Difficulty.NORMAL, MonsterType.NORMAL, 82, "cantor3")[0]
      ).to.not.have.string("Desecrated");
      expect(
        testTzMonster(
          Difficulty.NORMAL,
          MonsterType.NORMAL,
          106,
          "fingermage2"
        )[0]
      ).to.not.have.string("Desecrated");
      expect(
        testTzMonster(
          Difficulty.NORMAL,
          MonsterType.NORMAL,
          117,
          "siegebeast2"
        )[0]
      ).to.not.have.string("Desecrated");
    });
    it("should not change the TC of a standard monster or a minion in hell", () => {
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.NORMAL, 2, "fallen1")[0]
      ).to.not.have.string("Desecrated");
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.NORMAL, 56, "slinger2")[0]
      ).to.not.have.string("Desecrated");
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.NORMAL, 82, "cantor3")[0]
      ).to.not.have.string("Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.NORMAL,
          106,
          "fingermage2"
        )[0]
      ).to.not.have.string("Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.NORMAL,
          117,
          "siegebeast2"
        )[0]
      ).to.not.have.string("Desecrated");
    });
    it("should set the TC of a champion monster in hell", () => {
      const lowPlayerLevel = 65;
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.CHAMP,
          2,
          "fallen1",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 2 (H) Champ A Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.CHAMP,
          56,
          "slinger2",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 5 (H) Champ A Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.CHAMP,
          82,
          "cantor3",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 5 (H) Champ B Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.CHAMP,
          106,
          "fingermage2",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 5 (H) Champ C Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.CHAMP,
          117,
          "siegebeast2",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 5 (H) Champ B Desecrated");
    });
    it("should upgrade the TC of a champion monster in hell by player level", () => {
      // When player level is 99
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.CHAMP, 2, "fallen1")[0]
      ).to.equal("Act 5 (H) Champ C Desecrated");
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.CHAMP, 56, "slinger2")[0]
      ).to.equal("Act 5 (H) Champ C Desecrated");
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.CHAMP, 82, "cantor3")[0]
      ).to.equal("Act 5 (H) Champ C Desecrated");
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.CHAMP, 106, "fingermage2")[0]
      ).to.equal("Act 5 (H) Champ C Desecrated");
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.CHAMP, 117, "siegebeast2")[0]
      ).to.equal("Act 5 (H) Champ C Desecrated");
    });
    it("should set the TC of a unique monster in hell", () => {
      const lowPlayerLevel = 65;
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.UNIQUE,
          2,
          "fallen1",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 2 (H) Unique A Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.UNIQUE,
          56,
          "slinger2",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 5 (H) Unique A Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.UNIQUE,
          82,
          "cantor3",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 5 (H) Unique B Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.UNIQUE,
          106,
          "fingermage2",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 5 (H) Unique C Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.UNIQUE,
          117,
          "siegebeast2",
          lowPlayerLevel
        )[0]
      ).to.equal("Act 5 (H) Unique B Desecrated");
    });
    it("should upgrade the TC of a unique monster in hell by player level", () => {
      // When player level is 99
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.UNIQUE, 2, "fallen1")[0]
      ).to.equal("Act 5 (H) Unique C Desecrated");
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.UNIQUE, 56, "slinger2")[0]
      ).to.equal("Act 5 (H) Unique C Desecrated");
      expect(
        testTzMonster(Difficulty.HELL, MonsterType.UNIQUE, 82, "cantor3")[0]
      ).to.equal("Act 5 (H) Unique C Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.UNIQUE,
          106,
          "fingermage2"
        )[0]
      ).to.equal("Act 5 (H) Unique C Desecrated");
      expect(
        testTzMonster(
          Difficulty.HELL,
          MonsterType.UNIQUE,
          117,
          "siegebeast2"
        )[0]
      ).to.equal("Act 5 (H) Unique C Desecrated");
    });
    it("should set the TC of a superunique in any difficulty", () => {
      expect(testTzSuperunique(Difficulty.NORMAL, "Rakanishu", 99)).to.eql([
        "Act 1 Super B",
        48,
      ]);
      expect(testTzSuperunique(Difficulty.NIGHTMARE, "Rakanishu", 99)).to.eql([
        "Act 3 (H) Super A",
        74,
      ]);
      expect(testTzSuperunique(Difficulty.HELL, "Rakanishu", 99)).to.eql([
        "Act 5 (H) Super C Desecrated",
        99,
      ]);
    });
    it("should upgrade the TC of a superunique in hell based on playerlvl", () => {
      for (let playerLvl = 70; playerLvl <= 92; playerLvl++) {
        const tcResult = testTzSuperunique(
          Difficulty.HELL,
          "The Countess",
          playerLvl
        )[0];
        if (playerLvl <= 78) {
          expect(tcResult).to.equal("Countess (H) Desecrated A");
        } else if (playerLvl <= 81) {
          expect(tcResult).to.equal("Countess (H) Desecrated B");
        } else if (playerLvl <= 84) {
          expect(tcResult).to.equal("Countess (H) Desecrated C");
        } else if (playerLvl <= 87) {
          expect(tcResult).to.equal("Countess (H) Desecrated D");
        } else if (playerLvl <= 90) {
          expect(tcResult).to.equal("Countess (H) Desecrated E");
        } else {
          expect(tcResult).to.equal("Countess (H) Desecrated F");
        }
      }
    });
    it("should set the TC of a boss in any difficulty", () => {
      expect(testTzBoss(Difficulty.NORMAL, "izual", 99)[0]).to.eql(
        "Izual Desecrated C"
      );
      expect(testTzBoss(Difficulty.NIGHTMARE, "izual", 99)[0]).to.eql(
        "Izual (N) Desecrated C"
      );
      expect(testTzBoss(Difficulty.HELL, "izual", 99)[0]).to.eql(
        "Izual (H) Desecrated D"
      );
    });
    it("should upgrade the TC of a boss in any difficulty based on playerlvl", () => {
      for (let playerLvl = 70; playerLvl <= 92; playerLvl++) {
        const tcResult = testTzBoss(Difficulty.HELL, "andariel", playerLvl)[0];
        if (playerLvl <= 72) {
          expect(tcResult).to.equal("Andarielq (H) Desecrated A");
        } else if (playerLvl <= 75) {
          expect(tcResult).to.equal("Andarielq (H) Desecrated B");
        } else if (playerLvl <= 78) {
          expect(tcResult).to.equal("Andarielq (H) Desecrated C");
        } else if (playerLvl <= 81) {
          expect(tcResult).to.equal("Andarielq (H) Desecrated D");
        } else if (playerLvl <= 84) {
          expect(tcResult).to.equal("Andarielq (H) Desecrated E");
        } else if (playerLvl <= 87) {
          expect(tcResult).to.equal("Andarielq (H) Desecrated F");
        } else if (playerLvl <= 90) {
          expect(tcResult).to.equal("Andarielq (H) Desecrated G");
        } else {
          expect(tcResult).to.equal("Andarielq (H) Desecrated H");
        }
      }
    });
  });

  describe("modifyByTerrorZone", () => {
    it("should modify terror zone mlvls for normal difficulty", () => {
      expect(
        modifyByTerrorZone(1, MonsterType.NORMAL, Difficulty.NORMAL, 30)
      ).to.eql(32);
      expect(
        modifyByTerrorZone(1, MonsterType.CHAMP, Difficulty.NORMAL, 30)
      ).to.eql(34);
      expect(
        modifyByTerrorZone(1, MonsterType.UNIQUE, Difficulty.NORMAL, 30)
      ).to.eql(35);
    });
    it("should cap player lvl when calculating terror zone mlvl for normal", () => {
      expect(
        modifyByTerrorZone(1, MonsterType.NORMAL, Difficulty.NORMAL, 99)
      ).to.eql(45);
      expect(
        modifyByTerrorZone(1, MonsterType.CHAMP, Difficulty.NORMAL, 99)
      ).to.eql(47);
      expect(
        modifyByTerrorZone(1, MonsterType.UNIQUE, Difficulty.NORMAL, 99)
      ).to.eql(48);
    });
    it("should modify terror zone mlvls for nightmare difficulty", () => {
      expect(
        modifyByTerrorZone(1, MonsterType.NORMAL, Difficulty.NIGHTMARE, 60)
      ).to.eql(62);
      expect(
        modifyByTerrorZone(1, MonsterType.CHAMP, Difficulty.NIGHTMARE, 60)
      ).to.eql(64);
      expect(
        modifyByTerrorZone(1, MonsterType.UNIQUE, Difficulty.NIGHTMARE, 60)
      ).to.eql(65);
    });
    it("should cap player lvl when calculating terror zone mlvl for nightmare", () => {
      expect(
        modifyByTerrorZone(1, MonsterType.NORMAL, Difficulty.NIGHTMARE, 99)
      ).to.eql(71);
      expect(
        modifyByTerrorZone(1, MonsterType.CHAMP, Difficulty.NIGHTMARE, 99)
      ).to.eql(73);
      expect(
        modifyByTerrorZone(1, MonsterType.UNIQUE, Difficulty.NIGHTMARE, 99)
      ).to.eql(74);
    });
    it("should modify terror zone mlvls for hell difficulty", () => {
      expect(
        modifyByTerrorZone(1, MonsterType.NORMAL, Difficulty.HELL, 80)
      ).to.eql(82);
      expect(
        modifyByTerrorZone(1, MonsterType.CHAMP, Difficulty.HELL, 80)
      ).to.eql(84);
      expect(
        modifyByTerrorZone(1, MonsterType.UNIQUE, Difficulty.HELL, 80)
      ).to.eql(85);
    });
    it("should cap player lvl when calculating terror zone mlvl for hell", () => {
      expect(
        modifyByTerrorZone(1, MonsterType.NORMAL, Difficulty.HELL, 99)
      ).to.eql(96);
      expect(
        modifyByTerrorZone(1, MonsterType.CHAMP, Difficulty.HELL, 99)
      ).to.eql(98);
      expect(
        modifyByTerrorZone(1, MonsterType.UNIQUE, Difficulty.HELL, 99)
      ).to.eql(99);
    });
    it("should not modify mlvls if exceeding terror zone calculation", () => {
      expect(
        modifyByTerrorZone(40, MonsterType.NORMAL, Difficulty.NORMAL, 30)
      ).to.eql(40);
      expect(
        modifyByTerrorZone(40, MonsterType.CHAMP, Difficulty.NORMAL, 30)
      ).to.eql(40);
      expect(
        modifyByTerrorZone(40, MonsterType.UNIQUE, Difficulty.NORMAL, 30)
      ).to.eql(40);
    });
  });
});
