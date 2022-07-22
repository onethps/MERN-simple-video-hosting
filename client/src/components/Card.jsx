import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import {instance} from "api/config";

const Container = styled.div`
  width: ${(props) => (props.type === 'sm' ? '100%' : '350px')};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 20px;
`;

const ThumbNail = styled.img`
  min-width: ${(props) => (props.type === 'sm' ? '50%' : '100%')};
  object-fit: cover;
  height: ${(props) => (props.type === 'sm' ? '120px' : '196px')};
  border-radius: 20px;
  background: grey;
`;

const Description = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  color: ${({theme}) => theme.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: ${({theme}) => theme.text};
`;

const Views = styled.div`
  font-size: 12px;
  color: ${({theme}) => theme.text};
`;

const LoadingBlock = styled.div`
  margin-top: 60px;
`;

function Card({type, video}) {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const {data} = await instance.get(`/users/find/${video.userId}`);
      setChannel(data);
    };

    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{textDecoration: 'none'}}>
      <Container type={type}>
        <ThumbNail type={type} src={video.imgUrl}/>
        <Description>
          <Title>{video?.title}</Title>
          <Author>{channel?.name}</Author>
          <Views>
            {video?.views} views - {format(video.createdAt)}
          </Views>
        </Description>
      </Container>
    </Link>
  );
}


export {Card};
