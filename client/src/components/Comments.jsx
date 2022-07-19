import React, { useEffect, useState } from 'react';
import Comment from 'components/Comment';
import axios from 'axios';
import styled from 'styled-components';

const SendComment = styled.button``;

const NewCommentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CommentInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  border-bottom: 1px solid grey;
  outline: none;
  color: ${({ theme }) => theme.text};
`;
const ChannelAvatar = styled.div`
  min-width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 100px;
`;

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState('');

  const newCommentHandle = (e) => {
    setNewComment(e.currentTarget.value);
  };

  const fetchComments = async () => {
    try {
      const comments = await axios.get(`/comments/find/${videoId}`);
      setComments(comments.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchComments().catch((e) => console.log(e));
  }, [videoId]);

  const setNewCommentHandle = async () => {
    await axios.post(`/comments/${videoId}`, { desc: newComment });
    fetchComments();
    setNewComment('');
  };

  return (
    <>
      <NewCommentBox>
        <ChannelAvatar />
        <CommentInput
          placeholder={'Add a comment...'}
          onChange={newCommentHandle}
          value={newComment}
        />
        <SendComment onClick={setNewCommentHandle}>Send</SendComment>
      </NewCommentBox>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} commentOwner={comment.user} />
      ))}
    </>
  );
};

export default Comments;