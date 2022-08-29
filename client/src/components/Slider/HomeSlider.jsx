import { useVideoListData } from 'hooks/useVideoListData';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Autoplay, Navigation, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

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

const HomeSlider = () => {
  const { videos } = useVideoListData('random');

  return (
    <CarouselBox
      slidesPerView={3}
      spaceBetween={50}
      pagination={{
        clickable: true,
      }}
      loop={true}
      modules={[Autoplay, Navigation, Pagination]}
      className="mySwiper"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
    >
      {videos?.map((video) => {
        return (
          <SwiperSlide key={video?._id}>
            <Link to={`/video/${video._id}`}>
              <ThumbnailImage src={video?.imgUrl} />
            </Link>
          </SwiperSlide>
        );
      })}
    </CarouselBox>
  );
};

export default HomeSlider;
