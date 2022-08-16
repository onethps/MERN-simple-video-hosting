import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonC = styled.button`
  background: transparent;
  padding: 10px 30px;
  border: 3px solid blue;
  border-radius: 5px;
  font-weight: 700;
  font-size: 18px;
  color: blue;
`;

export const Button = ({ src = '/', title }) => {
  return (
    <Link to={src}>
      <ButtonC>{title}</ButtonC>
    </Link>
  );
};
