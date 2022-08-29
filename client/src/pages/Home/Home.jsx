import { instance } from 'api/config';
import Card from 'components/Card';
import Layout from 'components/Layout/Layout';
import HomeSlider from 'components/Slider/HomeSlider';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { devices } from 'styles/variables';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

const SectionTitle = styled.h1`
  text-align: left;
  padding: 10px 0;
  color: ${({ theme }) => theme.text};
`;

const Home = () => {
  // const { videos, loading } = useVideoListData(`random`);

  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        // eslint-disable-next-line no-undef
        (e.target.documentElement.scrollTop + window.innerHeight) <
      50
    ) {
      setFetching(true);
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    if (videos.length > 0 && videos.length === totalCount) {
      return;
    }
    if (fetching) {
      instance
        .get(`videos/allvideos?page=${currentPage}`)
        .then((res) => {
          setVideos([...videos, ...res.data.items]);
          setTotalCount(res.data.pagination.count);
          setCurrentPage((prev) => prev + 1);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching]);

  // if (loading) {
  //   return (
  //     <Layout>
  //       <LoadingBlock>
  //         {[...new Array(6)].map((skeleton, i) => (
  //           <Skeleton key={i + new Date().getTime()} type={'medium'} />
  //         ))}
  //       </LoadingBlock>
  //     </Layout>
  //   );
  // }
  //
  // if (!videos && !loading) {
  //   return (
  //     <Layout>
  //       <EmptyList>Empty List</EmptyList>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <Container>
        <HomeSlider />
        <SectionTitle>Recommendations</SectionTitle>
        <Row>
          {videos ? videos.map((video) => <Card key={video._id} video={video} />) : null}
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
