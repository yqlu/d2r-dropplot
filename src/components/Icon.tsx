import React, { useEffect, useState } from "react";

type IArrowIconProps = { sidebarOpen: boolean };

export const ArrowIcon = ({ sidebarOpen }: IArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      width="15px"
      height="15px"
      viewBox="0 0 963 963"
      style={{
        display: "inline-block",
      }}
      className={
        "transition-all duration-500 " + (sidebarOpen ? "rotate-180" : "")
      }
      xmlSpace="preserve"
    >
      <g>
        <path
          fill="white"
          d="M0,481.5C0,747.4,215.6,963,481.5,963C747.4,963,963,747.4,963,481.5C963,215.6,747.4,0,481.5,0C215.5,0,0,215.6,0,481.5z    M691.601,543.3L478.2,776.601C460.4,796,436.101,805.8,411.8,805.8c-21.699,0-43.5-7.8-60.699-23.6   c-36.7-33.6-39.2-90.5-5.601-127.2l157.8-172.399L340.601,305.3c-33.601-36.6-31.101-93.6,5.5-127.2   c36.6-33.6,93.6-31.1,127.199,5.5l218.2,238.1C723,456.101,723.101,508.9,691.601,543.3z"
        />
      </g>
    </svg>
  );
};
