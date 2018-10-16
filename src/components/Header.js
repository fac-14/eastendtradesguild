import React from 'react';
import styled from 'styled-components';
import logo from './assets/logo.png';
import burger from './assets/burger.png';
import appTitle from './assets/app_title.png';

const MyHeader = styled.header.attrs({
  className:
    'w-100 pa1 bg-near-white flex justify-between items-center fixed top0 left0 z-max',
})``;

const HeaderLogo = styled.img.attrs({
  className: 'h2 w2 pa1',
})``;

const HeaderTitle = styled.img.attrs({
  className: 'w-40 mw4',
})``;

// const NavBurger = styled.img.attrs({
//   className: 'pr2',
// })``;

const HeaderLink = styled.a.attrs({
  className: 'f6 mr1',
})``;

export default props => (
  <MyHeader>
    <HeaderLink href="/">
      <HeaderLogo src={logo} alt="East End Trades Guild" />
    </HeaderLink>
    <HeaderTitle src={appTitle} alt="Rent Check" />
    <HeaderLink href="/about">About</HeaderLink>
  </MyHeader>
);
