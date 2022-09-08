import { ExploreWrapper, RowExtendCardsWrapper } from 'components/ContentWrappers';
import Layout from 'components/Layout';
import Spinner from 'components/LoaderSpinner';
import VideoContainer from 'components/VideoContainer';
import ExtendedCardContainer from 'containers/ecard';
import { useVideoListData } from 'hooks/useVideoListData';
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation().search;
  const { videos, loading } = useVideoListData(`search/${location}`);

  if (!videos) {
    return (
      <Layout>
        <VideoContainer.EmptyList>No Search Results...</VideoContainer.EmptyList>
      </Layout>
    );
  }

  return (
    <Layout>
      <ExploreWrapper>
        <RowExtendCardsWrapper>
          {videos?.map((video) => (
            <ExtendedCardContainer key={video._id} video={video} />
          ))}

          {loading ? <Spinner /> : null}
        </RowExtendCardsWrapper>
      </ExploreWrapper>
    </Layout>
  );
};

export default SearchPage;
