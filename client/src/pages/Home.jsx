import { instance } from 'api/config';
import { SidebarContext } from 'App';
import { Index } from 'components/Card';
import Skeleton from 'components/Skeleton';
import HomeSlider from 'components/Slider/HomeSlider';
import SidebarContainer from 'containers/sidebar';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/userSlice';
import styled from 'styled-components';
import { devices } from 'styles/variables';

const Container = styled.div`
  max-width: 1998px;
  margin: 0 auto;
  padding: 70px 20px;

  @media only screen and ${devices.tablet} {
    margin-left: 100px;
  }

  @media only screen and ${devices.laptopL} {
    margin-left: ${({ isOpenSidebar }) => (isOpenSidebar ? '300px' : '100px')};
  }

  @media only screen and ${devices.desktop} {
    margin: 0 auto;
  }
`;

const Row = styled.div`
  display: grid;
  grid-gap: 5px;

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

const Home = ({ type }) => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  // const nav = useNavigate();

  const { isOpenSidebar } = useContext(SidebarContext);
  const { user } = useSelector(userSelector);

  useEffect(() => {
    const fetchVideos = async () => {
      setVideos(null);
      try {
        setLoading(true);
        const { data } = await instance.get(`videos/${type}`);
        setVideos(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos().catch((err) => console.log(err));
  }, [type]);

  if (loading) {
    return (
      <>
        <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
        <Container>
          <LoadingBlock isOpenSidebar={isOpenSidebar}>
            {[...new Array(6)].map((skeleton, i) => (
              <Skeleton key={i + new Date().getTime()} type={'medium'} />
            ))}
          </LoadingBlock>
        </Container>
      </>
    );
  }

  if (!videos) {
    return (
      <>
        <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
        <Container>
          <EmptyList>Empty List</EmptyList>
        </Container>
      </>
    );
  }

  return (
    <>
      <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
      <Container isOpenSidebar={isOpenSidebar}>
        {type !== 'sub' ? <HomeSlider videos={videos} /> : null}
        <CategoryTitle>
          {type === 'sub' && videos ? 'Subscription' : 'Recommendations'}
        </CategoryTitle>
        <Row>
          {videos?.map((video) => (
            <Index key={video._id} video={video} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
