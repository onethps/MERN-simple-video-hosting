import Layout from 'components/Layout';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  margin-top: 10%;
  color: ${({ theme }) => theme.text};
`;

const Page404 = () => {
  return (
    <Layout>
      <Container>
        <Text>NOT FOUND PAGE</Text>
      </Container>
    </Layout>
  );
};

export default Page404;
