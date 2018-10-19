import styled from 'styled-components';

export const LargeCenteredImage = styled.img.attrs({
  className: 'w-40 w-70-l pv2 mb2',
})``;

export const Form = styled.form.attrs({
  className:
    'w5 center flex flex-column items-center justify-center avenir bg-white pa3 br3 o-100 tc',
})``;

export const Button = styled.button.attrs({
  className:
    'f6 grow no-underline br-pill ph3 pv2 mv2 dib white bg-hot-pink avenir button-reset b-none',
})`
box-shadow: none
border: none !important`;

export const Warning = styled.div.attrs({
  className: 'mv2 dark-pink',
})``;

export const Closer = styled.div.attrs({
  className: 'f4 mr0 ml-auto avenir pointer',
})``;
