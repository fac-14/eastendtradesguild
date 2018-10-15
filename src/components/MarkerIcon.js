import React from "react";

export default ({ useClass }) => {

  const useClassColor = {
    "A1": "#ff80cc",
    "A3": "#9eebcf",
    "B1": "#96ccff",
    "B2": "#fbf1a9",
    "B8": "#ffb700",
    "D1": "#a463f2",
    "D2": "#ff6300",
    "Other": "#fff"
  }

  return (
    <svg
      width="70px"
      height="70px"
      viewBox="0 0 42 42"
      className="donut"
      aria-labelledby="beers-title beers-desc"
      role="img"
    >
      <circle
        className="donut-hole"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="white"
        role="presentation"
      />
      <circle
        className="donut-ring"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill={useClassColor[useClass]}
        strokeWidth="3"
        role="presentation"
      />
    </svg>
  );
}
