import Card from 'components/Card';
import useFetchCurrentUser from 'hooks/useFetchCurrentUser';
import React from 'react';
import { format } from 'timeago.js';

const CardContainer = ({ video, type }) => {
  const { user } = useFetchCurrentUser(video?.userId);

  return (
    <Card type={type}>
      <Card.Link to={`/video/${video?._id}`}>
        <Card.ThumbnailBox>
          <Card.Thumbnail src={video?.imgUrl} />
        </Card.ThumbnailBox>
        <Card.Base>
          <Card.Title>{video?.title}</Card.Title>
          <Card.Author>{user?.name}</Card.Author>
          <Card.ViewsAndDate>
            {video?.views} views - {format(video?.createdAt)}
          </Card.ViewsAndDate>
        </Card.Base>
      </Card.Link>
    </Card>
  );
};

export default CardContainer;
