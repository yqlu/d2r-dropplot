export type TCDictTuple = [string, number];
export type TCDictType = {
  [key: string]: {
    nodrop: number;
    tcs: TCDictTuple[];
  };
};

// produced by util/tc_cleanup.js
export const TCDict: TCDictType = {
  Gold: { nodrop: 0, tcs: [["gld", 1]] },
  "Jewelry A": {
    nodrop: 0,
    tcs: [
      ["rin", 8],
      ["amu", 4],
      ["jew", 2],
      ["cm3", 2],
      ["cm2", 2],
      ["cm1", 2],
    ],
  },
  "Jewelry B": {
    nodrop: 0,
    tcs: [
      ["rin", 8],
      ["amu", 4],
      ["jew", 2],
      ["cm3", 2],
      ["cm2", 2],
      ["cm1", 2],
    ],
  },
  "Jewelry C": {
    nodrop: 0,
    tcs: [
      ["rin", 8],
      ["amu", 4],
      ["jew", 2],
      ["cm3", 2],
      ["cm2", 2],
      ["cm1", 2],
    ],
  },
  "Chipped Gem": {
    nodrop: 0,
    tcs: [
      ["gcv", 3],
      ["gcy", 3],
      ["gcb", 3],
      ["gcg", 3],
      ["gcr", 3],
      ["gcw", 3],
      ["skc", 2],
    ],
  },
  "Flawed Gem": {
    nodrop: 0,
    tcs: [
      ["gfv", 3],
      ["gfy", 3],
      ["gfb", 3],
      ["gfg", 3],
      ["gfr", 3],
      ["gfw", 3],
      ["skf", 2],
    ],
  },
  "Normal Gem": {
    nodrop: 0,
    tcs: [
      ["gsv", 3],
      ["gsy", 3],
      ["gsb", 3],
      ["gsg", 3],
      ["gsr", 3],
      ["gsw", 3],
      ["sku", 2],
    ],
  },
  "Flawless Gem": {
    nodrop: 0,
    tcs: [
      ["gzv", 3],
      ["gly", 3],
      ["glb", 3],
      ["glg", 3],
      ["glr", 3],
      ["glw", 3],
      ["skl", 2],
    ],
  },
  "Perfect Gem": {
    nodrop: 0,
    tcs: [
      ["gpv", 3],
      ["gpy", 3],
      ["gpb", 3],
      ["gpg", 3],
      ["gpr", 3],
      ["gpw", 3],
      ["skz", 2],
    ],
  },
  Ammo: {
    nodrop: 0,
    tcs: [
      ["aqv", 1],
      ["cqv", 1],
    ],
  },
  "Misc 0": {
    nodrop: 0,
    tcs: [
      ["key", 3],
      ["tsc", 3],
      ["isc", 3],
      ["opl", 2],
      ["gpl", 2],
    ],
  },
  "Misc 1": {
    nodrop: 0,
    tcs: [
      ["key", 3],
      ["tsc", 3],
      ["isc", 3],
      ["opm", 2],
      ["gpm", 2],
    ],
  },
  "Misc 2": {
    nodrop: 0,
    tcs: [
      ["key", 3],
      ["tsc", 3],
      ["isc", 3],
      ["ops", 2],
      ["gps", 2],
    ],
  },
  "Hpotion 1": {
    nodrop: 0,
    tcs: [
      ["hp1", 8],
      ["hp2", 3],
      ["mp1", 3],
      ["mp2", 2],
      ["rvs", 1],
    ],
  },
  "Hpotion 2": {
    nodrop: 0,
    tcs: [
      ["hp1", 1],
      ["hp2", 4],
      ["hp3", 3],
      ["mp2", 2],
      ["mp3", 2],
      ["rvs", 1],
    ],
  },
  "Hpotion 3": {
    nodrop: 0,
    tcs: [
      ["hp2", 1],
      ["hp3", 4],
      ["hp4", 3],
      ["mp3", 2],
      ["mp4", 2],
      ["rvs", 1],
    ],
  },
  "Hpotion 4": {
    nodrop: 0,
    tcs: [
      ["hp3", 1],
      ["hp4", 4],
      ["hp5", 3],
      ["mp4", 2],
      ["mp5", 2],
      ["rvs", 1],
    ],
  },
  "Hpotion 5": {
    nodrop: 0,
    tcs: [
      ["hp3", 1],
      ["hp4", 4],
      ["hp5", 4],
      ["mp5", 4],
      ["rvs", 1],
    ],
  },
  "Hpotion 6": {
    nodrop: 0,
    tcs: [
      ["hp4", 4],
      ["hp5", 6],
      ["mp4", 2],
      ["mp5", 4],
      ["rvs", 1],
    ],
  },
  "Potion 1": {
    nodrop: 0,
    tcs: [
      ["hp1", 12],
      ["hp2", 4],
      ["mp1", 5],
      ["mp2", 4],
      ["rvs", 1],
      ["vps", 4],
    ],
  },
  "Potion 2": {
    nodrop: 0,
    tcs: [
      ["hp1", 4],
      ["hp2", 8],
      ["hp3", 5],
      ["mp2", 2],
      ["mp3", 5],
      ["rvs", 1],
      ["vps", 2],
      ["yps", 3],
      ["wms", 1],
    ],
  },
  "Potion 3": {
    nodrop: 0,
    tcs: [
      ["hp2", 6],
      ["hp3", 6],
      ["hp4", 4],
      ["mp3", 3],
      ["mp4", 3],
      ["rvs", 1],
      ["vps", 2],
      ["yps", 2],
      ["wms", 1],
    ],
  },
  "Potion 4": {
    nodrop: 0,
    tcs: [
      ["hp3", 6],
      ["hp4", 6],
      ["hp5", 4],
      ["mp4", 3],
      ["mp5", 3],
      ["rvs", 1],
      ["vps", 2],
      ["yps", 2],
      ["wms", 1],
    ],
  },
  "Potion 5": {
    nodrop: 0,
    tcs: [
      ["hp3", 4],
      ["hp4", 6],
      ["hp5", 6],
      ["mp5", 5],
      ["rvs", 1],
      ["vps", 2],
      ["yps", 2],
      ["wms", 1],
    ],
  },
  "Potion 6": {
    nodrop: 0,
    tcs: [
      ["hp4", 6],
      ["hp5", 8],
      ["mp4", 1],
      ["mp5", 5],
      ["rvs", 1],
      ["vps", 2],
      ["yps", 2],
      ["wms", 1],
    ],
  },
  "Runes 1": {
    nodrop: 0,
    tcs: [
      ["r01", 3],
      ["r02", 2],
    ],
  },
  "Runes 2": {
    nodrop: 0,
    tcs: [
      ["r03", 3],
      ["r04", 2],
      ["Runes 1", 2],
    ],
  },
  "Runes 3": {
    nodrop: 0,
    tcs: [
      ["r05", 3],
      ["r06", 2],
      ["Runes 2", 5],
    ],
  },
  "Runes 4": {
    nodrop: 0,
    tcs: [
      ["r07", 3],
      ["r08", 2],
      ["Runes 3", 7],
    ],
  },
  "Runes 5": {
    nodrop: 0,
    tcs: [
      ["r09", 3],
      ["r10", 2],
      ["Runes 4", 12],
    ],
  },
  "Runes 6": {
    nodrop: 0,
    tcs: [
      ["r11", 3],
      ["r12", 2],
      ["Runes 5", 22],
    ],
  },
  "Runes 7": {
    nodrop: 0,
    tcs: [
      ["r13", 3],
      ["r14", 2],
      ["Runes 6", 45],
    ],
  },
  "Runes 8": {
    nodrop: 0,
    tcs: [
      ["r15", 3],
      ["r16", 2],
      ["Runes 7", 90],
    ],
  },
  "Runes 9": {
    nodrop: 0,
    tcs: [
      ["r17", 3],
      ["r18", 2],
      ["Runes 8", 180],
    ],
  },
  "Runes 10": {
    nodrop: 0,
    tcs: [
      ["r19", 3],
      ["r20", 2],
      ["Runes 9", 360],
    ],
  },
  "Runes 11": {
    nodrop: 0,
    tcs: [
      ["r21", 3],
      ["r22", 2],
      ["Runes 10", 720],
    ],
  },
  "Runes 12": {
    nodrop: 0,
    tcs: [
      ["r23", 3],
      ["r24", 2],
      ["Runes 11", 1066],
    ],
  },
  "Runes 13": {
    nodrop: 0,
    tcs: [
      ["r25", 3],
      ["r26", 2],
      ["Runes 12", 1519],
    ],
  },
  "Runes 14": {
    nodrop: 0,
    tcs: [
      ["r27", 3],
      ["r28", 2],
      ["Runes 13", 2170],
    ],
  },
  "Runes 15": {
    nodrop: 0,
    tcs: [
      ["r29", 3],
      ["r30", 2],
      ["Runes 14", 2941],
    ],
  },
  "Runes 16": {
    nodrop: 0,
    tcs: [
      ["r31", 3],
      ["r32", 2],
      ["Runes 15", 3957],
    ],
  },
  "Runes 17": {
    nodrop: 0,
    tcs: [
      ["r33", 1],
      ["Runes 16", 5170],
    ],
  },
  "Act 1 Junk": {
    nodrop: 0,
    tcs: [
      ["Potion 1", 8],
      ["Misc 0", 4],
      ["Ammo", 4],
    ],
  },
  "Act 2 Junk": {
    nodrop: 0,
    tcs: [
      ["Act 1 Junk", 2],
      ["Potion 2", 8],
      ["Misc 0", 4],
      ["Ammo", 4],
    ],
  },
  "Act 3 Junk": {
    nodrop: 0,
    tcs: [
      ["Act 2 Junk", 2],
      ["Potion 3", 8],
      ["Misc 1", 4],
      ["Ammo", 4],
    ],
  },
  "Act 4 Junk": {
    nodrop: 0,
    tcs: [
      ["Act 3 Junk", 2],
      ["Potion 4", 8],
      ["Misc 1", 4],
      ["Ammo", 4],
    ],
  },
  "Act 5 Junk": {
    nodrop: 0,
    tcs: [
      ["Act 4 Junk", 2],
      ["Potion 5", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 1 (N) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 2 (N) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 3 (N) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 4 (N) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 5 (N) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 1 (H) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 2 (H) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 3 (H) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 4 (H) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 5 (H) Junk": {
    nodrop: 0,
    tcs: [
      ["Act 5 Junk", 2],
      ["Potion 6", 8],
      ["Misc 2", 4],
      ["Ammo", 4],
    ],
  },
  "Act 1 Equip A": {
    nodrop: 0,
    tcs: [
      ["weap3", 7],
      ["armo3", 7],
    ],
  },
  "Act 1 Equip B": {
    nodrop: 0,
    tcs: [
      ["weap3", 3],
      ["armo3", 3],
      ["weap6", 7],
      ["armo6", 7],
    ],
  },
  "Act 1 Equip C": {
    nodrop: 0,
    tcs: [
      ["weap3", 2],
      ["armo3", 1],
      ["weap6", 6],
      ["armo6", 3],
      ["weap9", 14],
      ["armo9", 7],
      ["weap12", 2],
      ["armo12", 1],
    ],
  },
  "Act 2 Equip A": {
    nodrop: 0,
    tcs: [
      ["weap6", 2],
      ["armo6", 1],
      ["weap9", 6],
      ["armo9", 3],
      ["weap12", 14],
      ["armo12", 7],
      ["weap15", 2],
      ["armo15", 1],
      ["Act 1 Equip C", 30],
    ],
  },
  "Act 2 Equip B": {
    nodrop: 0,
    tcs: [
      ["weap9", 2],
      ["armo9", 1],
      ["weap12", 6],
      ["armo12", 3],
      ["weap15", 14],
      ["armo15", 7],
      ["weap18", 2],
      ["armo18", 1],
      ["Act 2 Equip A", 60],
    ],
  },
  "Act 2 Equip C": {
    nodrop: 0,
    tcs: [
      ["weap12", 2],
      ["armo12", 1],
      ["weap15", 6],
      ["armo15", 3],
      ["weap18", 14],
      ["armo18", 7],
      ["weap21", 2],
      ["armo21", 1],
      ["Act 2 Equip B", 80],
    ],
  },
  "Act 3 Equip A": {
    nodrop: 0,
    tcs: [
      ["weap15", 2],
      ["armo15", 1],
      ["weap18", 6],
      ["armo18", 3],
      ["weap21", 14],
      ["armo21", 7],
      ["weap24", 2],
      ["armo24", 1],
      ["Act 2 Equip C", 100],
    ],
  },
  "Act 3 Equip B": {
    nodrop: 0,
    tcs: [
      ["weap18", 2],
      ["armo18", 1],
      ["weap21", 6],
      ["armo21", 3],
      ["weap24", 14],
      ["armo24", 7],
      ["weap27", 2],
      ["armo27", 1],
      ["Act 3 Equip A", 200],
    ],
  },
  "Act 3 Equip C": {
    nodrop: 0,
    tcs: [
      ["weap21", 2],
      ["armo21", 1],
      ["weap24", 6],
      ["armo24", 3],
      ["weap27", 14],
      ["armo27", 7],
      ["weap30", 2],
      ["armo30", 1],
      ["Act 3 Equip B", 340],
    ],
  },
  "Act 4 Equip A": {
    nodrop: 0,
    tcs: [
      ["weap24", 2],
      ["armo24", 1],
      ["weap27", 6],
      ["armo27", 3],
      ["weap30", 14],
      ["armo30", 4],
      ["weap33", 2],
      ["armo33", 1],
      ["Act 3 Equip C", 430],
    ],
  },
  "Act 4 Equip B": {
    nodrop: 0,
    tcs: [
      ["weap27", 2],
      ["armo27", 1],
      ["weap30", 6],
      ["armo30", 3],
      ["weap33", 14],
      ["armo33", 3],
      ["weap36", 2],
      ["armo36", 1],
      ["Act 4 Equip A", 500],
    ],
  },
  "Act 5 Equip A": {
    nodrop: 0,
    tcs: [
      ["weap27", 2],
      ["armo27", 1],
      ["weap30", 6],
      ["armo30", 3],
      ["weap33", 14],
      ["armo33", 3],
      ["weap36", 7],
      ["armo36", 5],
      ["Act 4 Equip B", 629],
    ],
  },
  "Act 5 Equip B": {
    nodrop: 0,
    tcs: [
      ["weap30", 2],
      ["armo30", 1],
      ["weap33", 6],
      ["armo33", 2],
      ["weap36", 14],
      ["armo36", 7],
      ["weap39", 2],
      ["armo39", 1],
      ["Act 5 Equip A", 731],
    ],
  },
  "Act 5 Equip C": {
    nodrop: 0,
    tcs: [
      ["weap30", 2],
      ["armo30", 1],
      ["weap33", 6],
      ["armo33", 2],
      ["weap36", 14],
      ["armo36", 7],
      ["weap39", 2],
      ["armo39", 1],
      ["Act 5 Equip B", 833],
    ],
  },
  "Act 1 (N) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap33", 2],
      ["armo33", 1],
      ["weap36", 6],
      ["armo36", 3],
      ["weap39", 14],
      ["armo39", 7],
      ["weap42", 2],
      ["armo42", 1],
      ["Act 5 Equip C", 935],
    ],
  },
  "Act 1 (N) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap33", 2],
      ["armo33", 1],
      ["weap36", 6],
      ["armo36", 3],
      ["weap39", 14],
      ["armo39", 7],
      ["weap42", 6],
      ["armo42", 3],
      ["Act 1 (N) Equip A", 1105],
    ],
  },
  "Act 1 (N) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap36", 2],
      ["armo36", 1],
      ["weap39", 6],
      ["armo39", 3],
      ["weap42", 14],
      ["armo42", 7],
      ["weap45", 2],
      ["armo45", 1],
      ["Act 1 (N) Equip A", 1020],
    ],
  },
  "Act 2 (N) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap36", 2],
      ["armo36", 1],
      ["weap39", 6],
      ["armo39", 3],
      ["weap42", 14],
      ["armo42", 7],
      ["weap45", 6],
      ["armo45", 3],
      ["Act 1 (N) Equip B", 1233],
    ],
  },
  "Act 2 (N) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap39", 2],
      ["armo39", 1],
      ["weap42", 6],
      ["armo42", 3],
      ["weap45", 14],
      ["armo45", 7],
      ["weap48", 2],
      ["armo48", 1],
      ["Act 2 (N) Equip A", 1105],
    ],
  },
  "Act 2 (N) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap39", 2],
      ["armo39", 1],
      ["weap42", 6],
      ["armo42", 3],
      ["weap45", 14],
      ["armo45", 7],
      ["weap48", 6],
      ["armo48", 3],
      ["Act 2 (N) Equip A", 1318],
    ],
  },
  "Act 3 (N) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap42", 2],
      ["armo42", 1],
      ["weap45", 6],
      ["armo45", 3],
      ["weap48", 14],
      ["armo48", 7],
      ["weap51", 2],
      ["armo51", 1],
      ["Act 2 (N) Equip B", 1190],
    ],
  },
  "Act 3 (N) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap42", 2],
      ["armo42", 1],
      ["weap45", 6],
      ["armo45", 3],
      ["weap48", 14],
      ["armo48", 7],
      ["weap51", 6],
      ["armo51", 3],
      ["Act 3 (N) Equip A", 1445],
    ],
  },
  "Act 3 (N) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap45", 2],
      ["armo45", 1],
      ["weap48", 6],
      ["armo48", 3],
      ["weap51", 14],
      ["armo51", 7],
      ["weap54", 2],
      ["armo54", 1],
      ["Act 3 (N) Equip A", 1275],
    ],
  },
  "Act 4 (N) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap45", 2],
      ["armo45", 1],
      ["weap48", 6],
      ["armo48", 3],
      ["weap51", 14],
      ["armo51", 7],
      ["weap54", 6],
      ["armo54", 3],
      ["Act 3 (N) Equip B", 1530],
    ],
  },
  "Act 4 (N) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap48", 2],
      ["armo48", 1],
      ["weap51", 6],
      ["armo51", 3],
      ["weap54", 14],
      ["armo54", 7],
      ["weap57", 2],
      ["armo57", 1],
      ["Act 4 (N) Equip A", 1360],
    ],
  },
  "Act 4 (N) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap48", 2],
      ["armo48", 1],
      ["weap51", 6],
      ["armo51", 3],
      ["weap54", 14],
      ["armo54", 7],
      ["weap57", 6],
      ["armo57", 3],
      ["Act 4 (N) Equip A", 1658],
    ],
  },
  "Act 5 (N) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap51", 2],
      ["armo51", 1],
      ["weap54", 6],
      ["armo54", 3],
      ["weap57", 14],
      ["armo57", 7],
      ["weap60", 2],
      ["armo60", 1],
      ["Act 4 (N) Equip B", 1445],
    ],
  },
  "Act 5 (N) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap51", 2],
      ["armo51", 1],
      ["weap54", 6],
      ["armo54", 3],
      ["weap57", 14],
      ["armo57", 7],
      ["weap60", 6],
      ["armo60", 3],
      ["Act 5 (N) Equip A", 1743],
    ],
  },
  "Act 5 (N) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap54", 2],
      ["armo54", 1],
      ["weap57", 6],
      ["armo57", 3],
      ["weap60", 14],
      ["armo60", 7],
      ["weap63", 2],
      ["armo63", 1],
      ["Act 5 (N) Equip B", 1530],
    ],
  },
  "Act 1 (H) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap54", 2],
      ["armo54", 1],
      ["weap57", 6],
      ["armo57", 3],
      ["weap60", 14],
      ["armo60", 7],
      ["weap63", 6],
      ["armo63", 3],
      ["Act 5 (N) Equip C", 1785],
    ],
  },
  "Act 1 (H) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap57", 2],
      ["armo57", 1],
      ["weap60", 6],
      ["armo60", 3],
      ["weap63", 14],
      ["armo63", 7],
      ["weap66", 2],
      ["armo66", 1],
      ["Act 1 (H) Equip A", 1530],
    ],
  },
  "Act 1 (H) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap57", 2],
      ["armo57", 1],
      ["weap60", 6],
      ["armo60", 3],
      ["weap63", 14],
      ["armo63", 7],
      ["weap66", 6],
      ["armo66", 3],
      ["Act 1 (H) Equip A", 1785],
    ],
  },
  "Act 2 (H) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap60", 2],
      ["armo60", 1],
      ["weap63", 6],
      ["armo63", 3],
      ["weap66", 14],
      ["armo66", 7],
      ["weap69", 2],
      ["armo69", 1],
      ["Act 1 (H) Equip B", 1530],
    ],
  },
  "Act 2 (H) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap60", 2],
      ["armo60", 1],
      ["weap63", 6],
      ["armo63", 3],
      ["weap66", 14],
      ["armo66", 7],
      ["weap69", 6],
      ["armo69", 3],
      ["Act 2 (H) Equip A", 1785],
    ],
  },
  "Act 2 (H) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap63", 2],
      ["armo63", 1],
      ["weap66", 6],
      ["armo66", 3],
      ["weap69", 14],
      ["armo69", 7],
      ["weap72", 2],
      ["armo72", 1],
      ["Act 2 (H) Equip A", 1530],
    ],
  },
  "Act 3 (H) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap63", 2],
      ["armo63", 1],
      ["weap66", 6],
      ["armo66", 3],
      ["weap69", 14],
      ["armo69", 7],
      ["weap72", 6],
      ["armo72", 3],
      ["Act 2 (H) Equip B", 1785],
    ],
  },
  "Act 3 (H) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap66", 2],
      ["armo66", 1],
      ["weap69", 6],
      ["armo69", 3],
      ["weap72", 14],
      ["armo72", 7],
      ["weap75", 2],
      ["armo75", 1],
      ["Act 3 (H) Equip A", 1530],
    ],
  },
  "Act 3 (H) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap66", 2],
      ["armo66", 1],
      ["weap69", 6],
      ["armo69", 3],
      ["weap72", 14],
      ["armo72", 7],
      ["weap75", 6],
      ["armo75", 3],
      ["Act 3 (H) Equip A", 1785],
    ],
  },
  "Act 4 (H) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap69", 2],
      ["armo69", 1],
      ["weap72", 6],
      ["armo72", 3],
      ["weap75", 14],
      ["armo75", 7],
      ["weap78", 2],
      ["armo78", 1],
      ["Act 3 (H) Equip B", 1530],
    ],
  },
  "Act 4 (H) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap69", 2],
      ["armo69", 1],
      ["weap72", 6],
      ["armo72", 3],
      ["weap75", 14],
      ["armo75", 7],
      ["weap78", 6],
      ["armo78", 3],
      ["Act 4 (H) Equip A", 1785],
    ],
  },
  "Act 4 (H) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap72", 2],
      ["armo72", 1],
      ["weap75", 6],
      ["armo75", 3],
      ["weap78", 14],
      ["armo78", 7],
      ["weap81", 2],
      ["armo81", 1],
      ["Act 4 (H) Equip A", 1530],
    ],
  },
  "Act 5 (H) Equip A": {
    nodrop: 0,
    tcs: [
      ["weap75", 2],
      ["armo75", 1],
      ["weap78", 6],
      ["armo78", 3],
      ["weap81", 14],
      ["armo81", 7],
      ["weap84", 2],
      ["armo84", 1],
      ["Act 4 (H) Equip B", 1530],
    ],
  },
  "Act 5 (H) Equip B": {
    nodrop: 0,
    tcs: [
      ["weap78", 2],
      ["armo78", 1],
      ["weap81", 6],
      ["armo81", 3],
      ["weap84", 14],
      ["armo84", 7],
      ["weap87", 2],
      ["armo87", 1],
      ["Act 5 (H) Equip A", 1530],
    ],
  },
  "Act 5 (H) Equip C": {
    nodrop: 0,
    tcs: [
      ["weap81", 2],
      ["armo81", 1],
      ["weap84", 6],
      ["armo84", 3],
      ["weap87", 14],
      ["armo87", 7],
      ["weap87", 1],
      ["armo87", 1],
      ["Act 5 (H) Equip B", 1530],
    ],
  },
  "Act 1 Melee A": {
    nodrop: 0,
    tcs: [
      ["mele3", 7],
      ["armo3", 7],
    ],
  },
  "Act 1 Melee B": {
    nodrop: 0,
    tcs: [
      ["mele3", 3],
      ["armo3", 3],
      ["mele6", 7],
      ["armo6", 7],
    ],
  },
  "Act 1 Melee C": {
    nodrop: 0,
    tcs: [
      ["mele3", 2],
      ["armo3", 1],
      ["mele6", 6],
      ["armo6", 3],
      ["mele9", 14],
      ["armo9", 7],
      ["mele12", 2],
      ["armo12", 1],
    ],
  },
  "Act 2 Melee A": {
    nodrop: 0,
    tcs: [
      ["mele6", 2],
      ["armo6", 1],
      ["mele9", 6],
      ["armo9", 3],
      ["mele12", 14],
      ["armo12", 7],
      ["mele15", 2],
      ["armo15", 1],
      ["Act 1 Melee C", 30],
    ],
  },
  "Act 2 Melee B": {
    nodrop: 0,
    tcs: [
      ["mele9", 2],
      ["armo9", 1],
      ["mele12", 6],
      ["armo12", 3],
      ["mele15", 14],
      ["armo15", 7],
      ["mele18", 2],
      ["armo18", 1],
      ["Act 2 Melee A", 60],
    ],
  },
  "Act 2 Melee C": {
    nodrop: 0,
    tcs: [
      ["mele12", 2],
      ["armo12", 1],
      ["mele15", 6],
      ["armo15", 3],
      ["mele18", 14],
      ["armo18", 7],
      ["mele21", 2],
      ["armo21", 1],
      ["Act 2 Melee B", 90],
    ],
  },
  "Act 3 Melee A": {
    nodrop: 0,
    tcs: [
      ["mele15", 2],
      ["armo15", 1],
      ["mele18", 6],
      ["armo18", 3],
      ["mele21", 14],
      ["armo21", 7],
      ["mele24", 2],
      ["armo24", 1],
      ["Act 2 Melee C", 120],
    ],
  },
  "Act 3 Melee B": {
    nodrop: 0,
    tcs: [
      ["mele18", 2],
      ["armo18", 1],
      ["mele21", 6],
      ["armo21", 3],
      ["mele24", 14],
      ["armo24", 7],
      ["mele27", 2],
      ["armo27", 1],
      ["Act 3 Melee A", 150],
    ],
  },
  "Act 3 Melee C": {
    nodrop: 0,
    tcs: [
      ["mele21", 2],
      ["armo21", 1],
      ["mele24", 6],
      ["armo24", 3],
      ["mele27", 14],
      ["armo27", 7],
      ["mele30", 2],
      ["armo30", 1],
      ["Act 3 Melee B", 180],
    ],
  },
  "Act 4 Melee A": {
    nodrop: 0,
    tcs: [
      ["mele24", 2],
      ["armo24", 1],
      ["mele27", 6],
      ["armo27", 3],
      ["mele30", 14],
      ["armo30", 4],
      ["mele33", 2],
      ["armo33", 1],
      ["Act 3 Melee C", 210],
    ],
  },
  "Act 4 Melee B": {
    nodrop: 0,
    tcs: [
      ["mele27", 2],
      ["armo27", 1],
      ["mele30", 6],
      ["armo30", 3],
      ["mele33", 14],
      ["armo33", 3],
      ["mele36", 2],
      ["armo36", 1],
      ["Act 4 Melee A", 260],
    ],
  },
  "Act 5 Melee A": {
    nodrop: 0,
    tcs: [
      ["mele27", 2],
      ["armo27", 1],
      ["mele30", 6],
      ["armo30", 3],
      ["mele33", 14],
      ["armo33", 3],
      ["mele36", 7],
      ["armo36", 5],
      ["Act 4 Melee B", 400],
    ],
  },
  "Act 5 Melee B": {
    nodrop: 0,
    tcs: [
      ["mele30", 2],
      ["armo30", 1],
      ["mele33", 6],
      ["armo33", 2],
      ["mele36", 14],
      ["armo36", 7],
      ["mele39", 2],
      ["armo39", 1],
      ["Act 5 Melee A", 489],
    ],
  },
  "Act 5 Melee C": {
    nodrop: 0,
    tcs: [
      ["mele30", 2],
      ["armo30", 1],
      ["mele33", 6],
      ["armo33", 2],
      ["mele36", 14],
      ["armo36", 7],
      ["mele39", 2],
      ["armo39", 1],
      ["Act 5 Melee B", 629],
    ],
  },
  "Act 1 (N) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap33", 2],
      ["armo33", 1],
      ["weap36", 6],
      ["armo36", 3],
      ["weap39", 14],
      ["armo39", 7],
      ["weap42", 2],
      ["armo42", 1],
      ["Act 5 Melee C", 769],
    ],
  },
  "Act 1 (N) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap36", 2],
      ["armo36", 1],
      ["weap39", 6],
      ["armo39", 3],
      ["weap42", 14],
      ["armo42", 7],
      ["weap45", 2],
      ["armo45", 1],
      ["Act 1 (N) Melee A", 935],
    ],
  },
  "Act 2 (N) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap36", 2],
      ["armo36", 1],
      ["weap39", 6],
      ["armo39", 3],
      ["weap42", 14],
      ["armo42", 7],
      ["weap45", 6],
      ["armo45", 3],
      ["Act 1 (N) Melee B", 1148],
    ],
  },
  "Act 2 (N) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap39", 2],
      ["armo39", 1],
      ["weap42", 6],
      ["armo42", 3],
      ["weap45", 14],
      ["armo45", 7],
      ["weap48", 2],
      ["armo48", 1],
      ["Act 2 (N) Melee A", 1020],
    ],
  },
  "Act 3 (N) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap42", 2],
      ["armo42", 1],
      ["weap45", 6],
      ["armo45", 3],
      ["weap48", 14],
      ["armo48", 7],
      ["weap51", 2],
      ["armo51", 1],
      ["Act 2 (N) Melee B", 1063],
    ],
  },
  "Act 3 (N) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap45", 2],
      ["armo45", 1],
      ["weap48", 6],
      ["armo48", 3],
      ["weap51", 14],
      ["armo51", 7],
      ["weap54", 2],
      ["armo54", 1],
      ["Act 3 (N) Melee A", 1105],
    ],
  },
  "Act 4 (N) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap45", 2],
      ["armo45", 1],
      ["weap48", 6],
      ["armo48", 3],
      ["weap51", 14],
      ["armo51", 7],
      ["weap54", 6],
      ["armo54", 3],
      ["Act 3 (N) Melee B", 1339],
    ],
  },
  "Act 4 (N) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap48", 2],
      ["armo48", 1],
      ["weap51", 6],
      ["armo51", 3],
      ["weap54", 14],
      ["armo54", 7],
      ["weap57", 2],
      ["armo57", 1],
      ["Act 4 (N) Melee A", 1190],
    ],
  },
  "Act 5 (N) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap51", 2],
      ["armo51", 1],
      ["weap54", 6],
      ["armo54", 3],
      ["weap57", 14],
      ["armo57", 7],
      ["weap60", 2],
      ["armo60", 1],
      ["Act 4 (N) Melee B", 1275],
    ],
  },
  "Act 5 (N) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap51", 2],
      ["armo51", 1],
      ["weap54", 6],
      ["armo54", 3],
      ["weap57", 14],
      ["armo57", 7],
      ["weap60", 6],
      ["armo60", 3],
      ["Act 5 (N) Melee A", 1743],
    ],
  },
  "Act 5 (N) Melee C": {
    nodrop: 0,
    tcs: [
      ["weap54", 2],
      ["armo54", 1],
      ["weap57", 6],
      ["armo57", 3],
      ["weap60", 14],
      ["armo60", 7],
      ["weap63", 2],
      ["armo63", 1],
      ["Act 5 (N) Melee B", 1530],
    ],
  },
  "Act 1 (H) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap54", 2],
      ["armo54", 1],
      ["weap57", 6],
      ["armo57", 3],
      ["weap60", 14],
      ["armo60", 7],
      ["weap63", 6],
      ["armo63", 3],
      ["Act 5 (N) Melee C", 1781],
    ],
  },
  "Act 1 (H) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap57", 2],
      ["armo57", 1],
      ["weap60", 6],
      ["armo60", 3],
      ["weap63", 14],
      ["armo63", 7],
      ["weap66", 2],
      ["armo66", 1],
      ["Act 1 (H) Melee A", 1530],
    ],
  },
  "Act 2 (H) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap60", 2],
      ["armo60", 1],
      ["weap63", 6],
      ["armo63", 3],
      ["weap66", 14],
      ["armo66", 7],
      ["weap69", 2],
      ["armo69", 1],
      ["Act 1 (H) Melee B", 1530],
    ],
  },
  "Act 2 (H) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap63", 2],
      ["armo63", 1],
      ["weap66", 6],
      ["armo66", 3],
      ["weap69", 14],
      ["armo69", 7],
      ["weap72", 2],
      ["armo72", 1],
      ["Act 2 (H) Melee A", 1530],
    ],
  },
  "Act 3 (H) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap63", 2],
      ["armo63", 1],
      ["weap66", 6],
      ["armo66", 3],
      ["weap69", 14],
      ["armo69", 7],
      ["weap72", 6],
      ["armo72", 3],
      ["Act 2 (H) Melee B", 1781],
    ],
  },
  "Act 3 (H) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap66", 2],
      ["armo66", 1],
      ["weap69", 6],
      ["armo69", 3],
      ["weap72", 14],
      ["armo72", 7],
      ["weap75", 2],
      ["armo75", 1],
      ["Act 3 (H) Melee A", 1530],
    ],
  },
  "Act 4 (H) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap69", 2],
      ["armo69", 1],
      ["weap72", 6],
      ["armo72", 3],
      ["weap75", 14],
      ["armo75", 7],
      ["weap78", 2],
      ["armo78", 1],
      ["Act 3 (H) Melee B", 1530],
    ],
  },
  "Act 4 (H) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap72", 2],
      ["armo72", 1],
      ["weap75", 6],
      ["armo75", 3],
      ["weap78", 14],
      ["armo78", 7],
      ["weap81", 2],
      ["armo81", 1],
      ["Act 4 (H) Melee A", 1530],
    ],
  },
  "Act 5 (H) Melee A": {
    nodrop: 0,
    tcs: [
      ["weap75", 2],
      ["armo75", 1],
      ["weap78", 6],
      ["armo78", 3],
      ["weap81", 14],
      ["armo81", 7],
      ["weap84", 2],
      ["armo84", 1],
      ["Act 4 (H) Melee B", 1530],
    ],
  },
  "Act 5 (H) Melee B": {
    nodrop: 0,
    tcs: [
      ["weap78", 2],
      ["armo78", 1],
      ["weap81", 6],
      ["armo81", 3],
      ["weap84", 14],
      ["armo84", 7],
      ["weap87", 2],
      ["armo87", 1],
      ["Act 5 (H) Melee A", 1530],
    ],
  },
  "Act 5 (H) Melee C": {
    nodrop: 0,
    tcs: [
      ["weap81", 2],
      ["armo81", 1],
      ["weap84", 6],
      ["armo84", 3],
      ["weap87", 14],
      ["armo87", 7],
      ["weap87", 1],
      ["armo87", 1],
      ["Act 5 (H) Melee B", 1530],
    ],
  },
  "Act 1 Bow A": { nodrop: 0, tcs: [["bow3", 36]] },
  "Act 1 Bow B": {
    nodrop: 0,
    tcs: [
      ["bow3", 20],
      ["bow6", 16],
    ],
  },
  "Act 1 Bow C": {
    nodrop: 0,
    tcs: [
      ["bow3", 10],
      ["bow6", 16],
      ["bow9", 10],
    ],
  },
  "Act 2 Bow A": {
    nodrop: 0,
    tcs: [
      ["bow3", 3],
      ["bow6", 15],
      ["bow9", 15],
      ["bow12", 3],
    ],
  },
  "Act 2 Bow B": {
    nodrop: 0,
    tcs: [
      ["bow3", 1],
      ["bow6", 7],
      ["bow9", 20],
      ["bow12", 7],
      ["bow15", 1],
    ],
  },
  "Act 2 Bow C": {
    nodrop: 0,
    tcs: [
      ["bow3", 1],
      ["bow6", 3],
      ["bow9", 14],
      ["bow12", 14],
      ["bow15", 3],
      ["bow18", 1],
    ],
  },
  "Act 3 Bow A": {
    nodrop: 0,
    tcs: [
      ["bow3", 1],
      ["bow6", 3],
      ["bow9", 6],
      ["bow12", 12],
      ["bow15", 6],
      ["bow18", 3],
      ["bow21", 1],
    ],
  },
  "Act 3 Bow B": {
    nodrop: 0,
    tcs: [
      ["bow3", 1],
      ["bow6", 3],
      ["bow9", 6],
      ["bow12", 8],
      ["bow15", 8],
      ["bow18", 6],
      ["bow21", 3],
      ["bow24", 1],
    ],
  },
  "Act 3 Bow C": {
    nodrop: 0,
    tcs: [
      ["bow3", 1],
      ["bow6", 2],
      ["bow9", 5],
      ["bow12", 7],
      ["bow15", 8],
      ["bow18", 7],
      ["bow21", 4],
      ["bow24", 2],
    ],
  },
  "Act 4 Bow A": {
    nodrop: 0,
    tcs: [
      ["bow6", 1],
      ["bow9", 3],
      ["bow12", 6],
      ["bow15", 8],
      ["bow18", 8],
      ["bow21", 6],
      ["bow24", 3],
      ["bow27", 1],
      ["Act 3 Bow C", 110],
    ],
  },
  "Act 4 Bow B": {
    nodrop: 0,
    tcs: [
      ["bow6", 1],
      ["bow9", 2],
      ["bow12", 5],
      ["bow15", 7],
      ["bow18", 8],
      ["bow21", 7],
      ["bow24", 4],
      ["bow27", 2],
      ["Act 4 Bow A", 180],
    ],
  },
  "Act 5 Bow A": {
    nodrop: 0,
    tcs: [
      ["bow9", 1],
      ["bow12", 3],
      ["bow15", 6],
      ["bow18", 8],
      ["bow21", 8],
      ["bow24", 6],
      ["bow27", 3],
      ["bow30", 1],
      ["Act 4 Bow B", 270],
    ],
  },
  "Act 5 Bow B": {
    nodrop: 0,
    tcs: [
      ["bow9", 1],
      ["bow12", 2],
      ["bow15", 5],
      ["bow18", 7],
      ["bow21", 8],
      ["bow24", 7],
      ["bow27", 4],
      ["bow30", 2],
      ["Act 5 Bow A", 380],
    ],
  },
  "Act 5 Bow C": {
    nodrop: 0,
    tcs: [
      ["bow9", 1],
      ["bow12", 2],
      ["bow15", 5],
      ["bow18", 7],
      ["bow21", 8],
      ["bow24", 7],
      ["bow27", 4],
      ["bow30", 2],
      ["Act 5 Bow B", 500],
    ],
  },
  "Act 1 (N) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow12", 1],
      ["bow15", 2],
      ["bow18", 5],
      ["bow21", 7],
      ["bow24", 8],
      ["bow27", 7],
      ["bow30", 4],
      ["bow33", 2],
      ["Act 5 Bow C", 630],
    ],
  },
  "Act 1 (N) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow15", 1],
      ["bow18", 2],
      ["bow21", 5],
      ["bow24", 7],
      ["bow27", 8],
      ["bow30", 7],
      ["bow33", 4],
      ["bow36", 2],
      ["Act 1 (N) Bow A", 770],
    ],
  },
  "Act 2 (N) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow18", 1],
      ["bow21", 2],
      ["bow24", 5],
      ["bow27", 7],
      ["bow30", 8],
      ["bow33", 7],
      ["bow36", 4],
      ["bow39", 2],
      ["Act 1 (N) Bow B", 920],
    ],
  },
  "Act 2 (N) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow21", 1],
      ["bow24", 2],
      ["bow27", 5],
      ["bow30", 7],
      ["bow33", 8],
      ["bow36", 7],
      ["bow39", 4],
      ["bow42", 2],
      ["Act 2 (N) Bow A", 1070],
    ],
  },
  "Act 3 (N) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow24", 1],
      ["bow27", 2],
      ["bow30", 5],
      ["bow33", 7],
      ["bow36", 8],
      ["bow39", 7],
      ["bow42", 4],
      ["bow45", 2],
      ["Act 2 (N) Bow B", 1220],
    ],
  },
  "Act 3 (N) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow27", 1],
      ["bow30", 2],
      ["bow33", 5],
      ["bow36", 7],
      ["bow39", 8],
      ["bow42", 7],
      ["bow45", 4],
      ["bow48", 2],
      ["Act 3 (N) Bow A", 1370],
    ],
  },
  "Act 4 (N) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow30", 1],
      ["bow33", 2],
      ["bow36", 5],
      ["bow39", 7],
      ["bow42", 8],
      ["bow45", 7],
      ["bow48", 4],
      ["bow51", 2],
      ["Act 3 (N) Bow B", 1520],
    ],
  },
  "Act 4 (N) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow33", 1],
      ["bow36", 2],
      ["bow39", 5],
      ["bow42", 7],
      ["bow45", 8],
      ["bow48", 7],
      ["bow51", 4],
      ["bow54", 2],
      ["Act 4 (N) Bow A", 1670],
    ],
  },
  "Act 5 (N) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow36", 1],
      ["bow39", 2],
      ["bow42", 5],
      ["bow45", 7],
      ["bow48", 8],
      ["bow51", 7],
      ["bow54", 4],
      ["bow57", 2],
      ["Act 4 (N) Bow B", 1820],
    ],
  },
  "Act 5 (N) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow39", 1],
      ["bow42", 2],
      ["bow45", 5],
      ["bow48", 7],
      ["bow51", 8],
      ["bow54", 7],
      ["bow57", 4],
      ["bow60", 2],
      ["Act 5 (N) Bow A", 1970],
    ],
  },
  "Act 5 (N) Bow C": {
    nodrop: 0,
    tcs: [
      ["bow42", 1],
      ["bow45", 2],
      ["bow48", 5],
      ["bow51", 7],
      ["bow54", 8],
      ["bow57", 7],
      ["bow60", 4],
      ["bow63", 2],
      ["Act 5 (N) Bow B", 2120],
    ],
  },
  "Act 1 (H) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow45", 1],
      ["bow48", 2],
      ["bow51", 5],
      ["bow54", 7],
      ["bow57", 8],
      ["bow60", 7],
      ["bow63", 4],
      ["bow66", 2],
      ["Act 5 (N) Bow C", 2270],
    ],
  },
  "Act 1 (H) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow48", 1],
      ["bow51", 2],
      ["bow54", 5],
      ["bow57", 7],
      ["bow60", 8],
      ["bow63", 7],
      ["bow66", 4],
      ["bow69", 2],
      ["Act 1 (H) Bow A", 2270],
    ],
  },
  "Act 2 (H) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow51", 1],
      ["bow54", 2],
      ["bow57", 5],
      ["bow60", 7],
      ["bow63", 8],
      ["bow66", 7],
      ["bow69", 4],
      ["bow72", 2],
      ["Act 1 (H) Bow B", 2270],
    ],
  },
  "Act 2 (H) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow54", 1],
      ["bow57", 2],
      ["bow60", 5],
      ["bow63", 7],
      ["bow66", 8],
      ["bow69", 7],
      ["bow72", 4],
      ["bow75", 2],
      ["Act 2 (H) Bow A", 2270],
    ],
  },
  "Act 3 (H) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow57", 1],
      ["bow60", 2],
      ["bow63", 5],
      ["bow66", 7],
      ["bow69", 8],
      ["bow72", 7],
      ["bow75", 4],
      ["bow78", 2],
      ["Act 2 (H) Bow B", 2270],
    ],
  },
  "Act 3 (H) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow60", 1],
      ["bow63", 2],
      ["bow66", 5],
      ["bow69", 7],
      ["bow72", 8],
      ["bow75", 7],
      ["bow78", 4],
      ["bow81", 2],
      ["Act 3 (H) Bow A", 2270],
    ],
  },
  "Act 4 (H) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow63", 1],
      ["bow66", 2],
      ["bow69", 5],
      ["bow72", 7],
      ["bow75", 8],
      ["bow78", 7],
      ["bow81", 4],
      ["bow84", 2],
      ["Act 3 (H) Bow B", 2270],
    ],
  },
  "Act 4 (H) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow66", 1],
      ["bow69", 2],
      ["bow72", 5],
      ["bow75", 7],
      ["bow78", 8],
      ["bow81", 7],
      ["bow84", 2],
      ["bow84", 1],
      ["Act 4 (H) Bow A", 2080],
    ],
  },
  "Act 5 (H) Bow A": {
    nodrop: 0,
    tcs: [
      ["bow69", 1],
      ["bow72", 2],
      ["bow75", 5],
      ["bow78", 7],
      ["bow81", 8],
      ["bow84", 7],
      ["bow87", 2],
      ["bow87", 1],
      ["Act 4 (H) Bow B", 2080],
    ],
  },
  "Act 5 (H) Bow B": {
    nodrop: 0,
    tcs: [
      ["bow72", 1],
      ["bow75", 2],
      ["bow78", 5],
      ["bow81", 7],
      ["bow84", 8],
      ["bow87", 7],
      ["bow87", 2],
      ["bow87", 1],
      ["Act 5 (H) Bow A", 2080],
    ],
  },
  "Act 5 (H) Bow C": {
    nodrop: 0,
    tcs: [
      ["bow75", 1],
      ["bow78", 2],
      ["bow81", 5],
      ["bow84", 7],
      ["bow87", 8],
      ["bow87", 1],
      ["bow87", 1],
      ["bow87", 1],
      ["Act 5 (H) Bow B", 1655],
    ],
  },
  "Act 1 Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp1", 6],
    ],
  },
  "Act 1 Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp1", 4],
      ["mp2", 2],
    ],
  },
  "Act 1 Magic C": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp1", 2],
      ["mp2", 4],
    ],
  },
  "Act 2 Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp1", 1],
      ["mp2", 4],
      ["mp3", 1],
    ],
  },
  "Act 2 Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp1", 1],
      ["mp2", 3],
      ["mp3", 2],
    ],
  },
  "Act 2 Magic C": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp2", 2],
      ["mp3", 3],
      ["mp4", 1],
    ],
  },
  "Act 3 Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp3", 4],
      ["mp4", 2],
    ],
  },
  "Act 3 Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp3", 3],
      ["mp4", 3],
    ],
  },
  "Act 3 Magic C": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp3", 2],
      ["mp4", 3],
      ["mp5", 1],
    ],
  },
  "Act 4 Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp3", 1],
      ["mp4", 4],
      ["mp5", 1],
    ],
  },
  "Act 4 Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 4],
      ["mp5", 2],
    ],
  },
  "Act 5 Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 3],
      ["mp5", 3],
    ],
  },
  "Act 5 Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 5 Magic C": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 1 (N) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 1 (N) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 2 (N) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 2 (N) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 3 (N) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 3 (N) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 4 (N) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 4 (N) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 5 (N) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 5 (N) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 5 (N) Magic C": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 1 (H) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 1 (H) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 2 (H) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 2 (H) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 3 (H) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 3 (H) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 4 (H) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 4 (H) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 5 (H) Magic A": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 5 (H) Magic B": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 5 (H) Magic C": {
    nodrop: 0,
    tcs: [
      ["tsc", 2],
      ["isc", 4],
      ["mp4", 2],
      ["mp5", 4],
    ],
  },
  "Act 1 Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry A", 5],
      ["Chipped Gem", 5],
    ],
  },
  "Act 2 Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry B", 20],
      ["Chipped Gem", 12],
      ["Flawed Gem", 4],
      ["Runes 1", 3],
      ["Runes 2", 3],
    ],
  },
  "Act 3 Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 20],
      ["Chipped Gem", 8],
      ["Flawed Gem", 8],
      ["Runes 3", 3],
      ["Runes 4", 3],
    ],
  },
  "Act 4 Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 50],
      ["Chipped Gem", 14],
      ["Flawed Gem", 28],
      ["Normal Gem", 42],
      ["Runes 5", 14],
      ["Runes 6", 7],
    ],
  },
  "Act 5 Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 50],
      ["Chipped Gem", 6],
      ["Flawed Gem", 8],
      ["Normal Gem", 24],
      ["Flawless Gem", 4],
      ["Runes 7", 10],
    ],
  },
  "Act 1 (N) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 6],
      ["Flawed Gem", 8],
      ["Normal Gem", 28],
      ["Flawless Gem", 14],
      ["Runes 8", 14],
    ],
  },
  "Act 2 (N) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 9", 14],
    ],
  },
  "Act 3 (N) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 10", 14],
    ],
  },
  "Act 4 (N) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 11", 14],
    ],
  },
  "Act 5 (N) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 12", 14],
    ],
  },
  "Act 1 (H) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 13", 14],
    ],
  },
  "Act 2 (H) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 14", 14],
    ],
  },
  "Act 3 (H) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 15", 14],
    ],
  },
  "Act 4 (H) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 16", 14],
    ],
  },
  "Act 5 (H) Good": {
    nodrop: 0,
    tcs: [
      ["Jewelry C", 60],
      ["Chipped Gem", 4],
      ["Flawed Gem", 10],
      ["Normal Gem", 14],
      ["Flawless Gem", 28],
      ["Runes 17", 14],
    ],
  },
  "Act 1 Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 Junk", 15],
      ["Act 1 Equip A", 10],
      ["Act 1 Good", 2],
    ],
  },
  "Act 1 Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 Junk", 15],
      ["Act 1 Equip B", 10],
      ["Act 1 Good", 2],
    ],
  },
  "Act 1 Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 Junk", 12],
      ["Act 2 Junk", 3],
      ["Act 1 Equip C", 15],
      ["Act 1 Good", 2],
    ],
  },
  "Act 2 Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 Junk", 15],
      ["Act 2 Equip A", 10],
      ["Act 2 Good", 2],
    ],
  },
  "Act 2 Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 Junk", 15],
      ["Act 2 Equip B", 10],
      ["Act 2 Good", 2],
    ],
  },
  "Act 2 Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 Junk", 12],
      ["Act 3 Junk", 3],
      ["Act 2 Equip C", 15],
      ["Act 2 Good", 2],
    ],
  },
  "Act 3 Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 Junk", 15],
      ["Act 3 Equip A", 10],
      ["Act 3 Good", 2],
    ],
  },
  "Act 3 Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 Junk", 15],
      ["Act 3 Equip B", 10],
      ["Act 3 Good", 2],
    ],
  },
  "Act 3 Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 Junk", 15],
      ["Act 3 Equip C", 10],
      ["Act 3 Good", 2],
    ],
  },
  "Act 4 Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 Junk", 15],
      ["Act 4 Equip A", 10],
      ["Act 4 Good", 2],
    ],
  },
  "Act 4 Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 Junk", 15],
      ["Act 4 Equip B", 10],
      ["Act 4 Good", 2],
    ],
  },
  "Act 4 Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 Junk", 15],
      ["Act 4 Equip B", 10],
      ["Act 4 Good", 2],
    ],
  },
  "Act 5 Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 Junk", 15],
      ["Act 5 Equip A", 10],
      ["Act 5 Good", 2],
    ],
  },
  "Act 5 Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 Junk", 15],
      ["Act 5 Equip B", 10],
      ["Act 5 Good", 2],
    ],
  },
  "Act 5 Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 Junk", 15],
      ["Act 5 Equip B", 10],
      ["Act 5 Good", 2],
    ],
  },
  "Act 1 (N) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 (N) Junk", 15],
      ["Act 1 (N) Equip A", 10],
      ["Act 1 (N) Good", 2],
    ],
  },
  "Act 1 (N) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 (N) Junk", 15],
      ["Act 1 (N) Equip B", 10],
      ["Act 1 (N) Good", 2],
    ],
  },
  "Act 1 (N) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 (N) Junk", 15],
      ["Act 1 (N) Equip B", 10],
      ["Act 1 (N) Good", 2],
    ],
  },
  "Act 2 (N) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 (N) Junk", 15],
      ["Act 2 (N) Equip A", 10],
      ["Act 2 (N) Good", 2],
    ],
  },
  "Act 2 (N) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 (N) Junk", 15],
      ["Act 2 (N) Equip B", 10],
      ["Act 2 (N) Good", 2],
    ],
  },
  "Act 2 (N) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 (N) Junk", 15],
      ["Act 2 (N) Equip B", 10],
      ["Act 2 (N) Good", 2],
    ],
  },
  "Act 3 (N) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 (N) Junk", 15],
      ["Act 3 (N) Equip A", 10],
      ["Act 3 (N) Good", 2],
    ],
  },
  "Act 3 (N) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 (N) Junk", 15],
      ["Act 3 (N) Equip B", 10],
      ["Act 3 (N) Good", 2],
    ],
  },
  "Act 3 (N) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 (N) Junk", 15],
      ["Act 3 (N) Equip B", 10],
      ["Act 3 (N) Good", 2],
    ],
  },
  "Act 4 (N) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 (N) Junk", 15],
      ["Act 4 (N) Equip A", 10],
      ["Act 4 (N) Good", 2],
    ],
  },
  "Act 4 (N) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 (N) Junk", 15],
      ["Act 4 (N) Equip B", 10],
      ["Act 4 (N) Good", 2],
    ],
  },
  "Act 4 (N) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 (N) Junk", 15],
      ["Act 4 (N) Equip C", 10],
      ["Act 4 (N) Good", 2],
    ],
  },
  "Act 5 (N) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 (N) Junk", 15],
      ["Act 5 (N) Equip A", 10],
      ["Act 5 (N) Good", 2],
    ],
  },
  "Act 5 (N) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 (N) Junk", 15],
      ["Act 5 (N) Equip B", 10],
      ["Act 5 (N) Good", 2],
    ],
  },
  "Act 5 (N) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 (N) Junk", 15],
      ["Act 5 (N) Equip B", 10],
      ["Act 5 (N) Good", 2],
    ],
  },
  "Act 1 (H) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 (H) Junk", 15],
      ["Act 1 (H) Equip A", 10],
      ["Act 1 (H) Good", 2],
    ],
  },
  "Act 1 (H) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 (H) Junk", 15],
      ["Act 1 (H) Equip B", 10],
      ["Act 1 (H) Good", 2],
    ],
  },
  "Act 1 (H) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 1 (H) Junk", 15],
      ["Act 1 (H) Equip B", 10],
      ["Act 1 (H) Good", 2],
    ],
  },
  "Act 2 (H) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 (H) Junk", 15],
      ["Act 2 (H) Equip A", 10],
      ["Act 2 (H) Good", 2],
    ],
  },
  "Act 2 (H) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 (H) Junk", 15],
      ["Act 2 (H) Equip B", 10],
      ["Act 2 (H) Good", 2],
    ],
  },
  "Act 2 (H) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 2 (H) Junk", 15],
      ["Act 2 (H) Equip B", 10],
      ["Act 2 (H) Good", 2],
    ],
  },
  "Act 3 (H) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 (H) Junk", 15],
      ["Act 3 (H) Equip A", 10],
      ["Act 3 (H) Good", 2],
    ],
  },
  "Act 3 (H) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 (H) Junk", 15],
      ["Act 3 (H) Equip B", 10],
      ["Act 3 (H) Good", 2],
    ],
  },
  "Act 3 (H) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 3 (H) Junk", 15],
      ["Act 3 (H) Equip B", 10],
      ["Act 3 (H) Good", 2],
    ],
  },
  "Act 4 (H) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 (H) Junk", 15],
      ["Act 4 (H) Equip A", 10],
      ["Act 4 (H) Good", 2],
    ],
  },
  "Act 4 (H) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 (H) Junk", 15],
      ["Act 4 (H) Equip B", 10],
      ["Act 4 (H) Good", 2],
    ],
  },
  "Act 4 (H) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 4 (H) Junk", 15],
      ["Act 4 (H) Equip B", 10],
      ["Act 4 (H) Good", 2],
    ],
  },
  "Act 5 (H) Chest A": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 (H) Junk", 15],
      ["Act 5 (H) Equip A", 10],
      ["Act 5 (H) Good", 2],
    ],
  },
  "Act 5 (H) Chest B": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 (H) Junk", 15],
      ["Act 5 (H) Equip B", 10],
      ["Act 5 (H) Good", 2],
    ],
  },
  "Act 5 (H) Chest C": {
    nodrop: 100,
    tcs: [
      ["gld", 15],
      ["Act 5 (H) Junk", 15],
      ["Act 5 (H) Equip B", 10],
      ["Act 5 (H) Good", 2],
    ],
  },
  "Act 1 H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 Equip A", 16],
      ["Act 1 Junk", 21],
      ["Act 1 Good", 2],
    ],
  },
  "Act 1 H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 Equip B", 16],
      ["Act 1 Junk", 21],
      ["Act 1 Good", 2],
    ],
  },
  "Act 1 H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 Equip C", 16],
      ["Act 1 Junk", 21],
      ["Act 1 Good", 2],
    ],
  },
  "Act 2 H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 Equip A", 16],
      ["Act 2 Junk", 21],
      ["Act 2 Good", 2],
    ],
  },
  "Act 2 H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 Equip B", 16],
      ["Act 2 Junk", 21],
      ["Act 2 Good", 2],
    ],
  },
  "Act 2 H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 Equip C", 16],
      ["Act 2 Junk", 21],
      ["Act 3 Good", 2],
    ],
  },
  "Act 3 H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 Equip A", 16],
      ["Act 3 Junk", 21],
      ["Act 3 Good", 2],
    ],
  },
  "Act 3 H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 Equip B", 16],
      ["Act 3 Junk", 21],
      ["Act 3 Good", 2],
    ],
  },
  "Act 3 H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 Equip C", 16],
      ["Act 3 Junk", 21],
      ["Act 3 Good", 2],
    ],
  },
  "Act 4 H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 4 Equip A", 16],
      ["Act 4 Junk", 21],
      ["Act 4 Good", 2],
    ],
  },
  "Act 4 H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 4 Equip B", 16],
      ["Act 4 Junk", 21],
      ["Act 4 Good", 2],
    ],
  },
  "Act 5 H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 Equip A", 16],
      ["Act 5 Junk", 21],
      ["Act 5 Good", 2],
    ],
  },
  "Act 5 H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 Equip B", 16],
      ["Act 5 Junk", 21],
      ["Act 5 Good", 2],
    ],
  },
  "Act 5 H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 Equip C", 16],
      ["Act 5 Junk", 21],
      ["Act 5 Good", 2],
    ],
  },
  "Act 1 (N) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 (N) Equip A", 16],
      ["Act 1 (N) Junk", 21],
      ["Act 1 (N) Good", 2],
    ],
  },
  "Act 1 (N) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 (N) Equip B", 16],
      ["Act 1 (N) Junk", 21],
      ["Act 1 (N) Good", 2],
    ],
  },
  "Act 1 (N) H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 (N) Equip B", 16],
      ["Act 1 (N) Junk", 21],
      ["Act 1 (N) Good", 2],
    ],
  },
  "Act 2 (N) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 (N) Equip A", 16],
      ["Act 2 (N) Junk", 21],
      ["Act 2 (N) Good", 2],
    ],
  },
  "Act 2 (N) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 (N) Equip B", 16],
      ["Act 2 (N) Junk", 21],
      ["Act 2 (N) Good", 2],
    ],
  },
  "Act 2 (N) H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 (N) Equip B", 16],
      ["Act 2 (N) Junk", 21],
      ["Act 2 (N) Good", 2],
    ],
  },
  "Act 3 (N) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 (N) Equip A", 16],
      ["Act 3 (N) Junk", 21],
      ["Act 3 (N) Good", 2],
    ],
  },
  "Act 3 (N) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 (N) Equip B", 16],
      ["Act 3 (N) Junk", 21],
      ["Act 3 (N) Good", 2],
    ],
  },
  "Act 3 (N) H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 (N) Equip B", 16],
      ["Act 3 (N) Junk", 21],
      ["Act 3 (N) Good", 2],
    ],
  },
  "Act 4 (N) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 4 (N) Equip A", 16],
      ["Act 4 (N) Junk", 21],
      ["Act 4 (N) Good", 2],
    ],
  },
  "Act 4 (N) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 4 (N) Equip B", 16],
      ["Act 4 (N) Junk", 21],
      ["Act 4 (N) Good", 2],
    ],
  },
  "Act 5 (N) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 (N) Equip A", 16],
      ["Act 5 (N) Junk", 21],
      ["Act 5 (N) Good", 2],
    ],
  },
  "Act 5 (N) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 (N) Equip B", 16],
      ["Act 5 (N) Junk", 21],
      ["Act 5 (N) Good", 2],
    ],
  },
  "Act 5 (N) H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 (N) Equip C", 16],
      ["Act 5 (N) Junk", 21],
      ["Act 5 (N) Good", 2],
    ],
  },
  "Act 1 (H) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 (H) Equip A", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 1 (H) Good", 2],
    ],
  },
  "Act 1 (H) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 (H) Equip B", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 1 (H) Good", 2],
    ],
  },
  "Act 1 (H) H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 1 (H) Equip B", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 1 (H) Good", 2],
    ],
  },
  "Act 2 (H) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 (H) Equip A", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 2 (H) Good", 2],
    ],
  },
  "Act 2 (H) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 (H) Equip B", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 2 (H) Good", 2],
    ],
  },
  "Act 2 (H) H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 2 (H) Equip B", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 2 (H) Good", 2],
    ],
  },
  "Act 3 (H) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 (H) Equip A", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 3 (H) Good", 2],
    ],
  },
  "Act 3 (H) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 (H) Equip B", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 3 (H) Good", 2],
    ],
  },
  "Act 3 (H) H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 3 (H) Equip B", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 3 (H) Good", 2],
    ],
  },
  "Act 4 (H) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 4 (H) Equip A", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 4 (H) Good", 2],
    ],
  },
  "Act 4 (H) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 4 (H) Equip B", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 4 (H) Good", 2],
    ],
  },
  "Act 5 (H) H2H A": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 (H) Equip A", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 5 (H) Good", 2],
    ],
  },
  "Act 5 (H) H2H B": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 (H) Equip B", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 5 (H) Good", 2],
    ],
  },
  "Act 5 (H) H2H C": {
    nodrop: 100,
    tcs: [
      ["gld", 21],
      ["Act 5 (H) Equip C", 16],
      ["Act 1 (H) Junk", 21],
      ["Act 5 (H) Good", 2],
    ],
  },
  "Act 1 Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 Equip A", 15],
      ["Act 1 Junk", 18],
      ["Act 1 Good", 2],
      ["Act 1 Magic A", 7],
    ],
  },
  "Act 1 Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 Equip B", 15],
      ["Act 1 Junk", 18],
      ["Act 1 Good", 2],
      ["Act 1 Magic B", 7],
    ],
  },
  "Act 1 Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 Equip C", 15],
      ["Act 1 Junk", 18],
      ["Act 1 Good", 2],
      ["Act 1 Magic C", 7],
    ],
  },
  "Act 2 Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 Equip A", 15],
      ["Act 2 Junk", 18],
      ["Act 2 Good", 2],
      ["Act 2 Magic A", 7],
    ],
  },
  "Act 2 Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 Equip B", 15],
      ["Act 2 Junk", 18],
      ["Act 2 Good", 2],
      ["Act 2 Magic B", 7],
    ],
  },
  "Act 2 Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 Equip C", 15],
      ["Act 2 Junk", 18],
      ["Act 3 Good", 2],
      ["Act 2 Magic C", 7],
    ],
  },
  "Act 3 Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 Equip A", 15],
      ["Act 3 Junk", 18],
      ["Act 3 Good", 2],
      ["Act 3 Magic A", 7],
    ],
  },
  "Act 3 Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 Equip B", 15],
      ["Act 3 Junk", 18],
      ["Act 3 Good", 2],
      ["Act 3 Magic B", 7],
    ],
  },
  "Act 3 Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 Equip C", 15],
      ["Act 3 Junk", 18],
      ["Act 3 Good", 2],
      ["Act 3 Magic C", 7],
    ],
  },
  "Act 4 Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 Equip A", 15],
      ["Act 4 Junk", 18],
      ["Act 4 Good", 2],
      ["Act 4 Magic A", 7],
    ],
  },
  "Act 4 Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 Equip B", 15],
      ["Act 4 Junk", 18],
      ["Act 4 Good", 2],
      ["Act 4 Magic B", 7],
    ],
  },
  "Act 5 Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 Equip A", 15],
      ["Act 5 Junk", 18],
      ["Act 5 Good", 2],
      ["Act 5 Magic A", 7],
    ],
  },
  "Act 5 Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 Equip B", 15],
      ["Act 5 Junk", 18],
      ["Act 5 Good", 2],
      ["Act 5 Magic B", 7],
    ],
  },
  "Act 5 Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 Equip C", 15],
      ["Act 5 Junk", 18],
      ["Act 5 Good", 2],
      ["Act 5 Magic C", 7],
    ],
  },
  "Act 1 (N) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (N) Equip A", 15],
      ["Act 1 (N) Junk", 18],
      ["Act 1 (N) Good", 2],
      ["Act 1 (N) Magic A", 7],
    ],
  },
  "Act 1 (N) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (N) Equip B", 15],
      ["Act 1 (N) Junk", 18],
      ["Act 1 (N) Good", 2],
      ["Act 1 (N) Magic B", 7],
    ],
  },
  "Act 1 (N) Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (N) Equip B", 15],
      ["Act 1 (N) Junk", 18],
      ["Act 1 (N) Good", 2],
      ["Act 1 (N) Magic B", 7],
    ],
  },
  "Act 2 (N) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (N) Equip A", 15],
      ["Act 2 (N) Junk", 18],
      ["Act 2 (N) Good", 2],
      ["Act 2 (N) Magic A", 7],
    ],
  },
  "Act 2 (N) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (N) Equip B", 15],
      ["Act 2 (N) Junk", 18],
      ["Act 2 (N) Good", 2],
      ["Act 2 (N) Magic B", 7],
    ],
  },
  "Act 2 (N) Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (N) Equip B", 15],
      ["Act 2 (N) Junk", 18],
      ["Act 2 (N) Good", 2],
      ["Act 2 (N) Magic B", 7],
    ],
  },
  "Act 3 (N) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (N) Equip A", 15],
      ["Act 3 (N) Junk", 18],
      ["Act 3 (N) Good", 2],
      ["Act 3 (N) Magic A", 7],
    ],
  },
  "Act 3 (N) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (N) Equip B", 15],
      ["Act 3 (N) Junk", 18],
      ["Act 3 (N) Good", 2],
      ["Act 3 (N) Magic B", 7],
    ],
  },
  "Act 3 (N) Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (N) Equip B", 15],
      ["Act 3 (N) Junk", 18],
      ["Act 3 (N) Good", 2],
      ["Act 3 (N) Magic B", 7],
    ],
  },
  "Act 4 (N) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 (N) Equip A", 15],
      ["Act 4 (N) Junk", 18],
      ["Act 4 (N) Good", 2],
      ["Act 4 (N) Magic A", 7],
    ],
  },
  "Act 4 (N) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 (N) Equip B", 15],
      ["Act 4 (N) Junk", 18],
      ["Act 4 (N) Good", 2],
      ["Act 4 (N) Magic B", 7],
    ],
  },
  "Act 5 (N) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (N) Equip A", 15],
      ["Act 5 (N) Junk", 18],
      ["Act 5 (N) Good", 2],
      ["Act 5 (N) Magic A", 7],
    ],
  },
  "Act 5 (N) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (N) Equip B", 15],
      ["Act 5 (N) Junk", 18],
      ["Act 5 (N) Good", 2],
      ["Act 5 (N) Magic B", 7],
    ],
  },
  "Act 5 (N) Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (N) Equip C", 15],
      ["Act 5 (N) Junk", 18],
      ["Act 5 (N) Good", 2],
      ["Act 5 (N) Magic B", 7],
    ],
  },
  "Act 1 (H) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (H) Equip A", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 1 (H) Good", 2],
      ["Act 1 (H) Magic A", 7],
    ],
  },
  "Act 1 (H) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (H) Equip B", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 1 (H) Good", 2],
      ["Act 1 (H) Magic B", 7],
    ],
  },
  "Act 1 (H) Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (H) Equip B", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 1 (H) Good", 2],
      ["Act 1 (H) Magic B", 7],
    ],
  },
  "Act 2 (H) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (H) Equip A", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 2 (H) Good", 2],
      ["Act 2 (H) Magic A", 7],
    ],
  },
  "Act 2 (H) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (H) Equip B", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 2 (H) Good", 2],
      ["Act 2 (H) Magic B", 7],
    ],
  },
  "Act 2 (H) Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (H) Equip B", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 2 (H) Good", 2],
      ["Act 2 (H) Magic B", 7],
    ],
  },
  "Act 3 (H) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (H) Equip A", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 3 (H) Good", 2],
      ["Act 3 (H) Magic A", 7],
    ],
  },
  "Act 3 (H) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (H) Equip B", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 3 (H) Good", 2],
      ["Act 3 (H) Magic B", 7],
    ],
  },
  "Act 3 (H) Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (H) Equip B", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 3 (H) Good", 2],
      ["Act 3 (H) Magic B", 7],
    ],
  },
  "Act 4 (H) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 (H) Equip A", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 4 (H) Good", 2],
      ["Act 4 (H) Magic A", 7],
    ],
  },
  "Act 4 (H) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 (H) Equip B", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 4 (H) Good", 2],
      ["Act 4 (H) Magic B", 7],
    ],
  },
  "Act 5 (H) Cast A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (H) Equip A", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 5 (H) Good", 2],
      ["Act 5 (H) Magic A", 7],
    ],
  },
  "Act 5 (H) Cast B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (H) Equip B", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 5 (H) Good", 2],
      ["Act 5 (H) Magic B", 7],
    ],
  },
  "Act 5 (H) Cast C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (H) Equip C", 15],
      ["Act 1 (H) Junk", 18],
      ["Act 5 (H) Good", 2],
      ["Act 5 (H) Magic B", 7],
    ],
  },
  "Act 1 Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 Equip A", 13],
      ["Act 1 Junk", 18],
      ["Act 1 Good", 2],
      ["Act 1 Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 Equip B", 13],
      ["Act 1 Junk", 18],
      ["Act 1 Good", 2],
      ["Act 1 Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 Equip C", 13],
      ["Act 1 Junk", 18],
      ["Act 1 Good", 2],
      ["Act 1 Bow C", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 Equip A", 13],
      ["Act 2 Junk", 18],
      ["Act 2 Good", 2],
      ["Act 2 Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 Equip B", 13],
      ["Act 2 Junk", 18],
      ["Act 2 Good", 2],
      ["Act 2 Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 Equip C", 13],
      ["Act 2 Junk", 18],
      ["Act 3 Good", 2],
      ["Act 2 Bow C", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 Equip A", 13],
      ["Act 3 Junk", 18],
      ["Act 3 Good", 2],
      ["Act 3 Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 Equip B", 13],
      ["Act 3 Junk", 18],
      ["Act 3 Good", 2],
      ["Act 3 Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 Equip C", 13],
      ["Act 3 Junk", 18],
      ["Act 3 Good", 2],
      ["Act 3 Bow C", 6],
      ["Ammo", 3],
    ],
  },
  "Act 4 Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 Equip A", 13],
      ["Act 4 Junk", 18],
      ["Act 4 Good", 2],
      ["Act 4 Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 4 Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 Equip B", 13],
      ["Act 4 Junk", 18],
      ["Act 4 Good", 2],
      ["Act 4 Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 Equip A", 13],
      ["Act 5 Junk", 18],
      ["Act 5 Good", 2],
      ["Act 5 Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 Equip B", 13],
      ["Act 5 Junk", 18],
      ["Act 5 Good", 2],
      ["Act 5 Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 Equip C", 13],
      ["Act 5 Junk", 18],
      ["Act 5 Good", 2],
      ["Act 5 Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 (N) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (N) Equip A", 13],
      ["Act 1 (N) Junk", 18],
      ["Act 1 (N) Good", 2],
      ["Act 1 (N) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 (N) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (N) Equip B", 13],
      ["Act 1 (N) Junk", 18],
      ["Act 1 (N) Good", 2],
      ["Act 1 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 (N) Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (N) Equip B", 13],
      ["Act 1 (N) Junk", 18],
      ["Act 1 (N) Good", 2],
      ["Act 1 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 (N) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (N) Equip A", 13],
      ["Act 2 (N) Junk", 18],
      ["Act 2 (N) Good", 2],
      ["Act 2 (N) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 (N) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (N) Equip B", 13],
      ["Act 2 (N) Junk", 18],
      ["Act 2 (N) Good", 2],
      ["Act 2 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 (N) Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (N) Equip B", 13],
      ["Act 2 (N) Junk", 18],
      ["Act 2 (N) Good", 2],
      ["Act 2 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 (N) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (N) Equip A", 13],
      ["Act 3 (N) Junk", 18],
      ["Act 3 (N) Good", 2],
      ["Act 3 (N) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 (N) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (N) Equip B", 13],
      ["Act 3 (N) Junk", 18],
      ["Act 3 (N) Good", 2],
      ["Act 3 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 (N) Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (N) Equip B", 13],
      ["Act 3 (N) Junk", 18],
      ["Act 3 (N) Good", 2],
      ["Act 3 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 4 (N) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 (N) Equip A", 13],
      ["Act 4 (N) Junk", 18],
      ["Act 4 (N) Good", 2],
      ["Act 4 (N) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 4 (N) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 (N) Equip B", 13],
      ["Act 4 (N) Junk", 18],
      ["Act 4 (N) Good", 2],
      ["Act 4 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 (N) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (N) Equip A", 13],
      ["Act 5 (N) Junk", 18],
      ["Act 5 (N) Good", 2],
      ["Act 5 (N) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 (N) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (N) Equip B", 13],
      ["Act 5 (N) Junk", 18],
      ["Act 5 (N) Good", 2],
      ["Act 5 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 (N) Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (N) Equip C", 13],
      ["Act 5 (N) Junk", 18],
      ["Act 5 (N) Good", 2],
      ["Act 5 (N) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 (H) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (H) Equip A", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 1 (H) Good", 2],
      ["Act 1 (H) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 (H) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (H) Equip B", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 1 (H) Good", 2],
      ["Act 1 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 (H) Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 1 (H) Equip B", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 1 (H) Good", 2],
      ["Act 1 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 (H) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (H) Equip A", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 2 (H) Good", 2],
      ["Act 2 (H) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 (H) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (H) Equip B", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 2 (H) Good", 2],
      ["Act 2 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 2 (H) Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 2 (H) Equip B", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 2 (H) Good", 2],
      ["Act 2 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 (H) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (H) Equip A", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 3 (H) Good", 2],
      ["Act 3 (H) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 (H) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (H) Equip B", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 3 (H) Good", 2],
      ["Act 3 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 3 (H) Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 3 (H) Equip B", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 3 (H) Good", 2],
      ["Act 3 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 4 (H) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 (H) Equip A", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 4 (H) Good", 2],
      ["Act 4 (H) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 4 (H) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 4 (H) Equip B", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 4 (H) Good", 2],
      ["Act 4 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 (H) Miss A": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (H) Equip A", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 5 (H) Good", 2],
      ["Act 5 (H) Bow A", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 (H) Miss B": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (H) Equip B", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 5 (H) Good", 2],
      ["Act 5 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 5 (H) Miss C": {
    nodrop: 100,
    tcs: [
      ["gld", 18],
      ["Act 5 (H) Equip C", 13],
      ["Act 1 (H) Junk", 18],
      ["Act 5 (H) Good", 2],
      ["Act 5 (H) Bow B", 6],
      ["Ammo", 3],
    ],
  },
  "Act 1 Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 1 Good", 4],
      ["Act 1 Magic A", 25],
    ],
  },
  "Act 1 Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 1 Good", 4],
      ["Act 1 Magic B", 25],
    ],
  },
  "Act 1 Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 1 Good", 4],
      ["Act 1 Magic C", 25],
    ],
  },
  "Act 2 Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 2 Good", 4],
      ["Act 2 Magic A", 25],
    ],
  },
  "Act 2 Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 2 Good", 4],
      ["Act 2 Magic B", 25],
    ],
  },
  "Act 2 Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 3 Good", 4],
      ["Act 2 Magic C", 25],
    ],
  },
  "Act 3 Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 3 Good", 4],
      ["Act 3 Magic A", 25],
    ],
  },
  "Act 3 Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 3 Good", 4],
      ["Act 3 Magic B", 25],
    ],
  },
  "Act 3 Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 3 Good", 4],
      ["Act 3 Magic C", 25],
    ],
  },
  "Act 4 Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 4 Good", 4],
      ["Act 4 Magic A", 25],
    ],
  },
  "Act 4 Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 4 Good", 4],
      ["Act 4 Magic B", 25],
    ],
  },
  "Act 5 Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 5 Good", 4],
      ["Act 5 Magic A", 25],
    ],
  },
  "Act 5 Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 5 Good", 4],
      ["Act 5 Magic B", 25],
    ],
  },
  "Act 5 Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 5 Good", 4],
      ["Act 5 Magic C", 25],
    ],
  },
  "Act 1 (N) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 1 (N) Good", 4],
      ["Act 1 (N) Magic A", 25],
    ],
  },
  "Act 1 (N) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 1 (N) Good", 4],
      ["Act 1 (N) Magic B", 25],
    ],
  },
  "Act 1 (N) Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 1 (N) Good", 4],
      ["Act 1 (N) Magic B", 25],
    ],
  },
  "Act 2 (N) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 2 (N) Good", 4],
      ["Act 2 (N) Magic A", 25],
    ],
  },
  "Act 2 (N) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 2 (N) Good", 4],
      ["Act 2 (N) Magic B", 25],
    ],
  },
  "Act 2 (N) Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 2 (N) Good", 4],
      ["Act 2 (N) Magic B", 25],
    ],
  },
  "Act 3 (N) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 3 (N) Good", 4],
      ["Act 3 (N) Magic A", 25],
    ],
  },
  "Act 3 (N) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 3 (N) Good", 4],
      ["Act 3 (N) Magic B", 25],
    ],
  },
  "Act 3 (N) Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 3 (N) Good", 4],
      ["Act 3 (N) Magic B", 25],
    ],
  },
  "Act 4 (N) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 4 (N) Good", 4],
      ["Act 4 (N) Magic A", 25],
    ],
  },
  "Act 4 (N) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 4 (N) Good", 4],
      ["Act 4 (N) Magic B", 25],
    ],
  },
  "Act 5 (N) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 5 (N) Good", 4],
      ["Act 5 (N) Magic A", 25],
    ],
  },
  "Act 5 (N) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 5 (N) Good", 4],
      ["Act 5 (N) Magic B", 25],
    ],
  },
  "Act 5 (N) Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 5 (N) Good", 4],
      ["Act 5 (N) Magic C", 25],
    ],
  },
  "Act 1 (H) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 1 (H) Good", 4],
      ["Act 1 (H) Magic A", 25],
    ],
  },
  "Act 1 (H) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 1 (H) Good", 4],
      ["Act 1 (H) Magic B", 25],
    ],
  },
  "Act 1 (H) Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 1 (H) Good", 4],
      ["Act 1 (H) Magic B", 25],
    ],
  },
  "Act 2 (H) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 2 (H) Good", 4],
      ["Act 2 (H) Magic A", 25],
    ],
  },
  "Act 2 (H) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 2 (H) Good", 4],
      ["Act 2 (H) Magic B", 25],
    ],
  },
  "Act 2 (H) Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 2 (H) Good", 4],
      ["Act 2 (H) Magic B", 25],
    ],
  },
  "Act 3 (H) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 3 (H) Good", 4],
      ["Act 3 (H) Magic A", 25],
    ],
  },
  "Act 3 (H) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 3 (H) Good", 4],
      ["Act 3 (H) Magic B", 25],
    ],
  },
  "Act 3 (H) Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 3 (H) Good", 4],
      ["Act 3 (H) Magic B", 25],
    ],
  },
  "Act 4 (H) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 4 (H) Good", 4],
      ["Act 4 (H) Magic A", 25],
    ],
  },
  "Act 4 (H) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 4 (H) Good", 4],
      ["Act 4 (H) Magic B", 25],
    ],
  },
  "Act 5 (H) Wraith A": {
    nodrop: 75,
    tcs: [
      ["Act 5 (H) Good", 4],
      ["Act 5 (H) Magic A", 25],
    ],
  },
  "Act 5 (H) Wraith B": {
    nodrop: 75,
    tcs: [
      ["Act 5 (H) Good", 4],
      ["Act 5 (H) Magic B", 25],
    ],
  },
  "Act 5 (H) Wraith C": {
    nodrop: 75,
    tcs: [
      ["Act 5 (H) Good", 4],
      ["Act 5 (H) Magic C", 25],
    ],
  },
  "Act 1 Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 Equip A", 37],
      ["Act 1 Good", 3],
    ],
  },
  "Act 1 Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 Equip B", 37],
      ["Act 1 Good", 3],
    ],
  },
  "Act 1 Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 Equip C", 37],
      ["Act 1 Good", 3],
    ],
  },
  "Act 2 Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 Equip A", 37],
      ["Act 2 Good", 3],
    ],
  },
  "Act 2 Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 Equip B", 37],
      ["Act 2 Good", 3],
    ],
  },
  "Act 2 Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 Equip C", 37],
      ["Act 3 Good", 3],
    ],
  },
  "Act 3 Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 Equip A", 37],
      ["Act 3 Good", 3],
    ],
  },
  "Act 3 Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 Equip B", 37],
      ["Act 3 Good", 3],
    ],
  },
  "Act 3 Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 Equip C", 37],
      ["Act 3 Good", 3],
    ],
  },
  "Act 4 Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 4 Equip A", 37],
      ["Act 4 Good", 3],
    ],
  },
  "Act 4 Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 4 Equip B", 37],
      ["Act 4 Good", 3],
    ],
  },
  "Act 5 Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 Equip A", 37],
      ["Act 5 Good", 3],
    ],
  },
  "Act 5 Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 Equip B", 37],
      ["Act 5 Good", 3],
    ],
  },
  "Act 5 Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 Equip C", 37],
      ["Act 5 Good", 3],
    ],
  },
  "Act 1 (N) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 (N) Equip A", 37],
      ["Act 1 (N) Good", 3],
    ],
  },
  "Act 1 (N) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 (N) Equip B", 37],
      ["Act 1 (N) Good", 3],
    ],
  },
  "Act 1 (N) Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 (N) Equip B", 37],
      ["Act 1 (N) Good", 3],
    ],
  },
  "Act 2 (N) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 (N) Equip A", 37],
      ["Act 2 (N) Good", 3],
    ],
  },
  "Act 2 (N) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 (N) Equip B", 37],
      ["Act 2 (N) Good", 3],
    ],
  },
  "Act 2 (N) Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 (N) Equip B", 37],
      ["Act 2 (N) Good", 3],
    ],
  },
  "Act 3 (N) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 (N) Equip A", 37],
      ["Act 3 (N) Good", 3],
    ],
  },
  "Act 3 (N) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 (N) Equip B", 37],
      ["Act 3 (N) Good", 3],
    ],
  },
  "Act 3 (N) Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 (N) Equip B", 37],
      ["Act 3 (N) Good", 3],
    ],
  },
  "Act 4 (N) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 4 (N) Equip A", 37],
      ["Act 4 (N) Good", 3],
    ],
  },
  "Act 4 (N) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 4 (N) Equip B", 37],
      ["Act 4 (N) Good", 3],
    ],
  },
  "Act 5 (N) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 (N) Equip A", 37],
      ["Act 5 (N) Good", 3],
    ],
  },
  "Act 5 (N) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 (N) Equip B", 37],
      ["Act 5 (N) Good", 3],
    ],
  },
  "Act 5 (N) Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 (N) Equip C", 37],
      ["Act 5 (N) Good", 3],
    ],
  },
  "Act 1 (H) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 (H) Equip A", 37],
      ["Act 1 (H) Good", 3],
    ],
  },
  "Act 1 (H) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 (H) Equip B", 37],
      ["Act 1 (H) Good", 3],
    ],
  },
  "Act 1 (H) Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 1 (H) Equip B", 37],
      ["Act 1 (H) Good", 3],
    ],
  },
  "Act 2 (H) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 (H) Equip A", 37],
      ["Act 2 (H) Good", 3],
    ],
  },
  "Act 2 (H) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 (H) Equip B", 37],
      ["Act 2 (H) Good", 3],
    ],
  },
  "Act 2 (H) Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 2 (H) Equip B", 37],
      ["Act 2 (H) Good", 3],
    ],
  },
  "Act 3 (H) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 (H) Equip A", 37],
      ["Act 3 (H) Good", 3],
    ],
  },
  "Act 3 (H) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 (H) Equip B", 37],
      ["Act 3 (H) Good", 3],
    ],
  },
  "Act 3 (H) Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 3 (H) Equip B", 37],
      ["Act 3 (H) Good", 3],
    ],
  },
  "Act 4 (H) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 4 (H) Equip A", 37],
      ["Act 4 (H) Good", 3],
    ],
  },
  "Act 4 (H) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 4 (H) Equip B", 37],
      ["Act 4 (H) Good", 3],
    ],
  },
  "Act 5 (H) Citem A": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 (H) Equip A", 37],
      ["Act 5 (H) Good", 3],
    ],
  },
  "Act 5 (H) Citem B": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 (H) Equip B", 37],
      ["Act 5 (H) Good", 3],
    ],
  },
  "Act 5 (H) Citem C": {
    nodrop: 0,
    tcs: [
      ["gld,mul=1280", 60],
      ["Act 5 (H) Equip C", 37],
      ["Act 5 (H) Good", 3],
    ],
  },
  "Act 1 Cpot A": { nodrop: 0, tcs: [["Hpotion 1", 1]] },
  "Act 1 Cpot B": { nodrop: 0, tcs: [["Hpotion 1", 1]] },
  "Act 1 Cpot C": { nodrop: 0, tcs: [["Hpotion 1", 1]] },
  "Act 2 Cpot A": { nodrop: 0, tcs: [["Hpotion 2", 1]] },
  "Act 2 Cpot B": { nodrop: 0, tcs: [["Hpotion 2", 1]] },
  "Act 2 Cpot C": { nodrop: 0, tcs: [["Hpotion 2", 1]] },
  "Act 3 Cpot A": { nodrop: 0, tcs: [["Hpotion 3", 1]] },
  "Act 3 Cpot B": { nodrop: 0, tcs: [["Hpotion 3", 1]] },
  "Act 3 Cpot C": { nodrop: 0, tcs: [["Hpotion 3", 1]] },
  "Act 4 Cpot A": {
    nodrop: 0,
    tcs: [
      ["Hpotion 3", 1],
      ["Hpotion 4", 2],
    ],
  },
  "Act 4 Cpot B": {
    nodrop: 0,
    tcs: [
      ["Hpotion 3", 1],
      ["Hpotion 4", 2],
    ],
  },
  "Act 5 Cpot A": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
    ],
  },
  "Act 5 Cpot B": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
    ],
  },
  "Act 5 Cpot C": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
    ],
  },
  "Act 1 (N) Cpot A": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
      ["Hpotion 6", 4],
    ],
  },
  "Act 1 (N) Cpot B": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
      ["Hpotion 6", 4],
    ],
  },
  "Act 1 (N) Cpot C": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
      ["Hpotion 6", 4],
    ],
  },
  "Act 2 (N) Cpot A": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
      ["Hpotion 6", 4],
    ],
  },
  "Act 2 (N) Cpot B": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
      ["Hpotion 6", 4],
    ],
  },
  "Act 2 (N) Cpot C": {
    nodrop: 0,
    tcs: [
      ["Hpotion 4", 1],
      ["Hpotion 5", 2],
      ["Hpotion 6", 4],
    ],
  },
  "Act 3 (N) Cpot A": {
    nodrop: 0,
    tcs: [
      ["rvs", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 3 (N) Cpot B": {
    nodrop: 0,
    tcs: [
      ["rvs", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 3 (N) Cpot C": {
    nodrop: 0,
    tcs: [
      ["rvs", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 4 (N) Cpot A": {
    nodrop: 0,
    tcs: [
      ["rvs", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 4 (N) Cpot B": {
    nodrop: 0,
    tcs: [
      ["rvs", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 5 (N) Cpot A": {
    nodrop: 0,
    tcs: [
      ["rvs", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 5 (N) Cpot B": {
    nodrop: 0,
    tcs: [
      ["rvs", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 5 (N) Cpot C": {
    nodrop: 0,
    tcs: [
      ["rvs", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 1 (H) Cpot A": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 1 (H) Cpot B": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 1 (H) Cpot C": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 2 (H) Cpot A": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 2 (H) Cpot B": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 2 (H) Cpot C": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 3 (H) Cpot A": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 3 (H) Cpot B": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 3 (H) Cpot C": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 4 (H) Cpot A": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 4 (H) Cpot B": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 5 (H) Cpot A": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 5 (H) Cpot B": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 5 (H) Cpot C": {
    nodrop: 0,
    tcs: [
      ["rvl", 1],
      ["Hpotion 4", 2],
      ["Hpotion 5", 4],
      ["Hpotion 6", 8],
    ],
  },
  "Act 1 Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 1 Citem A", 1],
      ["Act 1 Cpot A", 2],
    ],
  },
  "Act 1 Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 1 Citem B", 1],
      ["Act 1 Cpot B", 1],
    ],
  },
  "Act 1 Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 1 Citem C", 1],
      ["Act 1 Cpot C", 1],
    ],
  },
  "Act 2 Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 2 Citem A", 1],
      ["Act 2 Cpot A", 1],
    ],
  },
  "Act 2 Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 2 Citem B", 1],
      ["Act 2 Cpot B", 1],
    ],
  },
  "Act 2 Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 2 Citem C", 1],
      ["Act 2 Cpot C", 1],
    ],
  },
  "Act 3 Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 3 Citem A", 1],
      ["Act 3 Cpot A", 1],
    ],
  },
  "Act 3 Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 3 Citem B", 1],
      ["Act 3 Cpot B", 1],
    ],
  },
  "Act 3 Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 3 Citem C", 1],
      ["Act 3 Cpot C", 1],
    ],
  },
  "Act 4 Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 4 Citem A", 1],
      ["Act 4 Cpot A", 1],
    ],
  },
  "Act 4 Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 4 Citem B", 1],
      ["Act 4 Cpot B", 1],
    ],
  },
  "Act 5 Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 5 Citem A", 1],
      ["Act 5 Cpot A", 1],
    ],
  },
  "Act 5 Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 5 Citem B", 1],
      ["Act 5 Cpot B", 1],
    ],
  },
  "Act 5 Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 5 Citem C", 1],
      ["Act 5 Cpot C", 1],
    ],
  },
  "Act 1 (N) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Citem A", 1],
      ["Act 1 (N) Cpot A", 2],
    ],
  },
  "Act 1 (N) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Citem B", 1],
      ["Act 1 (N) Cpot B", 2],
    ],
  },
  "Act 1 (N) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Citem C", 1],
      ["Act 1 (N) Cpot C", 2],
    ],
  },
  "Act 2 (N) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Citem A", 1],
      ["Act 2 (N) Cpot A", 2],
    ],
  },
  "Act 2 (N) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Citem B", 1],
      ["Act 2 (N) Cpot B", 2],
    ],
  },
  "Act 2 (N) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Citem C", 1],
      ["Act 2 (N) Cpot C", 2],
    ],
  },
  "Act 3 (N) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Citem A", 1],
      ["Act 3 (N) Cpot A", 2],
    ],
  },
  "Act 3 (N) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Citem B", 1],
      ["Act 3 (N) Cpot B", 2],
    ],
  },
  "Act 3 (N) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Citem C", 1],
      ["Act 3 (N) Cpot C", 2],
    ],
  },
  "Act 4 (N) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Citem A", 1],
      ["Act 4 (N) Cpot A", 2],
    ],
  },
  "Act 4 (N) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Citem B", 1],
      ["Act 4 (N) Cpot B", 2],
    ],
  },
  "Act 4 (N) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Citem B", 1],
      ["Act 4 (N) Cpot B", 2],
    ],
  },
  "Act 5 (N) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Citem A", 1],
      ["Act 5 (N) Cpot A", 2],
    ],
  },
  "Act 5 (N) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Citem B", 1],
      ["Act 5 (N) Cpot B", 2],
    ],
  },
  "Act 5 (N) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Citem C", 1],
      ["Act 5 (N) Cpot C", 2],
    ],
  },
  "Act 1 (H) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Citem A", 1],
      ["Act 1 (H) Cpot A", 3],
    ],
  },
  "Act 1 (H) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Citem B", 1],
      ["Act 1 (H) Cpot B", 3],
    ],
  },
  "Act 1 (H) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Citem C", 1],
      ["Act 1 (H) Cpot C", 3],
    ],
  },
  "Act 2 (H) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Citem A", 1],
      ["Act 2 (H) Cpot A", 3],
    ],
  },
  "Act 2 (H) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Citem B", 1],
      ["Act 2 (H) Cpot B", 3],
    ],
  },
  "Act 2 (H) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Citem C", 1],
      ["Act 2 (H) Cpot C", 3],
    ],
  },
  "Act 3 (H) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Citem A", 1],
      ["Act 3 (H) Cpot A", 3],
    ],
  },
  "Act 3 (H) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Citem B", 1],
      ["Act 3 (H) Cpot B", 3],
    ],
  },
  "Act 3 (H) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Citem C", 1],
      ["Act 3 (H) Cpot C", 3],
    ],
  },
  "Act 4 (H) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Citem A", 1],
      ["Act 4 (H) Cpot A", 3],
    ],
  },
  "Act 4 (H) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Citem B", 1],
      ["Act 4 (H) Cpot B", 3],
    ],
  },
  "Act 5 (H) Champ A": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Citem A", 1],
      ["Act 5 (H) Cpot A", 3],
    ],
  },
  "Act 5 (H) Champ B": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Citem B", 1],
      ["Act 5 (H) Cpot B", 3],
    ],
  },
  "Act 5 (H) Champ C": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Citem C", 1],
      ["Act 5 (H) Cpot C", 3],
    ],
  },
  "Act 1 Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 1 Equip A", 58],
      ["Act 1 Good", 4],
    ],
  },
  "Act 1 Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 1 Equip B", 58],
      ["Act 1 Good", 4],
    ],
  },
  "Act 1 Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 1 Equip C", 58],
      ["Act 1 Good", 4],
    ],
  },
  "Act 2 Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 2 Equip A", 58],
      ["Act 2 Good", 4],
    ],
  },
  "Act 2 Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 2 Equip B", 58],
      ["Act 2 Good", 4],
    ],
  },
  "Act 2 Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 2 Equip C", 58],
      ["Act 3 Good", 4],
    ],
  },
  "Act 3 Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 3 Equip A", 58],
      ["Act 3 Good", 4],
    ],
  },
  "Act 3 Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 3 Equip B", 58],
      ["Act 3 Good", 4],
    ],
  },
  "Act 3 Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 3 Equip C", 58],
      ["Act 3 Good", 4],
    ],
  },
  "Act 4 Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 4 Equip A", 58],
      ["Act 4 Good", 4],
    ],
  },
  "Act 4 Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 4 Equip B", 58],
      ["Act 4 Good", 4],
    ],
  },
  "Act 5 Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 5 Equip A", 58],
      ["Act 5 Good", 4],
    ],
  },
  "Act 5 Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 5 Equip B", 58],
      ["Act 5 Good", 4],
    ],
  },
  "Act 5 Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 5 Equip C", 58],
      ["Act 5 Good", 4],
    ],
  },
  "Act 1 (N) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Equip A", 58],
      ["Act 1 (N) Good", 4],
    ],
  },
  "Act 1 (N) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Equip B", 58],
      ["Act 1 (N) Good", 4],
    ],
  },
  "Act 1 (N) Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Equip B", 58],
      ["Act 1 (N) Good", 4],
    ],
  },
  "Act 2 (N) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Equip A", 58],
      ["Act 2 (N) Good", 4],
    ],
  },
  "Act 2 (N) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Equip B", 58],
      ["Act 2 (N) Good", 4],
    ],
  },
  "Act 2 (N) Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Equip B", 58],
      ["Act 2 (N) Good", 4],
    ],
  },
  "Act 3 (N) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Equip A", 58],
      ["Act 3 (N) Good", 4],
    ],
  },
  "Act 3 (N) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Equip B", 58],
      ["Act 3 (N) Good", 4],
    ],
  },
  "Act 3 (N) Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Equip B", 58],
      ["Act 3 (N) Good", 4],
    ],
  },
  "Act 4 (N) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Equip A", 58],
      ["Act 4 (N) Good", 4],
    ],
  },
  "Act 4 (N) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Equip B", 58],
      ["Act 4 (N) Good", 4],
    ],
  },
  "Act 5 (N) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Equip A", 58],
      ["Act 5 (N) Good", 4],
    ],
  },
  "Act 5 (N) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Equip B", 58],
      ["Act 5 (N) Good", 4],
    ],
  },
  "Act 5 (N) Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Equip C", 58],
      ["Act 5 (N) Good", 4],
    ],
  },
  "Act 1 (H) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Equip A", 58],
      ["Act 1 (H) Good", 4],
    ],
  },
  "Act 1 (H) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Equip B", 58],
      ["Act 1 (H) Good", 4],
    ],
  },
  "Act 1 (H) Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Equip B", 58],
      ["Act 1 (H) Good", 4],
    ],
  },
  "Act 2 (H) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Equip A", 58],
      ["Act 2 (H) Good", 4],
    ],
  },
  "Act 2 (H) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Equip B", 58],
      ["Act 2 (H) Good", 4],
    ],
  },
  "Act 2 (H) Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Equip B", 58],
      ["Act 2 (H) Good", 4],
    ],
  },
  "Act 3 (H) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Equip A", 58],
      ["Act 3 (H) Good", 4],
    ],
  },
  "Act 3 (H) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Equip B", 58],
      ["Act 3 (H) Good", 4],
    ],
  },
  "Act 3 (H) Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Equip B", 58],
      ["Act 3 (H) Good", 4],
    ],
  },
  "Act 4 (H) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Equip A", 58],
      ["Act 4 (H) Good", 4],
    ],
  },
  "Act 4 (H) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Equip B", 58],
      ["Act 4 (H) Good", 4],
    ],
  },
  "Act 5 (H) Uitem A": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Equip A", 58],
      ["Act 5 (H) Good", 4],
    ],
  },
  "Act 5 (H) Uitem B": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Equip B", 58],
      ["Act 5 (H) Good", 4],
    ],
  },
  "Act 5 (H) Uitem C": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Equip C", 58],
      ["Act 5 (H) Good", 4],
    ],
  },
  "Act 1 Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem A", 1],
      ["Act 1 Cpot A", 2],
    ],
  },
  "Act 1 Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem B", 1],
      ["Act 1 Cpot B", 2],
    ],
  },
  "Act 1 Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem C", 1],
      ["Act 1 Cpot C", 2],
    ],
  },
  "Act 2 Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem A", 1],
      ["Act 2 Cpot A", 2],
    ],
  },
  "Act 2 Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem B", 1],
      ["Act 2 Cpot B", 2],
    ],
  },
  "Act 2 Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem C", 1],
      ["Act 2 Cpot C", 2],
    ],
  },
  "Act 3 Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem A", 1],
      ["Act 3 Cpot A", 2],
    ],
  },
  "Act 3 Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem B", 1],
      ["Act 3 Cpot B", 2],
    ],
  },
  "Act 3 Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem C", 1],
      ["Act 3 Cpot C", 2],
    ],
  },
  "Act 4 Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 4 Uitem A", 1],
      ["Act 4 Cpot A", 2],
    ],
  },
  "Act 4 Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 4 Uitem B", 1],
      ["Act 4 Cpot B", 2],
    ],
  },
  "Act 5 Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem A", 1],
      ["Act 5 Cpot A", 2],
    ],
  },
  "Act 5 Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem B", 1],
      ["Act 5 Cpot B", 2],
    ],
  },
  "Act 5 Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem C", 1],
      ["Act 5 Cpot C", 2],
    ],
  },
  "Act 1 (N) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem A", 1],
      ["Act 1 (N) Cpot A", 2],
    ],
  },
  "Act 1 (N) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem B", 1],
      ["Act 1 (N) Cpot B", 2],
    ],
  },
  "Act 1 (N) Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem C", 1],
      ["Act 1 (N) Cpot C", 2],
    ],
  },
  "Act 2 (N) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem A", 1],
      ["Act 2 (N) Cpot A", 2],
    ],
  },
  "Act 2 (N) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem B", 1],
      ["Act 2 (N) Cpot B", 2],
    ],
  },
  "Act 2 (N) Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem C", 1],
      ["Act 2 (N) Cpot C", 2],
    ],
  },
  "Act 3 (N) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem A", 1],
      ["Act 3 (N) Cpot A", 2],
    ],
  },
  "Act 3 (N) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem B", 1],
      ["Act 3 (N) Cpot B", 2],
    ],
  },
  "Act 3 (N) Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem C", 1],
      ["Act 3 (N) Cpot C", 2],
    ],
  },
  "Act 4 (N) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Uitem A", 1],
      ["Act 4 (N) Cpot A", 2],
    ],
  },
  "Act 4 (N) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Uitem B", 1],
      ["Act 4 (N) Cpot B", 2],
    ],
  },
  "Act 5 (N) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem A", 1],
      ["Act 5 (N) Cpot A", 2],
    ],
  },
  "Act 5 (N) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem B", 1],
      ["Act 5 (N) Cpot B", 2],
    ],
  },
  "Act 5 (N) Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem C", 1],
      ["Act 5 (N) Cpot C", 2],
    ],
  },
  "Act 1 (H) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem A", 1],
      ["Act 1 (H) Cpot A", 2],
    ],
  },
  "Act 1 (H) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem B", 1],
      ["Act 1 (H) Cpot B", 2],
    ],
  },
  "Act 1 (H) Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 1],
      ["Act 1 (H) Cpot C", 2],
    ],
  },
  "Act 2 (H) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem A", 1],
      ["Act 2 (H) Cpot A", 2],
    ],
  },
  "Act 2 (H) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem B", 1],
      ["Act 2 (H) Cpot B", 2],
    ],
  },
  "Act 2 (H) Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem C", 1],
      ["Act 2 (H) Cpot C", 2],
    ],
  },
  "Act 3 (H) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem A", 1],
      ["Act 3 (H) Cpot A", 2],
    ],
  },
  "Act 3 (H) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem B", 1],
      ["Act 3 (H) Cpot B", 2],
    ],
  },
  "Act 3 (H) Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem C", 1],
      ["Act 3 (H) Cpot C", 2],
    ],
  },
  "Act 4 (H) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Uitem A", 1],
      ["Act 4 (H) Cpot A", 2],
    ],
  },
  "Act 4 (H) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Uitem B", 1],
      ["Act 4 (H) Cpot B", 2],
    ],
  },
  "Act 5 (H) Unique A": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem A", 1],
      ["Act 5 (H) Cpot A", 2],
    ],
  },
  "Act 5 (H) Unique B": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem B", 1],
      ["Act 5 (H) Cpot B", 2],
    ],
  },
  "Act 5 (H) Unique C": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem C", 1],
      ["Act 5 (H) Cpot C", 2],
    ],
  },
  "Quill 1": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 Junk", 19],
    ],
  },
  "Quill 2": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 Junk", 19],
    ],
  },
  "Quill 3": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 Junk", 19],
      ["Act 1 Good", 1],
    ],
  },
  "Quill 4": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 Junk", 19],
      ["Act 1 Good", 1],
    ],
  },
  "Quill 5": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 3 Junk", 19],
      ["Act 3 Good", 1],
    ],
  },
  "Quill 1 (N)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 (N) Junk", 19],
    ],
  },
  "Quill 2 (N)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 (N) Junk", 19],
      ["Act 1 (N) Good", 1],
    ],
  },
  "Quill 3 (N)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 (N) Junk", 19],
      ["Act 1 (N) Good", 1],
    ],
  },
  "Quill 4 (N)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 (N) Junk", 19],
      ["Act 1 (N) Good", 1],
    ],
  },
  "Quill 5 (N)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 3 (N) Junk", 19],
      ["Act 3 (N) Good", 1],
    ],
  },
  "Quill 1 (H)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 (H) Junk", 19],
    ],
  },
  "Quill 2 (H)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 (H) Junk", 19],
      ["Act 1 (H) Good", 3],
    ],
  },
  "Quill 3 (H)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 (H) Junk", 19],
      ["Act 1 (H) Good", 3],
    ],
  },
  "Quill 4 (H)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 1 (H) Junk", 19],
      ["Act 1 (H) Good", 3],
    ],
  },
  "Quill 5 (H)": {
    nodrop: 125,
    tcs: [
      ["gld", 19],
      ["Act 3 (H) Junk", 19],
      ["Act 3 (H) Good", 3],
    ],
  },
  "Swarm 1": {
    nodrop: 125,
    tcs: [
      ["Potion 2", 12],
      ["Misc 1", 6],
      ["Act 2 Good", 1],
      ["Act 2 Magic A", 6],
    ],
  },
  "Swarm 2": {
    nodrop: 125,
    tcs: [
      ["Potion 3", 12],
      ["Misc 2", 6],
      ["Act 3 Good", 1],
      ["Act 3 Magic A", 6],
    ],
  },
  "Swarm 1 (N)": {
    nodrop: 125,
    tcs: [
      ["Potion 6", 12],
      ["Misc 2", 6],
      ["Act 2 (N) Good", 1],
      ["Act 2 (N) Magic A", 6],
    ],
  },
  "Swarm 2 (N)": {
    nodrop: 125,
    tcs: [
      ["Potion 6", 12],
      ["Misc 2", 6],
      ["Act 3 (N) Good", 1],
      ["Act 3 (N) Magic A", 6],
    ],
  },
  "Swarm 1 (H)": {
    nodrop: 125,
    tcs: [
      ["Potion 6", 12],
      ["Misc 2", 6],
      ["Act 2 (H) Good", 1],
      ["Act 2 (H) Magic A", 6],
    ],
  },
  "Swarm 2 (H)": {
    nodrop: 125,
    tcs: [
      ["Potion 6", 12],
      ["Misc 2", 6],
      ["Act 3 (H) Good", 1],
      ["Act 3 (H) Magic A", 6],
    ],
  },
  Andariel: {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 11],
      ["Act 2 Equip A", 19],
      ["Act 2 Junk", 15],
      ["Act 2 Good", 3],
    ],
  },
  "Andariel (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 11],
      ["Act 2 (N) Equip A", 19],
      ["Act 2 (N) Junk", 15],
      ["Act 2 (N) Good", 3],
    ],
  },
  "Andariel (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 11],
      ["Act 2 (H) Equip A", 19],
      ["Act 2 (H) Junk", 15],
      ["Act 2 (H) Good", 3],
      ["tes", 1],
    ],
  },
  Andarielq: {
    nodrop: 19,
    tcs: [
      ["Act 2 Equip A", 19],
      ["Act 2 Good", 3],
    ],
  },
  "Andarielq (N)": {
    nodrop: 19,
    tcs: [
      ["Act 2 (N) Equip A", 19],
      ["Act 2 (N) Good", 3],
    ],
  },
  "Andarielq (H)": {
    nodrop: 19,
    tcs: [
      ["Act 2 (H) Equip A", 19],
      ["Act 2 (H) Good", 3],
      ["tes", 1],
    ],
  },
  "Duriel - Base": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 11],
      ["Act 3 Equip A", 19],
      ["Act 3 Junk", 15],
      ["Act 3 Good", 3],
    ],
  },
  "Duriel (N) - Base": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 11],
      ["Act 3 (N) Equip A", 19],
      ["Act 3 (N) Junk", 15],
      ["Act 3 (N) Good", 3],
    ],
  },
  "Duriel (H) - Base": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 11],
      ["Act 3 (H) Equip A", 19],
      ["Act 3 (H) Junk", 15],
      ["Act 3 (H) Good", 3],
      ["tes", 2],
    ],
  },
  "Durielq - Base": {
    nodrop: 19,
    tcs: [
      ["Act 3 Equip A", 19],
      ["Act 3 Good", 3],
    ],
  },
  "Durielq (N) - Base": {
    nodrop: 19,
    tcs: [
      ["Act 3 (N) Equip A", 19],
      ["Act 3 (N) Good", 3],
    ],
  },
  "Durielq (H) - Base": {
    nodrop: 19,
    tcs: [
      ["Act 3 (H) Equip A", 19],
      ["Act 3 (H) Good", 3],
      ["tes", 2],
    ],
  },
  Radament: {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 11],
      ["Act 3 Equip B", 19],
      ["Act 3 Junk", 15],
      ["Act 3 Good", 3],
    ],
  },
  "Radament (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 11],
      ["Act 3 (N) Equip B", 19],
      ["Act 3 (N) Junk", 15],
      ["Act 3 (N) Good", 3],
    ],
  },
  "Radament (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 11],
      ["Act 3 (H) Equip C", 19],
      ["Act 3 (H) Junk", 15],
      ["Act 3 (H) Good", 3],
    ],
  },
  "Flying Scimitar": {
    nodrop: 100,
    tcs: [
      ["Act 2 Good", 3],
      ["scm", 57],
    ],
  },
  "Flying Scimitar (N)": {
    nodrop: 100,
    tcs: [
      ["Act 2 (N) Good", 3],
      ["scm", 25],
      ["9sm", 32],
    ],
  },
  "Flying Scimitar (H)": {
    nodrop: 100,
    tcs: [
      ["Act 2 (H) Good", 3],
      ["scm", 7],
      ["9sm", 18],
      ["7sm", 32],
    ],
  },
  Mephisto: {
    nodrop: 15,
    tcs: [
      ["gld,mul=1280", 5],
      ["Act 4 Equip A", 52],
      ["Act 4 Junk", 5],
      ["Act 4 Good", 3],
    ],
  },
  "Mephisto (N)": {
    nodrop: 15,
    tcs: [
      ["gld,mul=1536", 5],
      ["Act 4 (N) Equip A", 52],
      ["Act 4 (N) Junk", 5],
      ["Act 4 (N) Good", 3],
    ],
  },
  "Mephisto (H)": {
    nodrop: 15,
    tcs: [
      ["gld,mul=2048", 5],
      ["Act 4 (H) Equip A", 52],
      ["Act 4 (H) Junk", 5],
      ["Act 4 (H) Good", 3],
      ["ceh", 1],
    ],
  },
  Mephistoq: {
    nodrop: 15,
    tcs: [
      ["Act 4 Equip A", 52],
      ["Act 4 Good", 3],
    ],
  },
  "Mephistoq (N)": {
    nodrop: 15,
    tcs: [
      ["Act 4 (N) Equip A", 52],
      ["Act 4 (N) Good", 3],
    ],
  },
  "Mephistoq (H)": {
    nodrop: 15,
    tcs: [
      ["Act 4 (H) Equip A", 52],
      ["Act 4 (H) Good", 3],
      ["ceh", 1],
    ],
  },
  Diablo: {
    nodrop: 15,
    tcs: [
      ["gld,mul=1280", 5],
      ["Act 5 Equip A", 52],
      ["Act 5 Junk", 5],
      ["Act 5 Good", 3],
    ],
  },
  "Diablo (N)": {
    nodrop: 15,
    tcs: [
      ["gld,mul=1536", 5],
      ["Act 5 (N) Equip A", 52],
      ["Act 5 (N) Junk", 5],
      ["Act 5 (N) Good", 3],
    ],
  },
  "Diablo (H)": {
    nodrop: 15,
    tcs: [
      ["gld,mul=2048", 5],
      ["Act 5 (H) Equip A", 52],
      ["Act 5 (H) Junk", 5],
      ["Act 5 (H) Good", 3],
      ["bet", 1],
    ],
  },
  Diabloq: {
    nodrop: 15,
    tcs: [
      ["Act 5 Equip A", 52],
      ["Act 5 Good", 3],
    ],
  },
  "Diabloq (N)": {
    nodrop: 15,
    tcs: [
      ["Act 5 (N) Equip A", 52],
      ["Act 5 (N) Good", 3],
    ],
  },
  "Diabloq (H)": {
    nodrop: 15,
    tcs: [
      ["Act 5 (H) Equip A", 52],
      ["Act 5 (H) Good", 3],
      ["bet", 1],
    ],
  },
  Summoner: {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 9],
      ["Act 2 Equip C", 15],
      ["Act 3 Junk", 5],
      ["Act 2 Good", 3],
      ["Act 3 Magic A", 4],
    ],
  },
  "Summoner (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 9],
      ["Act 2 (N) Equip C", 15],
      ["Act 3 (N) Junk", 5],
      ["Act 2 (N) Good", 3],
      ["Act 3 (N) Magic A", 4],
    ],
  },
  "Summoner (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 9],
      ["Act 2 (H) Equip C", 15],
      ["Act 3 (H) Junk", 5],
      ["Act 2 (H) Good", 3],
      ["Act 3 (H) Magic A", 4],
      ["pk2", 1],
    ],
  },
  Council: {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 9],
      ["Act 4 Equip A", 15],
      ["Act 4 Junk", 5],
      ["Act 4 Good", 3],
      ["Act 4 Magic A", 4],
    ],
  },
  "Council (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 9],
      ["Act 4 (N) Equip A", 15],
      ["Act 4 (N) Junk", 5],
      ["Act 4 (N) Good", 3],
      ["Act 4 (N) Magic A", 4],
    ],
  },
  "Council (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 9],
      ["Act 4 (H) Equip A", 15],
      ["Act 4 (H) Junk", 5],
      ["Act 4 (H) Good", 3],
      ["Act 4 (H) Magic A", 4],
    ],
  },
  Griswold: {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem C", 1],
      ["Act 1 Melee B", 2],
    ],
  },
  "Griswold (N)": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 1],
      ["Act 1 (N) Melee B", 2],
    ],
  },
  "Griswold (H)": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 1],
      ["Act 1 (H) Melee B", 2],
    ],
  },
  Cow: {
    nodrop: 100,
    tcs: [
      ["gld", 19],
      ["Act 5 Equip A", 19],
      ["Act 5 Junk", 19],
      ["Act 5 Good", 3],
    ],
  },
  "Cow (N)": {
    nodrop: 100,
    tcs: [
      ["gld", 19],
      ["Act 5 (N) Equip A", 19],
      ["Act 5 (N) Junk", 19],
      ["Act 5 (N) Good", 3],
    ],
  },
  "Cow (H)": {
    nodrop: 100,
    tcs: [
      ["gld", 19],
      ["Act 5 (H) Equip B", 19],
      ["Act 5 (H) Junk", 19],
      ["Act 5 (H) Good", 3],
    ],
  },
  "Trapped Soul": {
    nodrop: 100,
    tcs: [
      ["gld", 19],
      ["Act 4 Equip A", 8],
      ["Act 4 Junk", 33],
    ],
  },
  "Trapped Soul (N)": {
    nodrop: 100,
    tcs: [
      ["gld", 19],
      ["Act 4 (N) Equip A", 8],
      ["Act 4 (N) Junk", 33],
    ],
  },
  "Trapped Soul (H)": {
    nodrop: 100,
    tcs: [
      ["gld", 19],
      ["Act 4 (H) Equip A", 8],
      ["Act 4 (H) Junk", 33],
    ],
  },
  Haphesto: {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 14],
      ["Act 5 Equip A", 19],
      ["Act 5 Junk", 5],
      ["Act 5 Good", 3],
    ],
  },
  "Haphesto (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 14],
      ["Act 5 (N) Equip A", 19],
      ["Act 5 (N) Junk", 5],
      ["Act 5 (N) Good", 3],
    ],
  },
  "Haphesto (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 14],
      ["Act 5 (H) Equip A", 19],
      ["Act 5 (H) Junk", 5],
      ["Act 5 (H) Good", 3],
    ],
  },
  Nihlathak: {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 14],
      ["Act 5 Equip B", 19],
      ["Act 5 Junk", 5],
      ["Act 5 Good", 3],
    ],
  },
  "Nihlathak (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 14],
      ["Act 5 (N) Equip B", 19],
      ["Act 5 (N) Junk", 5],
      ["Act 5 (N) Good", 3],
    ],
  },
  "Nihlathak (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 14],
      ["Act 5 (H) Equip B", 19],
      ["Act 5 (H) Junk", 5],
      ["Act 5 (H) Good", 3],
      ["pk3", 1],
    ],
  },
  Baal: {
    nodrop: 15,
    tcs: [
      ["gld,mul=1280", 5],
      ["Act 1 (N) Equip A", 52],
      ["Act 1 (N) Junk", 5],
      ["Act 1 (N) Good", 3],
    ],
  },
  "Baal (N)": {
    nodrop: 15,
    tcs: [
      ["gld,mul=1536", 5],
      ["Act 1 (H) Equip A", 52],
      ["Act 1 (H) Junk", 5],
      ["Act 1 (H) Good", 3],
    ],
  },
  "Baal (H)": {
    nodrop: 15,
    tcs: [
      ["gld,mul=2048", 5],
      ["Act 5 (H) Equip B", 52],
      ["Act 5 (H) Junk", 5],
      ["Act 5 (H) Good", 3],
      ["fed", 1],
    ],
  },
  Baalq: {
    nodrop: 15,
    tcs: [
      ["Act 1 (N) Equip A", 52],
      ["Act 1 (N) Good", 3],
    ],
  },
  "Baalq (N)": {
    nodrop: 15,
    tcs: [
      ["Act 1 (H) Equip A", 52],
      ["Act 1 (H) Good", 3],
    ],
  },
  "Baalq (H)": {
    nodrop: 15,
    tcs: [
      ["Act 5 (H) Equip B", 52],
      ["Act 5 (H) Good", 3],
      ["fed", 1],
    ],
  },
  "Blood Raven": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 14],
      ["Act 1 Equip B", 19],
      ["Act 1 Junk", 5],
      ["Act 1 Good", 3],
    ],
  },
  "Blood Raven (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 14],
      ["Act 1 (N) Equip B", 19],
      ["Act 1 (N) Junk", 5],
      ["Act 1 (N) Good", 3],
    ],
  },
  "Blood Raven (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 14],
      ["Act 1 (H) Equip B", 19],
      ["Act 1 (H) Junk", 5],
      ["Act 1 (H) Good", 3],
    ],
  },
  Smith: {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem C", 1],
      ["Act 1 Melee B", 2],
    ],
  },
  "Smith (N)": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 1],
      ["Act 1 (N) Melee B", 2],
    ],
  },
  "Smith (H)": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 1],
      ["Act 1 (H) Melee B", 2],
    ],
  },
  Izual: {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 14],
      ["Act 4 Equip B", 19],
      ["Act 4 Junk", 5],
      ["Act 4 Good", 3],
    ],
  },
  "Izual (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 14],
      ["Act 4 (N) Equip B", 19],
      ["Act 4 (N) Junk", 5],
      ["Act 4 (N) Good", 3],
    ],
  },
  "Izual (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 14],
      ["Act 4 (H) Equip B", 19],
      ["Act 4 (H) Junk", 5],
      ["Act 4 (H) Good", 3],
    ],
  },
  "Act 1 Super A": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem A", 2],
      ["Act 1 Cpot A", 2],
    ],
  },
  "Act 1 Super B": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem B", 2],
      ["Act 1 Cpot B", 2],
    ],
  },
  "Act 1 Super C": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem C", 2],
      ["Act 1 Cpot C", 2],
    ],
  },
  "Act 2 Super A": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem A", 2],
      ["Act 2 Cpot A", 2],
    ],
  },
  "Act 2 Super B": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem B", 2],
      ["Act 2 Cpot B", 2],
    ],
  },
  "Act 2 Super C": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem C", 2],
      ["Act 2 Cpot C", 2],
    ],
  },
  "Act 3 Super A": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem A", 2],
      ["Act 3 Cpot A", 2],
    ],
  },
  "Act 3 Super B": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem B", 2],
      ["Act 3 Cpot B", 2],
    ],
  },
  "Act 3 Super C": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem C", 2],
      ["Act 3 Cpot C", 2],
    ],
  },
  "Act 4 Super A": {
    nodrop: 0,
    tcs: [
      ["Act 4 Uitem A", 2],
      ["Act 4 Cpot A", 2],
    ],
  },
  "Act 4 Super B": {
    nodrop: 0,
    tcs: [
      ["Act 4 Uitem B", 2],
      ["Act 4 Cpot B", 2],
    ],
  },
  "Act 4 Super C": {
    nodrop: 0,
    tcs: [
      ["Act 4 Uitem B", 2],
      ["Act 4 Cpot B", 2],
    ],
  },
  "Act 5 Super A": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem A", 2],
      ["Act 5 Cpot A", 2],
    ],
  },
  "Act 5 Super B": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem B", 2],
      ["Act 5 Cpot B", 2],
    ],
  },
  "Act 5 Super C": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem C", 2],
      ["Act 5 Cpot C", 2],
    ],
  },
  "Act 1 (N) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem A", 2],
      ["Act 1 (N) Cpot A", 2],
    ],
  },
  "Act 1 (N) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem B", 2],
      ["Act 1 (N) Cpot B", 2],
    ],
  },
  "Act 1 (N) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem C", 2],
      ["Act 1 (N) Cpot C", 2],
    ],
  },
  "Act 2 (N) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem A", 2],
      ["Act 2 (N) Cpot A", 2],
    ],
  },
  "Act 2 (N) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem B", 2],
      ["Act 2 (N) Cpot B", 2],
    ],
  },
  "Act 2 (N) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem C", 2],
      ["Act 2 (N) Cpot C", 2],
    ],
  },
  "Act 3 (N) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem A", 2],
      ["Act 3 (N) Cpot A", 2],
    ],
  },
  "Act 3 (N) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem B", 2],
      ["Act 3 (N) Cpot B", 2],
    ],
  },
  "Act 3 (N) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem C", 2],
      ["Act 3 (N) Cpot C", 2],
    ],
  },
  "Act 4 (N) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Uitem A", 2],
      ["Act 4 (N) Cpot A", 2],
    ],
  },
  "Act 4 (N) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Uitem B", 2],
      ["Act 4 (N) Cpot B", 2],
    ],
  },
  "Act 4 (N) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Uitem B", 2],
      ["Act 4 (N) Cpot B", 2],
    ],
  },
  "Act 5 (N) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem A", 2],
      ["Act 5 (N) Cpot A", 2],
    ],
  },
  "Act 5 (N) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem B", 2],
      ["Act 5 (N) Cpot B", 2],
    ],
  },
  "Act 5 (N) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem C", 2],
      ["Act 5 (N) Cpot C", 2],
    ],
  },
  "Act 1 (H) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem A", 2],
      ["Act 1 (H) Cpot A", 2],
    ],
  },
  "Act 1 (H) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem B", 2],
      ["Act 1 (H) Cpot B", 2],
    ],
  },
  "Act 1 (H) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 2],
      ["Act 1 (H) Cpot C", 2],
    ],
  },
  "Act 2 (H) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem A", 2],
      ["Act 2 (H) Cpot A", 2],
    ],
  },
  "Act 2 (H) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem B", 2],
      ["Act 2 (H) Cpot B", 2],
    ],
  },
  "Act 2 (H) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem C", 2],
      ["Act 2 (H) Cpot C", 2],
    ],
  },
  "Act 3 (H) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem A", 2],
      ["Act 3 (H) Cpot A", 2],
    ],
  },
  "Act 3 (H) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem B", 2],
      ["Act 3 (H) Cpot B", 2],
    ],
  },
  "Act 3 (H) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem C", 2],
      ["Act 3 (H) Cpot C", 2],
    ],
  },
  "Act 4 (H) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Uitem A", 2],
      ["Act 4 (H) Cpot A", 2],
    ],
  },
  "Act 4 (H) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Uitem B", 2],
      ["Act 4 (H) Cpot B", 2],
    ],
  },
  "Act 4 (H) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Uitem B", 2],
      ["Act 4 (H) Cpot B", 2],
    ],
  },
  "Act 5 (H) Super A": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem A", 2],
      ["Act 5 (H) Cpot A", 2],
    ],
  },
  "Act 5 (H) Super B": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem B", 2],
      ["Act 5 (H) Cpot B", 2],
    ],
  },
  "Act 5 (H) Super C": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem C", 2],
      ["Act 5 (H) Cpot C", 2],
    ],
  },
  "Act 1 Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem A", 2],
      ["Act 1 Cpot A", 2],
    ],
  },
  "Act 1 Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem B", 2],
      ["Act 1 Cpot B", 2],
    ],
  },
  "Act 1 Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem C", 2],
      ["Act 1 Cpot C", 2],
    ],
  },
  "Act 2 Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem A", 2],
      ["Act 2 Cpot A", 2],
    ],
  },
  "Act 2 Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem B", 2],
      ["Act 2 Cpot B", 2],
    ],
  },
  "Act 2 Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 2 Uitem C", 2],
      ["Act 2 Cpot C", 2],
    ],
  },
  "Act 3 Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem A", 2],
      ["Act 3 Cpot A", 2],
    ],
  },
  "Act 3 Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem B", 2],
      ["Act 3 Cpot B", 2],
    ],
  },
  "Act 3 Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 3 Uitem C", 2],
      ["Act 3 Cpot C", 2],
    ],
  },
  "Act 4 Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 4 Uitem A", 2],
      ["Act 4 Cpot A", 2],
    ],
  },
  "Act 4 Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 4 Uitem B", 2],
      ["Act 4 Cpot B", 2],
    ],
  },
  "Act 4 Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 4 Uitem B", 2],
      ["Act 4 Cpot B", 2],
    ],
  },
  "Act 5 Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem A", 2],
      ["Act 5 Cpot A", 2],
    ],
  },
  "Act 5 Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem B", 2],
      ["Act 5 Cpot B", 2],
    ],
  },
  "Act 5 Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem C", 2],
      ["Act 5 Cpot C", 2],
    ],
  },
  "Act 1 (N) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem A", 2],
      ["Act 1 (N) Cpot A", 2],
    ],
  },
  "Act 1 (N) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem B", 2],
      ["Act 1 (N) Cpot B", 2],
    ],
  },
  "Act 1 (N) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 1 (N) Uitem C", 2],
      ["Act 1 (N) Cpot C", 2],
    ],
  },
  "Act 2 (N) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem A", 2],
      ["Act 2 (N) Cpot A", 2],
    ],
  },
  "Act 2 (N) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem B", 2],
      ["Act 2 (N) Cpot B", 2],
    ],
  },
  "Act 2 (N) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 2 (N) Uitem C", 2],
      ["Act 2 (N) Cpot C", 2],
    ],
  },
  "Act 3 (N) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem A", 2],
      ["Act 3 (N) Cpot A", 2],
    ],
  },
  "Act 3 (N) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem B", 2],
      ["Act 3 (N) Cpot B", 2],
    ],
  },
  "Act 3 (N) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 3 (N) Uitem C", 2],
      ["Act 3 (N) Cpot C", 2],
    ],
  },
  "Act 4 (N) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Uitem A", 2],
      ["Act 4 (N) Cpot A", 2],
    ],
  },
  "Act 4 (N) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Uitem B", 2],
      ["Act 4 (N) Cpot B", 2],
    ],
  },
  "Act 4 (N) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 4 (N) Uitem B", 2],
      ["Act 4 (N) Cpot B", 2],
    ],
  },
  "Act 5 (N) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem A", 2],
      ["Act 5 (N) Cpot A", 2],
    ],
  },
  "Act 5 (N) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem B", 2],
      ["Act 5 (N) Cpot B", 2],
    ],
  },
  "Act 5 (N) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem C", 2],
      ["Act 5 (N) Cpot C", 2],
    ],
  },
  "Act 1 (H) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem A", 2],
      ["Act 1 (H) Cpot A", 2],
    ],
  },
  "Act 1 (H) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem B", 2],
      ["Act 1 (H) Cpot B", 2],
    ],
  },
  "Act 1 (H) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 2],
      ["Act 1 (H) Cpot C", 2],
    ],
  },
  "Act 2 (H) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem A", 2],
      ["Act 2 (H) Cpot A", 2],
    ],
  },
  "Act 2 (H) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem B", 2],
      ["Act 2 (H) Cpot B", 2],
    ],
  },
  "Act 2 (H) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 2 (H) Uitem C", 2],
      ["Act 2 (H) Cpot C", 2],
    ],
  },
  "Act 3 (H) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem A", 2],
      ["Act 3 (H) Cpot A", 2],
    ],
  },
  "Act 3 (H) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem B", 2],
      ["Act 3 (H) Cpot B", 2],
    ],
  },
  "Act 3 (H) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 3 (H) Uitem C", 2],
      ["Act 3 (H) Cpot C", 2],
    ],
  },
  "Act 4 (H) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Uitem A", 2],
      ["Act 4 (H) Cpot A", 2],
    ],
  },
  "Act 4 (H) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Uitem B", 2],
      ["Act 4 (H) Cpot B", 2],
    ],
  },
  "Act 4 (H) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 4 (H) Uitem B", 2],
      ["Act 4 (H) Cpot B", 2],
    ],
  },
  "Act 5 (H) Super Ax": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem A", 2],
      ["Act 5 (H) Cpot A", 2],
    ],
  },
  "Act 5 (H) Super Bx": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem B", 2],
      ["Act 5 (H) Cpot B", 2],
    ],
  },
  "Act 5 (H) Super Cx": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem C", 2],
      ["Act 5 (H) Cpot C", 2],
    ],
  },
  "Cow King": {
    nodrop: 0,
    tcs: [
      ["Act 1 Uitem C", 1],
      ["Act 1 Melee B", 2],
    ],
  },
  "Cow King (N)": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 1],
      ["Act 1 (N) Melee B", 2],
    ],
  },
  "Cow King (H)": {
    nodrop: 0,
    tcs: [
      ["Act 1 (H) Uitem C", 1],
      ["Act 1 (H) Melee B", 2],
    ],
  },
  Duriel: {
    nodrop: 0,
    tcs: [
      ["tsc", 1],
      ["Duriel - Base", 2],
    ],
  },
  "Duriel (N)": {
    nodrop: 0,
    tcs: [
      ["tsc", 1],
      ["Duriel (N) - Base", 2],
    ],
  },
  "Duriel (H)": {
    nodrop: 0,
    tcs: [
      ["tsc", 1],
      ["Duriel (H) - Base", 2],
    ],
  },
  Durielq: {
    nodrop: 0,
    tcs: [
      ["tsc", 1],
      ["Durielq - Base", 2],
    ],
  },
  "Durielq (N)": {
    nodrop: 0,
    tcs: [
      ["tsc", 1],
      ["Durielq (N) - Base", 2],
    ],
  },
  "Durielq (H)": {
    nodrop: 0,
    tcs: [
      ["tsc", 1],
      ["Durielq (H) - Base", 2],
    ],
  },
  ROP: { nodrop: 0, tcs: [["Diablo", 1]] },
  "ROP (N)": {
    nodrop: 0,
    tcs: [
      ["Diablo (N)", 4],
      ["Annihilus", 1],
    ],
  },
  "ROP (H)": { nodrop: 0, tcs: [["Annihilus", 1]] },
  "Countess Rune": { nodrop: 5, tcs: [["Runes 4", 15]] },
  "Countess Rune (N)": { nodrop: 5, tcs: [["Runes 8", 15]] },
  "Countess Rune (H)": { nodrop: 5, tcs: [["Runes 12", 15]] },
  "Countess Item": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1280", 11],
      ["Act 1 Equip C", 19],
      ["Act 2 Junk", 15],
      ["Act 2 Good", 3],
    ],
  },
  "Countess Item (N)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=1536", 11],
      ["Act 1 (N) Equip C", 19],
      ["Act 2 (N) Junk", 15],
      ["Act 2 (N) Good", 3],
    ],
  },
  "Countess Item (H)": {
    nodrop: 19,
    tcs: [
      ["gld,mul=2048", 11],
      ["Act 1 (H) Equip C", 19],
      ["Act 2 (H) Junk", 15],
      ["Act 2 (H) Good", 3],
      ["pk1", 1],
    ],
  },
  Countess: {
    nodrop: 0,
    tcs: [
      ["Countess Item", 1],
      ["Countess Rune", 1],
    ],
  },
  "Countess (N)": {
    nodrop: 0,
    tcs: [
      ["Countess Item (N)", 1],
      ["Countess Rune (N)", 1],
    ],
  },
  "Countess (H)": {
    nodrop: 0,
    tcs: [
      ["Countess Item (H)", 1],
      ["Countess Rune (H)", 1],
    ],
  },
  "Uber Andariel": { nodrop: 0, tcs: [["dhn", 1]] },
  "Uber Duriel": { nodrop: 0, tcs: [["bey", 1]] },
  "Uber Izual": { nodrop: 0, tcs: [["mbr", 1]] },
  "Pandemonium Key A": { nodrop: 0, tcs: [["pk1", 1]] },
  "Pandemonium Key B": { nodrop: 0, tcs: [["pk2", 1]] },
  "Pandemonium Key C": { nodrop: 0, tcs: [["pk3", 1]] },
  Eldritch: {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem A", 2],
      ["Act 5 Cpot A", 2],
    ],
  },
  "Eldritch (N)": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem A", 2],
      ["Act 5 (N) Cpot A", 2],
    ],
  },
  "Eldritch (H)": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem A", 2],
      ["Act 5 (H) Cpot A", 2],
    ],
  },
  Pindleskin: {
    nodrop: 0,
    tcs: [
      ["Act 5 Uitem C", 2],
      ["Act 5 Cpot C", 2],
    ],
  },
  "Pindleskin (N)": {
    nodrop: 0,
    tcs: [
      ["Act 5 (N) Uitem C", 2],
      ["Act 5 (N) Cpot C", 2],
    ],
  },
  "Pindleskin (H)": {
    nodrop: 0,
    tcs: [
      ["Act 5 (H) Uitem C", 2],
      ["Act 5 (H) Cpot C", 2],
    ],
  },
};
