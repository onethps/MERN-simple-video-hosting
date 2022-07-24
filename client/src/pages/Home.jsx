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
  position: absolute;
  left: 0;
  margin-top: 100px;

  @media only screen and (min-width: 600px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and (min-width: 768px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 997px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(3, 1fr);
    position: static;
    margin-top: 30px;

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
    margin: 100px auto;
  }

`

const LoadingBlock = styled.div`
  margin-top: 100px;
`

const EmptyList = styled.h1`
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.text};
`

const CategoryTitle = styled.h1`
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  text-align: center;
  color: ${({theme}) => theme.text};

  @media only screen and (min-width: 997px) {
    position: static;
    text-align: left;
    top: 0;
  }

`


const Home = ({type}) => {
  const [videos, setVideos] = useState(null);
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


  if (!videos?.length) {
    return (
      <Container>
        <EmptyList>Empty List</EmptyList>
      </Container>
    )
  }

  if (loading) {
    return (
      <LoadingBlock>
        {[...new Array(6)].map((skeleton, i) => (
          <Skeleton key={i + new Date().getTime()} type={'medium'}/>
        ))}
      </LoadingBlock>
    );
  }


  return (

    <Container>
      <CategoryTitle>{type === 'sub' && videos ? 'Subscription' : 'Recommendations'}</CategoryTitle>
      <Row>
        {videos?.map((video) => (
          <Card key={video._id} video={video}/>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
