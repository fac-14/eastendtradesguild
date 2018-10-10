import React, { Component } from 'react';

export default class SVGIconComponent extends Component {
    render() {
        const useClassProps = this.props.useClass || 0;
        return (
            <svg width="50px" height="50px" viewBox="0 0 42 42" className="donut" aria-labelledby="beers-title beers-desc" role="img">
                <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="white" role="presentation"></circle>
                <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#g3d3d4" strokeWidth="3" role="presentation"></circle>
                <circle className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#de4b99" strokeWidth="3" strokeDashoffset="25" aria-labelledby="donut-segment-1-title donut-segment-1-desc">
                </circle>
                <g className="chart-text">
                    <text className="chart-number" x="35%" y="60%">
                        {useClassProps}
                    </text>
                </g>
            </svg>
        );
    }
}