import { SidebarContext } from 'App';
import ExtendedCard from 'components/ExtendedCard';
import Index from 'components/Layout';
import { SIDEBAR_COMPACT_SIZE, SIDEBAR_FULL_SIZE } from 'constants/constants';
import { useVideoListData } from 'hooks/useVideoListData';
import { exploreCategories } from 'pages/Explore/Explore';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from 'styles/variables';

export const Container = styled.div``;

export const Content = styled.div`
  width: 100%;
  margin: ${({ fixedHeader }) => (fixedHeader ? '200px auto' : '80px auto')};
  padding: 0 4%;

  @media only screen and ${devices.laptop} {
    max-width: 1298px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-gap: 10px;

  @media only screen and ${devices.mobileL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CategoryHeader = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  width: 100%;
  align-items: center;
  position: relative;
  padding: 0 4%;
`;

export const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1298px;
  margin: 0 auto;
`;

export const IconBox = styled.div`
  display: ${({ fixedHeader }) => (fixedHeader ? 'none' : 'flex')};
  max-width: 1298px;
  padding: 0 4%;
  margin: 0 auto;
`;

export const TitleBox = styled.div`
  &.fixed {
    z-index: 100;
    position: fixed;
    top: 70px;
    padding: 0 25px;
    background-color: ${({ theme }) => theme.bg2};
    left: 0;
    right: 0;

    @media only screen and ${devices.mobileL} {
      left: ${SIDEBAR_COMPACT_SIZE};
    }

    @media only screen and ${devices.laptop} {
      left: ${({ isOpenSidebar }) =>
        !isOpenSidebar ? SIDEBAR_COMPACT_SIZE : SIDEBAR_FULL_SIZE};
    }
  }
`;

export const Title = styled.h2`
  max-width: 1298px;
  width: 100%;
  padding: 0 4%;
  margin: 0 auto;
  justify-content: flex-start;
  color: white;
`;

const ExploreCategory = () => {
  const { category } = useParams();
  const { videos } = useVideoListData(`category/${category}`);
  const { name, icon } = exploreCategories[category];

  const [fixedHeader, setFixedHeader] = useState(false);

  const { isOpenSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const scroller = () => {
      // eslint-disable-next-line no-undef
      const top = window.scrollY;
      if (!fixedHeader && top >= 75) {
        setFixedHeader(true);
      } else if (fixedHeader && top < 75) {
        setFixedHeader(false);
      }
    };
    // eslint-disable-next-line no-undef
    window.addEventListener('scroll', scroller);
    // eslint-disable-next-line no-undef
    return () => window.removeEventListener('scroll', scroller);
  }, [fixedHeader]);

  return (
    <Index>
      <CategoryHeader>
        <Wrapper>
          <IconBox fixedHeader={fixedHeader}> {icon} </IconBox>
          <TitleBox isOpenSidebar={isOpenSidebar} className={fixedHeader ? 'fixed' : ''}>
            <Title>{name}</Title>
          </TitleBox>
        </Wrapper>
      </CategoryHeader>
      <Content fixedHeader={fixedHeader}>
        <Row>
          {videos
            ? videos.map((video) => <ExtendedCard key={video._id} video={video} />)
            : null}
        </Row>
      </Content>
    </Index>
  );
};

export default ExploreCategory;
