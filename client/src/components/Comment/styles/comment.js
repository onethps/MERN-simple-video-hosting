import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

export const MainCommentBox = styled.div``;

export const CommentContent = styled.p`
  color: ${({ theme }) => theme.text};
`;

export const ChannelName = styled.h4`
  color: ${({ theme }) => theme.text};
  padding: 0;
  margin: 0;
`;

export const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30px;
`;
