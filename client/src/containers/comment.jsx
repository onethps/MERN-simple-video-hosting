import { instance } from 'api/config';
import Comment from 'components/Comment';
import React, { useEffect, useState } from 'react';

const CommentContainer = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchCommentChanel = async () => {
      try {
        const chanel = await instance.get(`/users/find/${comment.userId}`);
        setChannel(chanel.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommentChanel().catch((err) => console.log(err));
  }, []);

  return (
    <Comment>
      <Comment.AuthorAvatar src={channel.img} />
      <Comment.Main>
        <Comment.ChannelName>{channel.name}</Comment.ChannelName>
        <Comment.CommentContent>{comment.desc}</Comment.CommentContent>
      </Comment.Main>
    </Comment>
  );
};

export default CommentContainer;
