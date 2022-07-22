import React from "react";
import { range } from "lodash-es";
import { TCDict } from "./engine/tc-dict";
import { Select, Option } from "@material-tailwind/react";

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
      <div className="w-96 px-3">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">TC</label>
          <select
            className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 pr-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="tc"
            value={this.props.tc}
            onChange={this.props.onChange}
          >
            {this.tcOptions}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Player Count</label>
          <select
            className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="playerCount"
            value={this.props.playerCount}
            onChange={this.props.onChange}
          >
            {this.playerOptions}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Party Count</label>
          <select
            className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="partyCount"
            value={this.props.partyCount}
            onChange={this.props.onChange}
          >
            {this.playerOptions}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Mlvl</label>
          <input
            type="text"
            id="mlvl"
            className={
              (this.props.errors.mlvl ? "error" : "") +
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            }
            value={this.props.mlvl}
            onChange={this.props.onChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Magic Find</label>
          <input
            type="text"
            id="magicFind"
            className={
              (this.props.errors.magicFind ? "error" : "") +
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            }
            value={this.props.magicFind}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}
