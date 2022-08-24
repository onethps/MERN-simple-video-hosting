import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { instance } from 'api/config';
import { format } from 'timeago.js';
import {
  Container,
  ThumbnailBox,
  Desc,
  Thumbnail,
  Title,
  Views,
  Author,
} from './styles/card';

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const { data } = await instance.get(`/users/find/${video.userId}`);
      setChannel(data);
    };

    fetchChannel();
  }, [video.userId]);

  return (
    <Container type={type}>
      <Link type={type} to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
        <ThumbnailBox type={type}>
          <Thumbnail type={type} src={video.imgUrl} />
        </ThumbnailBox>
        <Desc>
          <Title>{video?.title}</Title>
          <Author>{channel?.name}</Author>
          <Views>
            {video?.views} views - {format(video?.createdAt)}
          </Views>
        </Desc>
      </Link>
    </Container>
  );
};

export default Card;
