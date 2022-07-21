import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from 'components/Card';
import axios from 'axios';

const Recommendation = styled.div`
  flex: 2;
  width: 200px;
`;

const Recomendation = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchRecommendationVideos = async () => {
      const { data } = await axios.get(`/videos/random/`);
      setVideos(data);
    };
    fetchRecommendationVideos();
  }, []);

  return (
    <Recommendation>
      {videos?.map((currentVideo) => (
        <Card key={currentVideo._id} type={'sm'} video={currentVideo} />
      ))}
    </Recommendation>
  );
};

export default Recomendation;