import { instance } from 'api/config';
import Comment from 'components/Comment';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: comments;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const NewCommentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 50px;
`;

const CommentInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  border-bottom: 1px solid grey;
  outline: none;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
`;
const ChannelAvatar = styled.img`
  min-width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 100px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const Button = styled.button`
  text-transform: uppercase;
  padding: 10px 25px;
  border: none;
  background-color: ${(props) => (props.type === 'active' ? 'blue' : '')};
  color: ${(props) => (props.type === 'active' ? 'white' : '')};
`;

const Cancel = styled.button`
  text-transform: uppercase;
  padding: 10px 25px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text};
`;

const CommentsUsers = styled.div`
  margin-bottom: 10%;
`;

const Comments = memo(({ videoId }) => {
  const [comments, setComments] = useState([]);

  const { user } = useSelector((state) => state.user);

  const [isActiveComment, setIsActiveComment] = useState(false);
  const [newComment, setNewComment] = useState('');

  const newCommentHandle = (e) => {
    setNewComment(e.currentTarget.value);
  };

  const fetchComments = async () => {
    const comments = await instance.get(`/comments/find/${videoId}`);
    setComments(comments.data);
  };

  useEffect(() => {
    fetchComments().catch((err) => console.log(err));
  }, [videoId]);

  const setNewCommentHandle = async () => {
    await instance.post(`/comments/${videoId}`, { desc: newComment });
    fetchComments();
    setIsActiveComment(false);
    setNewComment('');
  };

  const onCancelButtonHandle = () => {
    setIsActiveComment(false);
    setNewComment('');
  };

  const RenderCommentItems = useMemo(
    () =>
      comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} commentOwner={comment.user} />
      )),
    [comments],
  );

  return (
    <Container>
      <NewCommentBox>
        <ChannelAvatar src={user.img} />
        <CommentInput
          placeholder={'Add a comment...'}
          onChange={newCommentHandle}
          value={newComment}
          onClick={() => setIsActiveComment(true)}
        />
      </NewCommentBox>

      {isActiveComment && (
        <Buttons>
          <Cancel onClick={onCancelButtonHandle}>Cancel</Cancel>
          <Button
            type={newComment && 'active'}
            onClick={setNewCommentHandle}
            disabled={!newComment}
          >
            Comment
          </Button>
        </Buttons>
      )}
      <CommentsUsers>{RenderCommentItems}</CommentsUsers>
    </Container>
  );
});

Comments.displayName = 'Comments';

export default Comments;
