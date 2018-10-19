import styled from 'styled-components';

export const MyHeader = styled.header.attrs({
  className:
    'w-100 pa1 bg-near-white flex justify-between items-center fixed top0 left0 z-max',
})``;

export const HeaderLogo = styled.img.attrs({
  className: 'pt1 pl1',
})`
height: 40px
width: 40px
`;

export const HeaderTitle = styled.span.attrs({
  className: 'f3 avenir',
})``;

export const BoldPink = styled.span.attrs({
  className: 'fw7 dark-pink',
})``;

export const HeaderLink = styled.a.attrs({
  className: 'f6 mr1 z-max',
})``;
