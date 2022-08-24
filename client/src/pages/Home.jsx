import { instance } from 'api/config';
import Card from 'components/Card';
import Layout from '../components/Layout/Layout';
import Skeleton from 'components/Skeleton';
import HomeSlider from 'components/Slider/HomeSlider';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { devices } from 'styles/variables';

const Row = styled.div`
  display: grid;
  grid-gap: 10px;

  @media only screen and ${devices.mobileL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and ${devices.tablet} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 997px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(3, 1fr);
    position: static;
  }

  @media only screen and (min-width: 1200px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (min-width: 1970px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and (min-width: 2300px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(6, 1fr);
  }
`;

const LoadingBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  width: 100%;
  justify-content: center;
  margin: 100px 0;

  @media only screen and ${devices.laptopL} {
    padding: 0 200px;
  }
`;

const EmptyList = styled.h1`
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const CategoryTitle = styled.h1`
  top: 70px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Home = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setVideos(null);
      try {
        setLoading(true);
        const { data } = await instance.get(`videos/random`);
        setVideos(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos().catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <Layout>
        <LoadingBlock>
          {[...new Array(6)].map((skeleton, i) => (
            <Skeleton key={i + new Date().getTime()} type={'medium'} />
          ))}
        </LoadingBlock>
      </Layout>
    );
  }

  if (!videos) {
    return (
      <Layout>
        <EmptyList>Empty List</EmptyList>
      </Layout>
    );
  }

  return (
    <Layout>
      <HomeSlider videos={videos} />
      <CategoryTitle>Recomendations</CategoryTitle>
      <Row>
        {videos ? videos.map((video) => <Card key={video._id} video={video} />) : null}
      </Row>
    </Layout>
  );
};

export default Home;
