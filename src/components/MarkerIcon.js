import React, { Component } from "react";

export default ({ useClass, price }) => {
  //const iconText = this.props.iconText;

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
        fill="#FFFF00"
        // stroke="#d2d3d4"
        strokeWidth="3"
        role="presentation"
      />
      {/* <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke="#dFFF00"
        strokeWidth="3"
        strokeDashoffset="25"
        aria-labelledby="donut-segment-1-title donut-segment-1-desc"
      /> */}
      <g className="chart-text">
        <text className="chart-number" x="25%" y="60%">
          £{price}
        </text>
      </g>
    </svg>
  );
}
