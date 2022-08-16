import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Index } from 'components/Card';
import styled from 'styled-components';
import { instance } from 'api/config';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const SearchPage = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation().search;

  useEffect(() => {
    const fetchQueryVideos = async () => {
      const { data } = await instance.get(`/videos/search/${location}`);
      setVideos(data);
    };
    fetchQueryVideos().catch((err) => console.log(err));
  }, [location]);

  return (
    <Container>
      {videos.map((video) => (
        <Index key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default SearchPage;
