import React from 'react';
import styled from 'styled-components';
import appTitle from './assets/app_title.png';

import logo from './assets/logo.png';

const LargeCenteredImage = styled.img.attrs({
  className: 'w-100 h-auto pv2',
})``;

const HeaderTitle = styled.img.attrs({
  className: 'w-70 mw5',
})``;

export default props => {
  return (
    <div className="w-70 w-40-ns h-100 mw5 center flex flex-column items-center justify-center">
      <LargeCenteredImage src={logo} />
      <HeaderTitle src={appTitle} />
    </div>
  );
};
