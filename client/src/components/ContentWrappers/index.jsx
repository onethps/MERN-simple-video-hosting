import React from 'react';
import { CategoryCurrentWrapper, MainBox, Row } from './styles/contentwrappers';

const ExploreWrapper = ({ children, ...restProps }) => {
  return <MainBox {...restProps}>{children}</MainBox>;
};

const RowExtendCardsWrapper = ({ children, ...restProps }) => {
  return <Row {...restProps}>{children}</Row>;
};

const ContentCategoryWrapper = ({ children, restProps }) => {
  return <CategoryCurrentWrapper {...restProps}>{children}</CategoryCurrentWrapper>;
};
export { ExploreWrapper, RowExtendCardsWrapper, ContentCategoryWrapper };
