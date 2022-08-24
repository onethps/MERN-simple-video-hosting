import Card from 'components/Card';
import SidebarContainer from 'containers/sidebar';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from 'api/config';

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
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation().search;

  console.log(videos);

  useEffect(() => {
    const fetchQueryVideos = async () => {
      setLoading(true);
      setVideos(null);
      const { data } = await instance.get(`/videos/search/${location}`);
      setLoading(false);
      if (!data.length) {
        return;
      }
      setVideos(data);
    };
    fetchQueryVideos().catch((err) => console.log(err));
  }, [location]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      <SidebarContainer />
      <Container>
        {videos?.map((video) => (
          <Card key={video._id} video={video} type={'sm'} />
        ))}
        {!videos && <Text>NO RESULTS</Text>}
      </Container>
    </>
  );
};

export default SearchPage;
