import ExtendedCard from 'components/ExtendedCard';
import Index from 'components/Layout';
import { useVideoListData } from 'hooks/useVideoListData';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  padding: 100px 100px;
  grid-template-columns: 1000px;
  gap: 10px;
  justify-content: center;
`;

const Text = styled.h1`
  text-align: center;
  color: white;
`;

const SearchPage = () => {
  const location = useLocation().search;
  const { videos, loading } = useVideoListData(`search/${location}`);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Index>
      <Container>
        {videos?.map((video) => (
          <ExtendedCard key={video._id} video={video} />
        ))}
        {!videos && <Text>NO RESULTS</Text>}
      </Container>
    </Index>
  );
};

export default SearchPage;
