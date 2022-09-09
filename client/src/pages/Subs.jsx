import Layout from 'components/Layout';
import Spinner from 'components/LoaderSpinner';
import VideoContainer from 'components/VideoContainer';
import CardContainer from 'containers/card';
import { useVideoListData } from 'hooks/useVideoListData';
import React from 'react';

const Subs = () => {
  const { loading, videos } = useVideoListData(`sub`);
  console.log(videos);

  return (
    <Layout>
      <VideoContainer>
        <VideoContainer.SectionTitle>Subscriptions</VideoContainer.SectionTitle>
        <VideoContainer.Row>
          {videos
            ? videos.map((video) => <CardContainer key={video._id} video={video} />)
            : null}
        </VideoContainer.Row>
        {loading ? <Spinner /> : null}
      </VideoContainer>
    </Layout>
  );
};

export default Subs;
