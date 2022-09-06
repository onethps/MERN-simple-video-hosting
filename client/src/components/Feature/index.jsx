import React from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import {
  Container,
  Owner,
  TopRow,
  Avatar,
  Button,
  InfoText,
  BaseContainer,
  Player,
  MenuActionsContainer,
  VideoPrimaryInfo,
  VideoSecondaryInfo,
  VideoTitle,
  OwnerSubCount,
  OwnerName,
  SubscribeButton,
  VideoDescription,
  CommentsBox,
} from './styles/feature';

export default function Feature({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Feature.Base = function BaseFeature({ children, ...restProps }) {
  return <BaseContainer {...restProps}>{children}</BaseContainer>;
};

Feature.Player = function PlayerFeature({ src, ...restProps }) {
  return <Player src={src} {...restProps} />;
};

Feature.VideoTitle = function SectionTitleFeature({ title, ...restProps }) {
  return <VideoTitle {...restProps}>{title}</VideoTitle>;
};

Feature.VideoPrimaryInfo = function VideoPrimaryInfoFeature({ children, ...restProps }) {
  return <VideoPrimaryInfo {...restProps}>{children}</VideoPrimaryInfo>;
};

Feature.InfoText = function InfoTextFeature({ viewsCount, publishDate, ...restProps }) {
  return (
    <InfoText {...restProps}>
      {viewsCount} views - {publishDate}
    </InfoText>
  );
};

Feature.MenuActionsContainer = function MenuActionsContainerFeature({
  children,
  ...restProps
}) {
  return <MenuActionsContainer {...restProps}>{children}</MenuActionsContainer>;
};

Feature.LikeButton = function LikeButtonFeature({
  currentIcon = true,
  countOfLikes = 0,
  ...restProps
}) {
  return (
    <Button {...restProps}>
      {currentIcon ? <AiFillLike /> : <AiOutlineLike />}
      {countOfLikes}
    </Button>
  );
};

Feature.DislikeButton = function DislikeButtonFeature({ currentIcon, ...restProps }) {
  return (
    <Button {...restProps}>
      {currentIcon ? <AiFillDislike /> : <AiOutlineDislike />}
      Dislike
    </Button>
  );
};

Feature.ShareButton = function DislikeButtonFeature({ text, ...restProps }) {
  return (
    <Button {...restProps}>
      <RiShareForwardFill />
      {text}
    </Button>
  );
};

Feature.VideoSecondaryInfo = function VideoSecondaryInfoFeature({
  children,
  ...restProps
}) {
  return <VideoSecondaryInfo {...restProps}>{children}</VideoSecondaryInfo>;
};

Feature.TopRow = function TopRowFeature({ children, ...restProps }) {
  return <TopRow {...restProps}>{children}</TopRow>;
};

Feature.Avatar = function AvatarFeature({ src, ...restProps }) {
  return <Avatar {...restProps} src={src} />;
};

Feature.Owner = function OwnerFeature({ children, ...restProps }) {
  return <Owner {...restProps}>{children}</Owner>;
};

Feature.OwnerName = function OwnerNameFeature({ children, ...restProps }) {
  return <OwnerName {...restProps}>{children}</OwnerName>;
};

Feature.OwnerSubCount = function OwnerSubCountFeature({ subCount, ...restProps }) {
  return <OwnerSubCount {...restProps}>{subCount} subscribers</OwnerSubCount>;
};

Feature.SubscribeButton = function SubscribeButtonFeature({ subStatus, ...restProps }) {
  return (
    <SubscribeButton {...restProps} subStatus={subStatus}>
      {subStatus ? 'SUBSCRIBED' : 'SUBSCRIBE'}
    </SubscribeButton>
  );
};

Feature.VideoDescription = function VideoDescriptionFeature({ children, ...restProps }) {
  return <VideoDescription {...restProps}>{children}</VideoDescription>;
};
Feature.Comments = function CommentsFeature({ children, ...restProps }) {
  return <CommentsBox {...restProps}>{children}</CommentsBox>;
};
