import { instance } from 'api/config';
import { SidebarContext } from 'App';
import { Index } from 'components/Card';
import Skeleton from 'components/Skeleton';
import SidebarContainer from 'containers/sidebar';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/userSlice';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1998px;
  margin: 0 auto;
  padding: 70px 20px;

  @media only screen and (min-width: 990px) {
    //margin-left: 100px;
    margin-left: ${({ isOpenSidebar }) => (!isOpenSidebar ? '100px' : '300px')};
  }

  @media only screen and (min-width: 2582px) {
    margin: 0 auto;
  }
`;

const Row = styled.div`
  display: grid;
  grid-gap: 5px;

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
  margin-top: 100px;
`;

const EmptyList = styled.h1`
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const CategoryTitle = styled.h1`
  //position: absolute;
  top: 70px;
  //left: 0;
  //right: 0;
  text-align: center;
  color: ${({ theme }) => theme.text};

  //   @media only screen and (min-width: 997px) {
  //     position: static;
  //     text-align: left;
  //     top: 0;
  //   }
  //
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  // const nav = useNavigate();

  const { isOpenSidebar, setIsOpenSidebar } = useContext(SidebarContext);
  const { user } = useSelector(userSelector);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { data } = await instance.get(`videos/${type}`);
      setVideos(data);
      setLoading(false);
    };

    fetchVideos().catch((err) => console.log(err));
  }, [type]);

  if (!videos?.length) {
    return (
      <Container>
        <EmptyList>Empty List</EmptyList>
      </Container>
    );
  }

  if (loading) {
    return (
      <LoadingBlock>
        {[...new Array(6)].map((skeleton, i) => (
          <Skeleton key={i + new Date().getTime()} type={'medium'} />
        ))}
      </LoadingBlock>
    );
  }

  return (
    <>
      <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
      <Container isOpenSidebar={isOpenSidebar}>
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
