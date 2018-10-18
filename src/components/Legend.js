import React from 'react';
import styled from 'styled-components';


const LegendUseclass = styled.div.attrs({
    className: "h3 w3 fixed left-1 bottom-1 z-max flex items-center justify-center br-100 bg-black-90"
})``;

const UseclassText = styled.p.attrs({
    className: "white-100 z-max fw3 flex center "
})`color: white; font-size: 1rem;`;

export default props => (
    <LegendUseclass> <UseclassText>A1</UseclassText> </LegendUseclass>
)
