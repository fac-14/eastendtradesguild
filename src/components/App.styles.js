import styled from 'styled-components';

const FullScreenContainer = styled.div.attrs({
  className: 'vh-100 vw-100 near-black avenir',
})``;

const ModalContainer = styled.div.attrs({
  className:
    'vh-100 w-100 fixed top-0 left-0 z-max flex items-center justify-center',
})``;

const ModalOverlay = styled.div.attrs({
  className: 'vh-100 w-100 fixed top-0 left-0 z-9999 o-70 bg-white',
})``;

export { FullScreenContainer, ModalContainer, ModalOverlay };
