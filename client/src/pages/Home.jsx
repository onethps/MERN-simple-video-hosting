import Layout from 'components/Layout';
import Spinner from 'components/LoaderSpinner';
import HomeSlider from 'components/Slider';
import CardContainer from 'containers/card';
import { useFetchVideosPagesData } from 'hooks/useFetchVideosPagesData';

import React from 'react';
import styled from 'styled-components';
import { devices } from 'styles/variables';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

  @media only screen and ${devices.laptopL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(6, 1fr);
  }
`;

const EmptyList = styled.h1`
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const SectionTitle = styled.h2`
  text-align: left;
  padding: 20px 0;
  color: ${({ theme }) => theme.text};
`;

const Home = () => {
  // const { videos, loading } = useVideoListData(`random`);

  const { videos, loading } = useFetchVideosPagesData('allVideos');

  // if (loading) {
  //   return (
  //     <Index>
  //       <LoadingBlock>
  //         {[...new Array(6)].map((skeleton, i) => (
  //           <Skeleton key={i + new Date().getTime()} type={'medium'} />
  //         ))}
  //       </LoadingBlock>
  //     </Index>
  //   );
  // }

  if (!videos && !loading) {
    return (
      <Layout>
        <EmptyList>Empty List</EmptyList>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <HomeSlider />
        <SectionTitle>Recommendations</SectionTitle>
        <Row>
          {videos
            ? videos.map((video) => <CardContainer key={video._id} video={video} />)
            : null}
        </Row>
      </Container>
      {loading ? <Spinner /> : null}
    </Layout>
  );
};

export default Home;
