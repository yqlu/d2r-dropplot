import React, { useState } from "react";

export const Navbar = (): JSX.Element => {
  return (
    <nav className="fixed left-0 top-0 right-0 flex items-center justify-between flex-wrap bg-gray-900 px-5 py-2 border-y border-gray-800 z-30">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Diablo 2 Dropdash
        </span>
      </div>
      <div className="w-full block flex-grow flex items-center w-auto">
        <div className="flex-grow"></div>
        <div className="text-sm">
          <a
            href="#responsive-header"
            className="inline-block mt-0 hover:text-white"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
};
