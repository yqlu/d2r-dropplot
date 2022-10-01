import React, { useEffect, useState } from "react";
import { RARITY } from "../engine/itemratio-dict";
import { colorClassFromRarity } from "../charts/common";
import { Locale } from "../engine/locale-dict";

export type ItemDisplayNameProps = {
  baseItemName: string;
  itemName: string;
  rarity: RARITY;
};

export const ItemDisplayName = (props: ItemDisplayNameProps): JSX.Element => {
  const name = props.itemName === "" ? props.baseItemName : props.itemName;
  const styling = colorClassFromRarity(props.baseItemName, props.rarity);
  return <span className={styling}>{Locale(name)}</span>;
};
