import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import { firstCharAvatarGenerator } from 'utils/firstCharAvatarGenerator';

const Container = styled.div`
  width: ${(props) => (props.type === 'sm' ? '100%' : '19vw')};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 20px;
`;

const ThumbNail = styled.img`
  min-width: 50%;
  object-fit: cover;
  height: ${(props) => (props.type === 'sm' ? '100px' : '196px')};
  border-radius: 20px;
  background: grey;
`;

const Details = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: ${(props) => (props.type === 'sm' ? 'none' : 'block')};
`;

const Description = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  text-overflow: ellipsis;
`;

const Author = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;

const Views = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

function Card({ type, video }) {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const { data } = await axios.get(`/users/find/${video.userId}`);
      setChannel(data);
    };

    fetchChannel();
  }, [video.userId]);

  if (!channel) {
    return <div>loading</div>;
  }

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <ThumbNail type={type} src={video.imgUrl} />
        <Details>
          <Avatar
            type={type}
            src={channel.img || firstCharAvatarGenerator(channel?.name)}
          />
          <Description>
            <Title>{video.title}</Title>
            <Author>{channel.name}</Author>
            <Views>
              {video.views} views - {format(video.createdAt)}
            </Views>
          </Description>
        </Details>
      </Container>
    </Link>
  );
}

export {Card};
