import React from "react";
import { range } from "lodash-es";
import { TCDict } from "./engine/tc-dict";

type FormState = {
  tc: string;
  playerCount: number;
  partyCount: number;
  mlvl: string;
  magicFind: string;
};

export class Form extends React.Component<any, FormState> {
  tcOptions: JSX.Element[];

  constructor(props: any) {
    super(props);
    this.state = {
      partyCount: 1,
      playerCount: 1,
      mlvl: "99",
      magicFind: "0",
      tc: "Gold",
    };
    // Init only once at the start, don't expect this to change
    this.tcOptions = Object.keys(TCDict).map((tcName) => {
      return (
        <option value={tcName} key={tcName}>
          {tcName}
        </option>
      );
    });
    this.onChange = this.onChange.bind(this);
  }

  onChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.target.id;
    console.log(name, event.target.value);
    this.setState<never>(
      {
        [name]: event.target.value,
      },
      () => {
        if (this.valid()) {
          const parsed = {
            tc: this.state.tc,
            partyCount: this.state.partyCount,
            playerCount: this.state.playerCount,
            mlvl: parseInt(this.state.mlvl),
            magicFind: parseInt(this.state.magicFind),
          };
          this.props.compute(parsed);
        }
      }
    );
  }

  valid(): boolean {
    return /^\d+$/.test(this.state.magicFind) && /^\d+$/.test(this.state.mlvl);
  }

  render() {
    const playerOptions = range(8).map((i) => {
      return (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    });
    return (
      <div>
        <p>
          <span>TC</span>
          <select id="tc" onChange={this.onChange}>
            {this.tcOptions}
          </select>
        </p>
        <p>
          <span>Player Count</span>
          <select
            id="playerCount"
            value={this.state.playerCount}
            onChange={this.onChange}
          >
            {playerOptions}
          </select>
        </p>
        <p>
          <span>Party Count</span>
          <select
            id="partyCount"
            value={this.state.partyCount}
            onChange={this.onChange}
          >
            {playerOptions}
          </select>
        </p>
        <p>
          <span>Mlvl</span>
          <input
            type="text"
            id="mlvl"
            value={this.state.mlvl}
            onChange={this.onChange}
          />
        </p>
        <p>
          <span>Magic Find</span>
          <input
            type="text"
            id="magicFind"
            value={this.state.magicFind}
            onChange={this.onChange}
          />
        </p>
      </div>
    );
  }
}
