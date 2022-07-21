import React, { useEffect, useState } from 'react';
import { Card } from 'components/Card';
import styled from 'styled-components';
import axios from 'axios';
import Skeleton from 'components/Skeleton';
import {useSelector} from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin: 0 auto;
  max-width: 1820px;

  flex-wrap: wrap;
`;

const TitleBlock = styled.h1`
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const LoadingBlock = styled.div`
  margin-top: 60px;
`

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      const { data } = await axios.get(`videos/${type}`);
      setVideos(data);
      setLoading(false)
    };

    fetchVideos();
  }, [type]);

  if (loading) {
    return (
      <LoadingBlock >
        {[...new Array(6)].map((skeleton, i) => (
          <Skeleton key={skeleton + i} type={'medium'} />
        ))}
      </LoadingBlock>
    );
  }

  return (
    <Container>
      <TitleBlock>{type === 'random' ? 'Recommend' : 'Subscriptions'}</TitleBlock>

      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
