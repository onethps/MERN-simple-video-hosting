import { instance } from 'api/config';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import {
  Container,
  Thumbnail,
  Title,
  ViewsAndData,
  ProfileName,
  ProfileImage,
  ProfileBlock,
  Desc,
  VideoTextContainer,
} from './styles/extendedcard';
import React, { useEffect, useState } from 'react';

const ExtendedCard = ({ video }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await instance.get(`users/find/${video.userId}`);
      setUser(data);
    };
    fetchUser().catch((err) => console.log(err));
  }, []);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      <Container>
        <Thumbnail src={video?.imgUrl} />
        <VideoTextContainer>
          <Title>{video?.title}</Title>
          <ProfileBlock>
            <ProfileImage src={user?.img} />
            <ProfileName>{user?.name}</ProfileName>
          </ProfileBlock>

          <ViewsAndData>
            {video?.views} views - {format(video?.createdAt)}
          </ViewsAndData>

          <Desc>{video?.desc}</Desc>
        </VideoTextContainer>
      </Container>
    </Link>
  );
};

export default ExtendedCard;
