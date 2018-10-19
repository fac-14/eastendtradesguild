import styled from "styled-components";

const useClassColor = {
  A1: "#ff80cc",
  A3: "#9eebcf",
  B1: "#96ccff",
  B2: "#fbf1a9",
  B8: "#ffb700",
  D1: "#a463f2",
  D2: "#ff6300",
  Other: "#fff"
};

const PopupLabel = styled.div.attrs({
  className: "b mb1"
})``;

const PopupInfo = styled.div.attrs({
  className: "mb1"
})``;

const CenteredSection = styled.div.attrs({
  className: "center w-90 tc bt bw1 pv3 mt3 ph2"
})``;

const Pill = styled.div.attrs({
  className: "f6 br-pill ph3 pv2 mb2 dib black b  ml-auto mr-auto"
})`
  background: ${props => useClassColor[props.use_class]};
`;

const Button = styled.a.attrs({
  className:
    "f6 grow no-underline br-pill ph3 pv2 mv2 dib link white bg-hot-pink avenir button-reset b-none"
})`
  color: white !important;
`;

export { PopupInfo, PopupLabel, CenteredSection, Pill, Button };
