import React from "react";
import { range } from "lodash-es";
import { TCDict } from "./engine/tc-dict";

export type PlayerFormState = {
  playerCount: number;
  partyCount: number;
  tc: string;
  mlvl: string;
  magicFind: string;
};

export type PlayerFormProps = PlayerFormState & {
  errors: { [key: string]: boolean };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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
  const playerOptions: JSX.Element[] = makePlayerOptions();

  return (
    <div className="w-full px-3">
      <div className="form-group grid grid-cols-2 gap-4 mb-0">
        <div className="form-label">Player</div>
        <div className="form-label">Party</div>
      </div>
      <div className="form-group grid grid-cols-2 gap-4">
        <select
          className="select"
          id="playerCount"
          value={props.playerCount}
          onChange={props.onChange}
        >
          {playerOptions}
        </select>
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
