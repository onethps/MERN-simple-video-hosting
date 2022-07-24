import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {instance} from "api/config";
import {format} from "timeago.js";


const Container = styled.div`
  background-color: ${({theme}) => theme.bg};
  
  & a {
    text-decoration: none;
    color: ${({theme}) => theme.text};
    cursor: pointer;
    //set block for main page and grid for others
    display: ${(props) => (props.type === 'sm' ? 'grid' : 'block')};
    grid-template-rows: repeat(1, 100%);
    grid-template-columns: repeat(2, 50%);    
    
    grid-gap: 15px;
    margin: 10px 6px;
  }
`
const ThumbnailBox = styled.div`
  position: relative;
  padding: 0 0 58% 0;
`

const Thumbnail = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Title = styled.h1`
  margin-top: 10px;
  font-size: 1rem;
  color: ${({theme}) => theme.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  
  

`

const Desc = styled.div`
`

const Author = styled.h2`
  font-size: 14px;
  padding: 5px 0;
  font-weight: 400;
  color: ${({theme}) => theme.text};
`

const Views = styled.div`
  font-size: 12px;
  color: ${({theme}) => theme.text};
`

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
    <Container type={type}>
      <Link type={type} to={`/video/${video._id}`} style={{textDecoration: 'none'}}>
        <ThumbnailBox type={type}>
          <Thumbnail type={type} src={video.imgUrl}/>
        </ThumbnailBox>
        <Desc>
          <Title>{video?.title}</Title>
          <Author>{channel?.name}</Author>
          <Views>{video?.views} views - {format(video?.createdAt)}</Views>
        </Desc>
      </Link>
    </Container>
  );
}


export {Card};
