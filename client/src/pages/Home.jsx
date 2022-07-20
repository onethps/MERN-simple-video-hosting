import React, { useEffect, useState } from 'react';
import { Card } from 'components/Card';
import styled from 'styled-components';
import axios from 'axios';

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
`

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`videos/${type}`);
      setVideos(data);
    };

    fetchVideos();
  }, [type]);

  return (
    <Container>
      <TitleBlock>Recommend</TitleBlock>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
