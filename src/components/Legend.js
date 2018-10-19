import React from 'react';
import styled, { keyframes } from 'styled-components';

const colors = ['A1:#ff80cc', 'A3:#9eebcf', 'B1:#96ccff', 'B2:#fbf1a9', 'B8:#ffb700', 'D1:#a463f2', 'D2:#ff6300', 'other:#fff']

const createLegend = (open) => {
    if (open) {
        return colors.map(color =>
            (
                <AnimateCircle color={color.split(':')[1]}>
                    <UseText>{color.split(':')[0]}</UseText>
                </AnimateCircle>
            )
        )
    } return (
        <Circle color="#ff80cc">
            <UseText>Key</UseText>
        </Circle>
    )
}



  function rotationBuilder() {
    const rotation = keyframes`
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 40px, 0);
        transform: translate3d(0, 40px, 0);
      }
    
      to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
    `;
    return rotation;
  }


const LegendUseclass = styled.div.attrs({
    className: "fixed left-1 bottom-1 z-max"
})``;

const Circle = styled.div.attrs({
    className: "mt2 w2 h2 br-100 flex items-center justify-center "
})`background:${props => props.color }`

const AnimateCircle = styled.div.attrs({
    className: "mt2 w2 h2 br-100 flex items-center justify-center "
})`background:${props => props.color};  animation: ${rotationBuilder()} 0.5s linear ; `

const UseText = styled.p.attrs({
    className: "avenir black"
})``

const ClassListItems = styled.ul.attrs({
    className: "pl4 list"
})`display:${props => props.display}`

export default props => (
    <LegendUseclass onClick={props.toggleLegend} >
        <ClassListItems>
            {createLegend(props.legend)}
        </ClassListItems>
    </LegendUseclass>
)
