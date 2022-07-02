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

export class PlayerForm extends React.Component<PlayerFormProps> {
  tcOptions: JSX.Element[];
  playerOptions: JSX.Element[];

  constructor(props: PlayerFormProps) {
    super(props);
    this.tcOptions = Object.keys(TCDict).map((tcName) => {
      return (
        <option value={tcName} key={tcName}>
          {tcName}
        </option>
      );
    });
    this.playerOptions = range(8).map((i) => {
      return (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <p>
          <span>TC</span>
          <select id="tc" value={this.props.tc} onChange={this.props.onChange}>
            {this.tcOptions}
          </select>
        </p>
        <p>
          <span>Player Count</span>
          <select
            id="playerCount"
            value={this.props.playerCount}
            onChange={this.props.onChange}
          >
            {this.playerOptions}
          </select>
        </p>
        <p>
          <span>Party Count</span>
          <select
            id="partyCount"
            value={this.props.partyCount}
            onChange={this.props.onChange}
          >
            {this.playerOptions}
          </select>
        </p>
        <p>
          <span>Mlvl</span>
          <input
            type="text"
            id="mlvl"
            className={this.props.errors.mlvl ? "error" : ""}
            value={this.props.mlvl}
            onChange={this.props.onChange}
          />
        </p>
        <p>
          <span>Magic Find</span>
          <input
            type="text"
            id="magicFind"
            className={this.props.errors.magicFind ? "error" : ""}
            value={this.props.magicFind}
            onChange={this.props.onChange}
          />
        </p>
      </div>
    );
  }
}
