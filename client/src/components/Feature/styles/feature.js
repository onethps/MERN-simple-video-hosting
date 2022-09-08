import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  display: grid;
  max-width: 1600px;
  margin: 0 auto;
  grid-gap: 20px;
  padding: 80px 30px;

  grid-template:
    'video'
    'rec'
    'comments';

  @media only screen and (min-width: 992px) {
    grid-template:
      'video rec'
      'comments  rec';

    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto 1fr;
    position: static;
  }
`;

export const BaseContainer = styled.div`
  grid-area: video;
  margin-top: 10px;
`;

export const Player = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover; ;
`;

export const VideoTitle = styled.h2`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

export const VideoPrimaryInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InfoText = styled.div`
  color: ${({ theme }) => theme.text};
`;

export const MenuActionsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const Button = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const VideoSecondaryInfo = styled.div`
  margin-top: 10px;
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

export const TopRow = styled.div`
  display: flex;
  gap: 15px;
`;

export const Avatar = styled.img`
  min-width: 50px;
  height: 50px;
  border-radius: 100px;
`;

export const Owner = styled.div``;

export const OwnerSubCount = styled.div`
  color: ${({ theme }) => theme.text};
`;

export const OwnerName = styled.h4`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

export const SubscribeButton = styled.div`
  background-color: ${({ subStatus }) => (subStatus ? '#303030' : '#CC0000')};
  color: white;
  border: none;
  padding: 10px 30px;
  cursor: pointer;
`;

export const VideoDescription = styled.p`
  margin: 10px 0 10px 65px;
  color: ${({ theme }) => theme.text};
  display: -webkit-box;
  -webkit-line-clamp: ${({ showMore }) => (showMore ? 'none' : '2')};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ShowMoreButton = styled.span`
  margin: 10px 0 0 65px;
  color: grey;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`;

export const CommentsBox = styled.div`
  grid-area: comments;
  background-color: ${({ theme }) => theme.bg};
  margin-top: 30px;
`;

export const RecommendsBox = styled.div`
  grid-area: rec;
  background-color: ${({ theme }) => theme.bg};
`;
