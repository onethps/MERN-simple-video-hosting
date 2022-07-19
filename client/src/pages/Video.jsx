import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  disLikeVideo,
  likeVideo,
  VideoFailure,
  VideoStart,
  VideoSuccess,
} from 'redux/videoSlice';
import { format } from 'timeago.js';
import Comments from 'components/Comments';
import { subHandleUser } from 'redux/userSlice';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Details = styled.div`
  color: ${({ theme }) => theme.text};
`;

const InfoViewsAndButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Views = styled.div`
  color: ${({ theme }) => theme.text};
`;
const Tittle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;
const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;
const Button = styled.div`
  cursor: pointer;
`;
const IconText = styled.h1`
  font-size: 16px;
  display: inline-block;
  padding: 0 15px;
  color: ${({ theme }) => theme.text};
`;
const Recommendation = styled.div`
  flex: 2;
  width: 200px;
`;

const SubscribeButton = styled.button`
  background-color: darkred;
  color: white;
  border: none;
  padding: 10px 30px;
  cursor: pointer;
`;
const UnSubscribeButton = styled.button`
  background-color: #626262;
  color: #000000;
  border: none;
  padding: 10px 30px;
  cursor: pointer;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 15px;
`;

const ChannelDetail = styled.div`
  margin-top: 10px;
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const SubscribersCount = styled.div``;

const VideoDescription = styled.p`
  margin: 10px 0 0 65px;
`;

const ChannelName = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const ChannelAvatar = styled.div`
  min-width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 100px;
`;

const Video = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user);

  const param = location.pathname.split('/')[2];
  const [channel, setChannel] = useState({});

  const { video } = useSelector((state) => state.video);
  const { loading } = useSelector((state) => state.video);

  const likeHandle = async () => {
    if (!video.likes.includes(currentUser.user._id)) {
      try {
        await axios.put(`/videos/like/${param}`);
        dispatch(likeVideo(currentUser.user._id));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const disLikeHandle = async () => {
    if (!video.dislikes.includes(currentUser.user._id)) {
      try {
        await axios.put(`/videos/dislike/${param}`);
        dispatch(disLikeVideo(currentUser.user._id));
      } catch (e) {
        dispatch(VideoFailure());
      }
    }
  };

  const subHandle = async () => {
    currentUser.user.subscribedUsers.includes(video.userId)
      ? await axios.delete(`/users/unsub/${video.userId}`)
      : await axios.put(`/users/sub/${video.userId}`);
    dispatch(subHandleUser(video.userId));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      dispatch(VideoStart());
      try {
        const video = await axios.get(`/videos/find/${param}`);
        const user = await axios.get(`/users/find/${video.data.userId}`);
        setChannel(user.data);
        dispatch(VideoSuccess(video.data));
      } catch (e) {
        dispatch(VideoFailure());
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={''} controls />
        </VideoWrapper>
        <Details>
          <Tittle>{video.title}</Tittle>
          <InfoViewsAndButtons>
            <Views>
              {video.views} views - {format(video?.createdAt)}
            </Views>

            <Buttons>
              <Button onClick={likeHandle}>
                {video.likes?.includes(currentUser.user._id) ? (
                  <AiFillLike />
                ) : (
                  <AiOutlineLike />
                )}{' '}
                <IconText>{video?.likes.length}</IconText>
              </Button>

              <Button onClick={disLikeHandle}>
                {video.dislikes?.includes(currentUser.user._id) ? (
                  <AiFillDislike />
                ) : (
                  <AiOutlineDislike />
                )}

                <IconText>Dislike</IconText>
              </Button>
              <Button>
                <FaShare />
                <IconText>Share</IconText>
              </Button>
            </Buttons>
          </InfoViewsAndButtons>
          <ChannelDetail>
            <ChannelInfo>
              <ChannelAvatar />
              <div>
                <ChannelName>{channel.name}</ChannelName>
                <SubscribersCount>{channel.subscribers} subscribers</SubscribersCount>
              </div>
            </ChannelInfo>

            {currentUser.user.subscribedUsers?.includes(video.userId) ? (
              <UnSubscribeButton onClick={subHandle}>Subscribed</UnSubscribeButton>
            ) : (
              <SubscribeButton onClick={subHandle}>Subscribe</SubscribeButton>
            )}
          </ChannelDetail>
          <VideoDescription>{video.desc}</VideoDescription>
        </Details>

        <Comments videoId={param} />
      </Content>
      <Recommendation>
        {/*<Card type={"sm"}/>*/}
        {/*<Card type={"sm"}/>*/}
        {/*<Card type={"sm"}/>*/}
      </Recommendation>
    </Container>
  );
};

export default  Video;