import React from "react";
import { range } from "lodash-es";
import { TCDict } from "./engine/tc-dict";

export type PlayerFormState = {
  tc: string;
  playerCount: number;
  partyCount: number;
  mlvl: string;
  magicFind: string;
};

export type PlayerFormProps = PlayerFormState & {
  errors: { [key: string]: boolean };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

const makeTcOptions = (): JSX.Element[] => {
  return Object.keys(TCDict).map((tcName) => {
    return (
      <option value={tcName} key={tcName}>
        {tcName}
      </option>
    );
  });
};

const makePlayerOptions = (): JSX.Element[] => {
  return range(8).map((i) => {
    return (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    );
  });
};

export const PlayerForm = (props: PlayerFormProps): JSX.Element => {
  const tcOptions: JSX.Element[] = makeTcOptions();
  const playerOptions: JSX.Element[] = makePlayerOptions();

  return (
    <div className="w-full px-3">
      <div className="form-group">
        <label className="form-label">TC</label>
        <select
          className="select"
          id="tc"
          value={props.tc}
          onChange={props.onChange}
        >
          {tcOptions}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Player Count</label>
        <select
          className="select"
          id="playerCount"
          value={props.playerCount}
          onChange={props.onChange}
        >
          {playerOptions}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Party Count</label>
        <select
          className="select"
          id="partyCount"
          value={props.partyCount}
          onChange={props.onChange}
        >
          {playerOptions}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Mlvl</label>
        <input
          type="text"
          id="mlvl"
          className={(props.errors.mlvl ? "error " : "") + "textbox"}
          value={props.mlvl}
          onChange={props.onChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Magic Find</label>
        <input
          type="text"
          id="magicFind"
          className={(props.errors.magicFind ? "error " : "") + "textbox"}
          value={props.magicFind}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};
