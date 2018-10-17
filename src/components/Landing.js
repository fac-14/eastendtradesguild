import React from 'react';
import styled from 'styled-components';

import logo from './assets/logo.png';

const LargeCenteredImage = styled.img.attrs({
  className: 'w-100 h-auto pv2',
})``;

const HeaderTitle = styled.span.attrs({
  className: 'f3 fw3 avenir',
})``;

const BoldPink = styled.span.attrs({
  className: 'fw7 dark-pink',
})``;

export default props => {
  return (
    <div className="w-70 w-40-ns h-100 mw5 center flex flex-column items-center justify-center">
      <LargeCenteredImage src={logo} />
      <HeaderTitle>
        RENT
        <BoldPink>CHECK</BoldPink>
      </HeaderTitle>
    </div>
  );
};
