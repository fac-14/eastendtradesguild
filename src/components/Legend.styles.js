import styled, { keyframes } from 'styled-components';

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

export const LegendUseclass = styled.div.attrs({
  className: 'fixed left-0 bottom-0 z-max',
})``;

export const Circle = styled.div.attrs({
  className: 'mt2 w2 h2 br-100 flex items-center justify-center ',
})`
  background: ${props => props.color};
`;

export const AnimateCircle = styled.div.attrs({
  className: 'mt2 w2 h2 br-100 flex items-center justify-center ',
})`
  background: ${props => props.color};
  animation: ${rotationBuilder()} 0.5s linear;
`;

export const UseText = styled.p.attrs({
  className: 'avenir black',
})``;

export const ClassListItems = styled.ul.attrs({
  className: 'pl2 list',
})`
  display: ${props => props.display};
`;
