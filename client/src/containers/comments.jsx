import { instance } from 'api/config';
import Comments from 'components/Comments';
import CommentContainer from 'containers/comment';
import React, { useEffect, useState } from 'react';

const CommentsContainer = ({ user, videoId }) => {
  const [newComment, setNewComment] = useState('');
  const [isActiveComment, setIsActiveComment] = useState(false);
  const [comments, setComments] = useState([]);

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
    fetchComments().catch((err) => console.log(err));
    setIsActiveComment(false);
    setNewComment('');
  };

  const onCancelButtonHandle = () => {
    setIsActiveComment(false);
    setNewComment('');
  };

  console.log(comments);

  return (
    <Comments>
      <Comments.InputRow>
        <Comments.Avatar src={user?.img} />
        <Comments.Input
          placeholder={'Add a comment...'}
          onChange={newCommentHandle}
          value={newComment}
          onClick={() => setIsActiveComment(true)}
        />
      </Comments.InputRow>
      {isActiveComment ? (
        <Comments.Buttons>
          <Comments.CancelButton onClick={onCancelButtonHandle} />
          <Comments.SubmitButton
            type={newComment ? 'active' : null}
            onClick={setNewCommentHandle}
            disabled={!newComment}
          />
        </Comments.Buttons>
      ) : null}

      <Comments.List>
        {comments?.map((comment) => {
          return <CommentContainer key={comment._id} comment={comment} />;
        })}
      </Comments.List>
    </Comments>
  );
};

export default CommentsContainer;
