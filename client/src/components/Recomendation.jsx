import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Index } from 'components/Card';
import { instance } from 'api/config';

const Recommendation = styled.div`
  grid-area: rec;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Recomendation = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchRecommendationVideos = async () => {
      const { data } = await instance.get(`/videos/random/`);
      setVideos(data);
    };
    fetchRecommendationVideos();
  }, []);

  return (
    <Recommendation>
      {videos?.splice(0, 6).map((currentVideo) => (
        <Index key={currentVideo._id} type={'sm'} video={currentVideo} />
      ))}
    </Recommendation>
  );
};

export default Recomendation;
