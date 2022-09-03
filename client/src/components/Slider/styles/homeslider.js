import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const CarouselBox = styled(Swiper)`
  width: 100%;
  height: 100%;
  margin-top: 2%;

  & .swiper-slide {
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  & .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.text};
  }
`;

export const ThumbnailImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80%;
`;
