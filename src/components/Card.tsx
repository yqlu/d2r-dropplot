import React, { useEffect } from "react";

export type CardProps = {
  children?: JSX.Element | JSX.Element[];
};

export const Card = (props: CardProps): JSX.Element => {
  return (
    <div className="block p-6 rounded-lg border bg-gray-900 border-gray-700">
      {props.children}
    </div>
  );
};
