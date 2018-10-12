import React, { Component } from "react";

export default class SVGIconComponent extends Component {
  render() {
    const iconText = this.props.iconText || 0;
    return (
      <svg
        width="35px"
        height="50px"
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
          fill="transparent"
          stroke="#d2d3d4"
          strokeWidth="3"
          role="presentation"
        />
        <circle
          className="donut-segment"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#ce4b99"
          strokeWidth="3"
          strokeDasharray={`${iconText} ${100 - iconText}`}
          strokeDashoffset="25"
          aria-labelledby="donut-segment-1-title donut-segment-1-desc"
        />
        <g className="chart-text">
          <text className="chart-number" x="35%" y="60%">
            {iconText}
          </text>
        </g>
      </svg>
    );
  }
}