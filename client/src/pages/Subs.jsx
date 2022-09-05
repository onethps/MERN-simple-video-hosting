import Layout from 'components/Layout';
import Spinner from 'components/LoaderSpinner';
import CardContainer from 'containers/card';
import { useVideoListData } from 'hooks/useVideoListData';
import React from 'react';
import styled from 'styled-components';
import { devices } from 'styles/variables';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 0 4%;

  @media only screen and ${devices.laptopL} {
    max-width: 2332px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;

  @media only screen and ${devices.mobile} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and ${devices.mobileL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and ${devices.tablet} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and ${devices.laptop} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and ${devices.laptopM} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and ${devices.desktop} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const SectionTitle = styled.h2`
  padding: 20px 0;
  color: ${({ theme }) => theme.text};
`;

const Subs = () => {
  const { loading, videos } = useVideoListData(`sub`);

  return (
    <Layout>
      <Container>
        <SectionTitle>Subscriptions</SectionTitle>
        <Row>
          {videos
            ? videos.map((video) => <CardContainer key={video._id} video={video} />)
            : null}
        </Row>
        {loading ? <Spinner /> : null}
      </Container>
    </Layout>
  );
};

export default Subs;
