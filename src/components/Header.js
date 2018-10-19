import React from 'react';
import styled from 'styled-components';
import logo from './assets/logo.png';

const MyHeader = styled.header.attrs({
  className:
    'w-100 pa1 bg-near-white flex justify-between items-center fixed top0 left0 z-max',
})``;

const HeaderLogo = styled.img.attrs({
  className: 'pt1 pl1',
})`
height: 40px
width: 40px
`;

const HeaderTitle = styled.span.attrs({
  className: 'f3 avenir',
})``;

const BoldPink = styled.span.attrs({
  className: 'fw7 dark-pink',
})``;

const HeaderLink = styled.a.attrs({
  className: 'f6 mr1 z-max',
})``;

export default props => (
  <MyHeader>
    <HeaderLink href="/">
      <HeaderLogo src={logo} alt="East End Trades Guild" />
    </HeaderLink>
    <HeaderTitle>
      RENT
      <BoldPink>CHECK</BoldPink>
    </HeaderTitle>
    <HeaderLink href="#" onClick={props.openSearch}>
      Search
    </HeaderLink>
  </MyHeader>
);
