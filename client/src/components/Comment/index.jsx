import {
  Container,
  AuthorAvatar,
  MainCommentBox,
  CommentContent,
  ChannelName,
} from './styles/comment';
import React from 'react';

const Comment = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Comment.AuthorAvatar = function AuthorAvatarComments({ src, ...restProps }) {
  return <AuthorAvatar {...restProps} src={src} />;
};

Comment.Main = function MainComments({ children, ...restProps }) {
  return <MainCommentBox {...restProps}>{children}</MainCommentBox>;
};

Comment.ChannelName = function ChannelNameComments({ children, ...restProps }) {
  return <ChannelName {...restProps}>{children}</ChannelName>;
};

Comment.CommentContent = function CommentContentComments({ children, ...restProps }) {
  return <CommentContent {...restProps}>{children}</CommentContent>;
};

export default Comment;
