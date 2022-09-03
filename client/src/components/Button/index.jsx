import { CustomLinkButton, LinkButton } from 'components/Button/styles/button';
import React from 'react';

const Button = ({ src = '/', title }) => {
  return (
    <LinkButton to={src}>
      <CustomLinkButton data-testid="title">{title}</CustomLinkButton>
    </LinkButton>
  );
};

export default Button;
