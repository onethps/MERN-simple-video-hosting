import ExtendedCard from 'components/ExtendedCard';
import UseFetchCurrentUser from 'hooks/useFetchCurrentUser';
import { format } from 'timeago.js';
import React from 'react';

const ExtendedCardContainer = ({ video }) => {
  const { user } = UseFetchCurrentUser(video?.userId);

  return (
    <ExtendedCard>
      <ExtendedCard.Link to={`/video/${video?._id}`}>
        <ExtendedCard.Thumbnail src={video?.imgUrl} />
      </ExtendedCard.Link>
      <ExtendedCard.Base>
        <ExtendedCard.Title>{video?.title}</ExtendedCard.Title>
        <ExtendedCard.ProfileFrame>
          <ExtendedCard.ProfileImage src={user?.img} />
          <ExtendedCard.ProfileName>{user?.name}</ExtendedCard.ProfileName>
        </ExtendedCard.ProfileFrame>
        <ExtendedCard.ViewsAndData>
          {video?.views} views - {format(video?.createdAt)}
        </ExtendedCard.ViewsAndData>
        <ExtendedCard.Description>{video?.desc}</ExtendedCard.Description>
      </ExtendedCard.Base>
    </ExtendedCard>
  );
};

export default ExtendedCardContainer;
