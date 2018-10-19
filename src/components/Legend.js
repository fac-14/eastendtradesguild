import React from 'react';
import {
  Circle,
  LegendUseclass,
  ClassListItems,
  AnimateCircle,
  UseText,
} from './Legend.styles';
const colors = [
  'A1:#ff80cc',
  'A3:#9eebcf',
  'B1:#96ccff',
  'B2:#fbf1a9',
  'B8:#ffb700',
  'D1:#a463f2',
  'D2:#ff6300',
  'other:#fff',
];

const createLegend = open => {
  if (open) {
    return colors.map(color => (
      <AnimateCircle color={color.split(':')[1]}>
        <UseText>{color.split(':')[0]}</UseText>
      </AnimateCircle>
    ));
  }
  return (
    <Circle color="#ff80cc">
      <UseText>Key</UseText>
    </Circle>
  );
};

export default props => (
  <LegendUseclass onClick={props.toggleLegend}>
    <ClassListItems>{createLegend(props.legend)}</ClassListItems>
  </LegendUseclass>
);
