import { SidebarContext } from 'App';
import { RowExtendCardsWrapper } from 'components/ContentWrappers';
import { exploreCategories } from 'components/ExploreCategories';
import Layout from 'components/Layout';
import { SIDEBAR_COMPACT_SIZE, SIDEBAR_FULL_SIZE } from 'constants/constants';
import ExtendedCardContainer from 'containers/ecard';
import { useVideoListData } from 'hooks/useVideoListData';
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

export const CategoryHeader = styled.div`
  background-color: ${({ theme }) => theme.bgMediumLight};
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
    padding: 10px 25px;
    background-color: ${({ theme }) => theme.bgMediumLight};
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
  color: ${({ theme }) => theme.text};
`;

const ExploreCategory = () => {
  const { category } = useParams();
  const { videos } = useVideoListData(`category/${category}`);
  const { name, icon } = exploreCategories[category];

  const [fixedHeader, setFixedHeader] = useState(false);

  const { isOpenSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const scroller = () => {
      const top = window.scrollY;
      if (!fixedHeader && top >= 75) {
        setFixedHeader(true);
      } else if (fixedHeader && top < 75) {
        setFixedHeader(false);
      }
    };
    window.addEventListener('scroll', scroller);
    return () => window.removeEventListener('scroll', scroller);
  }, [fixedHeader]);

  return (
    <Layout>
      <CategoryHeader>
        <Wrapper>
          <IconBox fixedHeader={fixedHeader}> {icon} </IconBox>
          <TitleBox isOpenSidebar={isOpenSidebar} className={fixedHeader ? 'fixed' : ''}>
            <Title>{name}</Title>
          </TitleBox>
        </Wrapper>
      </CategoryHeader>
      <Content fixedHeader={fixedHeader}>
        <RowExtendCardsWrapper>
          {videos
            ? videos.map((video) => (
                <ExtendedCardContainer key={video._id} video={video} />
              ))
            : null}
        </RowExtendCardsWrapper>
      </Content>
    </Layout>
  );
};

export default ExploreCategory;
