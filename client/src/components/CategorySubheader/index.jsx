import React from 'react';
import { Container, IconBox, Title, TitleBox, Wrapper } from './styles/categorysubheader';

const CategorySubHeader = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

CategorySubHeader.Wrapper = function CategorySubHeaderWrapper({
  children,
  ...restProps
}) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

CategorySubHeader.Icon = function CategorySubHeaderIcon({ children, ...restProps }) {
  return <IconBox {...restProps}>{children}</IconBox>;
};

CategorySubHeader.Title = function CategorySubHeaderTitle({ children, ...restProps }) {
  return (
    <TitleBox {...restProps}>
      <Title>{children}</Title>
    </TitleBox>
  );
};

export default CategorySubHeader;
