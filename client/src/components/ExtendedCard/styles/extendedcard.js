import { Link } from 'react-router-dom';
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

export const ECardLink = styled(Link)`
  font-size: 14px;
  flex: 1;
`;

export const Thumbnail = styled.img`
  object-fit: cover;
  min-width: 100px;
  max-width: 300px;
  height: 100%;

  @media only screen and ${devices.tablet} {
    max-width: 300px;
  }
`;

export const Base = styled.div`
  font-size: 14px;
  flex: 1;

  @media only screen and ${devices.tablet} {
    flex: 3;
  }
`;

export const Title = styled.h1`
  cursor: default;
  opacity: 1;
  font-size: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 60px;
  overflow: hidden;
`;
export const ViewsAndData = styled.span`
  cursor: default;
  opacity: 0.5;
`;

export const ProfileBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px 0;

  @media only screen and ${devices.tablet} {
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
  cursor: default;
  opacity: 0.5;
`;
export const Desc = styled.p`
  cursor: default;
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
