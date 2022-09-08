import React from 'react';
import { Container, EmptyList, Row, SectionTitle } from './styles/videocontainer';
const VideoContainer = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

VideoContainer.SectionTitle = function SectionTitleVideoContainer({
  children,
  ...restProps
}) {
  return <SectionTitle {...restProps}>{children}</SectionTitle>;
};

VideoContainer.Row = function RowVideoContainer({ children, ...restProps }) {
  return <Row {...restProps}>{children}</Row>;
};

VideoContainer.EmptyList = function EmptyListVideoContainer({ children, ...restProps }) {
  return <EmptyList {...restProps}>{children}</EmptyList>;
};

export default VideoContainer;
