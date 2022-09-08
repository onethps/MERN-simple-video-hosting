import React from 'react';
import { MainBox, Row } from './styles/contentwrappers';

const ExploreWrapper = ({ children, ...restProps }) => {
  return <MainBox {...restProps}>{children}</MainBox>;
};

const RowExtendCardsWrapper = ({ children, ...restProps }) => {
  return <Row {...restProps}>{children}</Row>;
};

export { ExploreWrapper, RowExtendCardsWrapper };
