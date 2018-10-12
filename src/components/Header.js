import React from "react";
import styled from "styled-components";
import logo from "./assets/logo.png";
import burger from "./assets/burger.png";
import appTitle from "./assets/app_title.png";

const MyHeader = styled.header.attrs({
  className: "w100 pa1 flex justify-between items-center"
})``;

const HeaderLogo = styled.img.attrs({
  className: "h3 w3 pa1"
})``;

const HeaderTitle = styled.img.attrs({
  className: "w-50 mw5"
})``;

const NavBurger = styled.img.attrs({
  className: "pr2"
})``;

export default () => (
  <MyHeader>
    <HeaderLogo src={logo} alt="East End Trades Guild" />
    <HeaderTitle src={appTitle} alt="Rent Check" />
    <NavBurger src={burger} alt="Menu" className="" />
  </MyHeader>
);
