import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.bgLighter};
  transition: all 0.2s ease-in-out;
  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    //set block for main page and grid for others
    display: ${(props) => (props.type === 'sm' ? 'grid' : 'block')};
    grid-template-rows: repeat(1, 100%);
    grid-template-columns: repeat(2, 50%);
    grid-gap: 15px;
    margin: 10px 6px;
  }

  &:hover {
    transform: scale(1.03);
    z-index: 5;
  }
`;
export const ThumbnailBox = styled.div`
  position: relative;
  padding: 0 0 58% 0;
`;

export const Thumbnail = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Title = styled.h1`
  margin-top: 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Desc = styled.div``;

export const Author = styled.h2`
  font-size: 14px;
  padding: 5px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
`;

export const Views = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
`;
