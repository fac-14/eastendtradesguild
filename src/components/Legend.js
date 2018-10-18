import React from 'react';
import styled from 'styled-components';

const colors = ['A1:#ff80cc', 'A3:#9eebcf', 'B1:#96ccff', 'B2:#fbf1a9', 'B8:#ffb700', 'D1:#a463f2', 'D2:#ff6300', 'other:#fff']

const createLegend = (open) => {
    if (open) {
        return colors.map(color =>
            (
                <Circle color={color.split(':')[1]}>
                    <UseText>{color.split(':')[0]}</UseText>
                </Circle>
            )
        )
    } return (
        <Circle color="#ff80cc">
            <UseText>Key</UseText>
        </Circle>
    )
}

const LegendUseclass = styled.div.attrs({
    className: "fixed left-1 bottom-1 z-max"
})``;

const Circle = styled.div.attrs({
    className: "mt2 w2 h2 br-100 flex items-center justify-center "
})`background:${props => props.color}`

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
