import Card from 'components/Card';
import Layout from 'components/Layout/Layout';
import { useVideoListData } from 'hooks/useVideoListData';
import React from 'react';
import styled from 'styled-components';
import { devices } from 'styles/variables';

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

export const SectionTitle = styled.h1`
  padding: 30px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Subs = () => {
  const { videos } = useVideoListData(`sub`);

  return (
    <Layout>
      <SectionTitle>Subscriptions</SectionTitle>
      <Row>
        {videos ? videos.map((video) => <Card key={video._id} video={video} />) : null}
      </Row>
    </Layout>
  );
};

export default Subs;
