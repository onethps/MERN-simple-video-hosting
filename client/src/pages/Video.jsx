import { instance } from 'api/config';
import Feature from 'components/Feature';
import Skeleton from 'components/Skeleton';
import { SIGN_IN_ROUTE } from 'constants/routes';
import CardContainer from 'containers/card';
import CommentsContainer from 'containers/comments';
import { useCurrentVideoData } from 'hooks/useCurrentVideoData';
import SignIn from 'pages/SignIn';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { subHandleUser, userSelector } from 'redux/userSlice';
import { disLikeVideo, likeVideo, VideoFailure } from 'redux/videoSlice';
import { format } from 'timeago.js';

const Video = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, [id]);

  const currentUser = useSelector(userSelector);
  const { videoOwner, recommendations } = useCurrentVideoData(id);
  const { video } = useSelector((state) => state.video);
  const { loading } = useSelector((state) => state.video);

  const likeHandle = async () => {
    if (!video.likes.includes(currentUser.user._id)) {
      try {
        await instance.put(`/videos/like/${id}`);
        dispatch(likeVideo(currentUser.user._id));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const disLikeHandle = async () => {
    if (!video.dislikes.includes(currentUser.user._id)) {
      try {
        await instance.put(`/videos/dislike/${id}`);
        dispatch(disLikeVideo(currentUser.user._id));
      } catch (e) {
        dispatch(VideoFailure());
      }
    }
  };

  const subHandle = async () => {
    currentUser.user.subscribedUsers.includes(video.userId)
      ? await instance.delete(`/users/unsub/${video.userId}`)
      : await instance.put(`/users/sub/${video.userId}`);
    dispatch(subHandleUser(video.userId));
  };

  if (loading || !currentUser) {
    return (
      <Feature>
        <Feature.Base>
          <Skeleton type={'large'} />
        </Feature.Base>
        <div>
          {[...new Array(3)].map((el, i) => (
            <Skeleton key={(i + 1).toString()} type={'sm'} />
          ))}
        </div>
      </Feature>
    );
  }

  return (
    <Feature>
      <Feature.Base>
        <Feature.Player src={video?.videoUrl} controls />
        <Feature.VideoTitle title={video?.title} />
        <Feature.VideoPrimaryInfo>
          <Feature.InfoText
            viewsCount={video?.views}
            publishDate={format(video?.createdAt)}
          />
          <Feature.MenuActionsContainer>
            <Feature.LikeButton
              onClick={likeHandle}
              countOfLikes={video?.likes.length}
              currentIcon={video?.likes?.includes(currentUser?.user._id)}
            />
            <Feature.DislikeButton
              onClick={disLikeHandle}
              currentIcon={video?.dislikes?.includes(currentUser?.user._id)}
            />
            <Feature.ShareButton text={'Share'} />
          </Feature.MenuActionsContainer>
        </Feature.VideoPrimaryInfo>

        <Feature.VideoSecondaryInfo>
          <Feature.TopRow>
            <Feature.Avatar src={videoOwner?.img} />
            <Feature.Owner>
              <Feature.OwnerName>{videoOwner?.name}</Feature.OwnerName>
              <Feature.OwnerSubCount subCount={videoOwner?.subscribers} />
            </Feature.Owner>
          </Feature.TopRow>
          <Feature.SubscribeButton
            onClick={subHandle}
            subStatus={currentUser.user.subscribedUsers?.includes(video?.userId)}
          />
        </Feature.VideoSecondaryInfo>
        <Feature.VideoDescription>{video?.desc}</Feature.VideoDescription>
      </Feature.Base>

      <Feature.Comments>
        <CommentsContainer videoId={id} user={currentUser?.user} />
      </Feature.Comments>

      <Feature.Recommends>
        {recommendations?.map((currentVideo) => (
          <CardContainer key={currentVideo._id} type={'sm'} video={currentVideo} />
        ))}
      </Feature.Recommends>
    </Feature>
  );
};

export default Video;
