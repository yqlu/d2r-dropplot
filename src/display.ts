import { ItemDict } from "./item-dict.js";
import { TCProbTuple } from "./tc.js";
import { WeaponsDict, ArmorDict } from "./weapon-armor-dict.js";

export function sortTCs(tcs: TCProbTuple[]): TCProbTuple[] {
  let runeTCs: TCProbTuple[] = [];
  let weapTCs: TCProbTuple[] = [];
  let armoTCs: TCProbTuple[] = [];
  let bowTCs: TCProbTuple[] = [];
  let meleTCs: TCProbTuple[] = [];
  let others: TCProbTuple[] = [];
  let baseWeapTCs: TCProbTuple[] = [];
  let baseArmoTCs: TCProbTuple[] = [];

  for (var tcTuple of tcs) {
    if (/^r[0-9]{2}$/.exec(tcTuple[0])) {
      runeTCs.push(tcTuple);
    } else if (/^weap[0-9]+$/.exec(tcTuple[0])) {
      weapTCs.push(tcTuple);
    } else if (/^armo[0-9]+$/.exec(tcTuple[0])) {
      armoTCs.push(tcTuple);
    } else if (/^bow[0-9]+$/.exec(tcTuple[0])) {
      bowTCs.push(tcTuple);
    } else if (/^mele[0-9]+$/.exec(tcTuple[0])) {
      meleTCs.push(tcTuple);
    } else if (WeaponsDict.hasOwnProperty(tcTuple[0])) {
      baseWeapTCs.push(tcTuple);
    } else if (ArmorDict.hasOwnProperty(tcTuple[0])) {
      baseArmoTCs.push(tcTuple);
    } else {
      others.push(tcTuple);
    }
  }
  // r01, r02, r03
  runeTCs.sort(
    (a, b) => parseInt(a[0].substring(1)) - parseInt(b[0].substring(1))
  );
  // weap3, weap6, weap9
  weapTCs.sort(
    (a, b) => parseInt(a[0].substring(4)) - parseInt(b[0].substring(4))
  );
  // armo3, armo6, armo9
  armoTCs.sort(
    (a, b) => parseInt(a[0].substring(4)) - parseInt(b[0].substring(4))
  );
  // bow3, bow6, bow9
  bowTCs.sort(
    (a, b) => parseInt(a[0].substring(3)) - parseInt(b[0].substring(3))
  );
  // mele3, mele6, mele9
  meleTCs.sort(
    (a, b) => parseInt(a[0].substring(4)) - parseInt(b[0].substring(4))
  );
  baseWeapTCs.sort(function (a, b) {
    const [aObj, bObj] = [ItemDict[a[0]], ItemDict[b[0]]];
    if (aObj.level != bObj.level) {
      return aObj.level - bObj.level;
    }
    return aObj.name.localeCompare(bObj.name);
  });
  baseArmoTCs.sort(function (a, b) {
    const [aObj, bObj] = [ItemDict[a[0]], ItemDict[b[0]]];
    if (aObj.level != bObj.level) {
      return aObj.level - bObj.level;
    }
    return aObj.name.localeCompare(bObj.name);
  });
  others.sort((a, b) => a[0].localeCompare(b[0]));
  return runeTCs
    .concat(weapTCs)
    .concat(baseWeapTCs)
    .concat(armoTCs)
    .concat(baseArmoTCs)
    .concat(bowTCs)
    .concat(meleTCs)
    .concat(others);
}
