import styled from 'styled-components';
import { devices } from 'styles/variables';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 12px;

  @media only screen and ${devices.tablet} {
    font-size: 16px;
  }
`;

export const Thumbnail = styled.img`
  object-fit: cover;
  width: 100%;
  height: 150px;
  background-color: grey;
  flex: 2;

  @media only screen and ${devices.tablet} {
    flex: 1;
    max-width: 300px;
  }
`;

export const VideoTextContainer = styled.div`
  flex: 2;
`;

export const Title = styled.h1`
  opacity: 1;
  font-size: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  max-height: 40px;
  overflow: hidden;
`;
export const ViewsAndData = styled.span`
  opacity: 0.5;
`;

export const ProfileBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0;

  @media only screen and ${devices.tablet} {
    padding: 0;
  }
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  display: none;

  @media only screen and ${devices.tablet} {
    display: block;
  }
`;
export const ProfileName = styled.span`
  opacity: 0.5;
`;
export const Desc = styled.p`
  opacity: 0.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 10px 0;

  @media only screen and ${devices.tablet} {
    margin: 0;
  }
`;
