import { useVideoListData } from 'hooks/useVideoListData';
import React from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { CarouselBox, ThumbnailImage } from './styles/homeslider';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';

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
