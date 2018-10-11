import React from 'react';
import styled from 'styled-components';
import logo from './assets/logo.svg';

const MyHeader = styled.header.attrs({
  className: 'tc pv4 pv5-ns bg-dark-pink',
})``;

const Avatar = styled.img.attrs({
  className: 'br-100 pa1 ba b--black-10 h3 w3',
  alt: 'avatar',
})``;

const H1 = styled.h1.attrs({
  className: 'f5 f4-ns fw6 mid-gray',
})``;

const H2 = styled.h2.attrs({
  className: 'f6 gray fw2 ttu tracked',
})``;

export default () => (
  <MyHeader>
    <Avatar src={logo} />
    <H1>Jasper Whitehouse</H1>
    <H2>Los Angeles</H2>
  </MyHeader>
);
