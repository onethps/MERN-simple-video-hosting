import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Card} from 'components/Card';
import {instance} from "api/config";

const Recommendation = styled.div`
  width: 100%;
  grid-area: rec;
`;

const Recomendation = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchRecommendationVideos = async () => {
      const {data} = await instance.get(`/videos/random/`);
      setVideos(data);
    };
    fetchRecommendationVideos();
  }, []);

  return (
    <Recommendation>
      {videos?.map((currentVideo) => (
        <Card key={currentVideo._id} type={'sm'} video={currentVideo}/>
      ))}
    </Recommendation>
  );
};

export default Recomendation;