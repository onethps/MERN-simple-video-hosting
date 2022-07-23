import React, {useEffect, useState} from 'react';
import {Card} from 'components/Card';
import styled from 'styled-components';
import Skeleton from 'components/Skeleton';
import {instance} from "api/config";

const Container = styled.div`
  max-width: 1998px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;



  @media only screen and (min-width: 600px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and (min-width: 768px) {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 992px) {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1200px) {
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (min-width: 1970px) {
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and (min-width: 2300px) {
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(6, 1fr);
  }

`

const TitleBlock = styled.h1`
  width: 100%;
  color: ${({theme}) => theme.text};
`;

const LoadingBlock = styled.div`
  margin-top: 60px;
`

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      const {data} = await instance.get(`videos/${type}`);
      setVideos(data);
      setLoading(false)
    };

    fetchVideos();
  }, [type]);

  if (loading) {
    return (
      <LoadingBlock>
        {[...new Array(6)].map((skeleton, i) => (
          <Skeleton key={skeleton + i} type={'medium'}/>
        ))}
      </LoadingBlock>
    );
  }

  return (
    <Container>
      <TitleBlock>{type === 'random' ? 'Recommend' : 'Subscriptions'}</TitleBlock>
      <Row>
        {videos.map((video) => (
          <Card key={video._id} video={video}/>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
