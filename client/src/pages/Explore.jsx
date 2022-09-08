import { ExploreWrapper, RowExtendCardsWrapper } from 'components/ContentWrappers';
import ExploreCategories from 'components/ExploreCategories';
import Layout from 'components/Layout';
import Spinner from 'components/LoaderSpinner';
import VideoContainer from 'components/VideoContainer';
import ExtendedCardContainer from 'containers/ecard';
import { useFetchVideosPagesData } from 'hooks/useFetchVideosPagesData';
import React from 'react';

const Explore = () => {
  const { videos, loading } = useFetchVideosPagesData(`trends`);

  return (
    <Layout>
      <ExploreCategories>
        <ExploreCategories.Categories />
      </ExploreCategories>

      <ExploreWrapper>
        <VideoContainer.SectionTitle>Popular Videos</VideoContainer.SectionTitle>

        <RowExtendCardsWrapper>
          {videos
            ? videos.map((video) => (
                <ExtendedCardContainer key={video._id} video={video} />
              ))
            : null}
        </RowExtendCardsWrapper>
        {loading ? <Spinner /> : null}
      </ExploreWrapper>
    </Layout>
  );
};

export default Explore;
