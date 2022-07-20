import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CommentUser = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 20px;
`;

const ChannelAvatar = styled.img`
  min-width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 100px;
`;

const CommentUserDesc = styled.p`
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const Comment = ({ comment }) => {
  const [chanel, setChanel] = useState({});

  useEffect(() => {
    const fetchCommentChanel = async () => {
      try {
        const chanel = await axios.get(`/users/find/${comment.userId}`);
        setChanel(chanel.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommentChanel();
  }, []);

  return (
    <>
      <CommentUser>
        <ChannelAvatar src={chanel.img} />
        <div>
          <ChannelName>{chanel.name}</ChannelName>
          <CommentUserDesc>{comment.desc}</CommentUserDesc>
        </div>
      </CommentUser>
    </>
  );
};

export default Comment;