import React from 'react';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import styled from 'styled-components';
import { devices } from 'styles/variables';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const SwiperBox = styled(Swiper)`
  width: 100%;
  height: 400px;
  position: relative;

  & .swiper-slide-active {
    @media only screen and ${devices.laptopL} {
      transform: scale(1.3);
    }
  }

  & svg {
    opacity: 0.7;
    color: ${({ theme }) => theme.blueLight};
    transform: scale(1.5);
  }
`;

export const SliderItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  & img {
    width: 80%;
    object-fit: contain;
  }
`;

const HomeSlider = ({ videos }) => {
  return (
    <>
      <SwiperBox
        breakpoints={{
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1,
          },
          // when window width is >= 480px
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup: 2,
          },
          // when window width is >= 640px
          1440: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
          },
        }}
        speed={1200}
        centeredSlides={true}
        centerInsufficientSlides={true}
        centeredSlidesBounds={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {videos?.map((video, index) => (
          <SwiperSlide key={index.toString()}>
            <SliderItem>
              <img src={video?.imgUrl} />
            </SliderItem>
          </SwiperSlide>
        ))}
        <BsFillArrowLeftSquareFill className={'swiper-button-prev'} />
        <BsFillArrowRightSquareFill className={'swiper-button-next'} />
      </SwiperBox>
    </>
  );
};

export default HomeSlider;
