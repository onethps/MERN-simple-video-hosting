import Layout from 'components/Layout';
import Spinner from 'components/LoaderSpinner';
import { SIDEBAR_COMPACT_SIZE } from 'constants/constants';
import ExtendedCardContainer from 'containers/ecard';
import { useVideoListData } from 'hooks/useVideoListData';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from 'styles/variables';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  justify-content: center;
  max-width: 990px;
  margin: 0 auto;
  padding: 3%;

  @media only screen and ${devices.tablet} {
  }

  @media only screen and ${devices.laptop} {
    padding: 0;
    margin-top: 50px;
  }
`;

const Text = styled.h1`
  text-align: center;
  color: white;
`;

const SearchPage = () => {
  const location = useLocation().search;
  const { videos, loading } = useVideoListData(`search/${location}`);

  return (
    <Layout>
      <Container>
        {videos?.map((video) => (
          <ExtendedCardContainer key={video._id} video={video} />
        ))}

        {loading ? <Spinner /> : null}
        {!videos && <Text>NO RESULTS</Text>}
      </Container>
    </Layout>
  );
};

export default SearchPage;
