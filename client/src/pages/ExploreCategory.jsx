import { SidebarContext } from 'App';
import CategorySubHeader from 'components/CategorySubheader';
import {
  ContentCategoryWrapper,
  RowExtendCardsWrapper,
} from 'components/ContentWrappers';
import { exploreCategories } from 'components/ExploreCategories';
import Layout from 'components/Layout';
import ExtendedCardContainer from 'containers/ecard';
import { useVideoListData } from 'hooks/useVideoListData';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      <CategorySubHeader>
        <CategorySubHeader.Wrapper>
          <CategorySubHeader.Icon fixedHeader={fixedHeader}>
            {icon}
          </CategorySubHeader.Icon>
          <CategorySubHeader.Title
            isOpenSidebar={isOpenSidebar}
            className={fixedHeader ? 'fixed' : ''}
          >
            {name}
          </CategorySubHeader.Title>
        </CategorySubHeader.Wrapper>
      </CategorySubHeader>
      <ContentCategoryWrapper fixedHeader={fixedHeader}>
        <RowExtendCardsWrapper>
          {videos
            ? videos.map((video) => (
              <ExtendedCardContainer key={video._id} video={video} />
            ))
            : null}
        </RowExtendCardsWrapper>
      </ContentCategoryWrapper>
    </Layout>
  );
};

export default ExploreCategory;
