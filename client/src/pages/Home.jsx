import Layout from 'components/Layout';
import Spinner from 'components/LoaderSpinner';
import HomeSlider from 'components/Slider';
import VideoContainer from 'components/VideoContainer';
import CardContainer from 'containers/card';
import { useFetchVideosPagesData } from 'hooks/useFetchVideosPagesData';
import React from 'react';

const Home = () => {
  const { videos, loading } = useFetchVideosPagesData('allVideos');

  if (!videos && !loading) {
    return (
      <Layout>
        <VideoContainer.EmptyList>Empty List</VideoContainer.EmptyList>
      </Layout>
    );
  }

  return (
    <Layout>
      <VideoContainer>
        <HomeSlider />
        <VideoContainer.SectionTitle>Recommendations</VideoContainer.SectionTitle>
        <VideoContainer.Row>
          {videos
            ? videos.map((video) => <CardContainer key={video._id} video={video} />)
            : null}
        </VideoContainer.Row>
      </VideoContainer>

      {loading ? <Spinner /> : null}
    </Layout>
  );
};

export default Home;
