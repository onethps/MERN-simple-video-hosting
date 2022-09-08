import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Container, Button, Title } from './styles/googlebutton';

const GoogleButton = ({ ...restProps }) => {
  return (
    <Container {...restProps}>
      <Button>
        <FcGoogle />
        <Title>Sign with Google</Title>
      </Button>
    </Container>
  );
};

export default GoogleButton;
