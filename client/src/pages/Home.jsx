import { instance } from 'api/config';
import { SidebarContext } from 'App';
import { Index } from 'components/Card';
import Skeleton from 'components/Skeleton';
import SidebarContainer from 'containers/sidebar';
import React, { useContext, useEffect, useState } from 'react';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/userSlice';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { devices } from 'styles/variables';
import { Autoplay, Navigation, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Container = styled.div`
  max-width: 1998px;
  margin: 0 auto;
  padding: 70px 20px;

  @media only screen and ${devices.tablet} {
    margin-left: 100px;
  }

  @media only screen and ${devices.laptopL} {
    margin-left: ${({ isOpenSidebar }) => (isOpenSidebar ? '300px' : '100px')};
  }

  @media only screen and ${devices.desktop} {
    margin: 0 auto;
  }
`;

const Row = styled.div`
  display: grid;
  grid-gap: 5px;

  @media only screen and ${devices.mobileL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and ${devices.tablet} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 997px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(3, 1fr);
    position: static;
  }

  @media only screen and (min-width: 1200px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (min-width: 1970px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and (min-width: 2300px) {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(6, 1fr);
  }
`;

const LoadingBlock = styled.div`
  margin-top: 100px;
`;

const EmptyList = styled.h1`
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const CategoryTitle = styled.h1`
  top: 70px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

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
    color: red;
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

const Home = ({ type }) => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  // const nav = useNavigate();

  const { isOpenSidebar, setIsOpenSidebar } = useContext(SidebarContext);
  const { user } = useSelector(userSelector);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { data } = await instance.get(`videos/${type}`);
      setVideos(data);
      setLoading(false);
    };

    fetchVideos().catch((err) => console.log(err));
  }, [type]);

  if (!videos?.length) {
    return (
      <Container>
        <EmptyList>Empty List</EmptyList>
      </Container>
    );
  }

  if (loading) {
    return (
      <>
        <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
        <Container>
          <LoadingBlock>
            {[...new Array(6)].map((skeleton, i) => (
              <Skeleton key={i + new Date().getTime()} type={'medium'} />
            ))}
          </LoadingBlock>
        </Container>
      </>
    );
  }

  return (
    <>
      <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
      <Container isOpenSidebar={isOpenSidebar}>
        {/*<HomeSlider videos={videos} />*/}
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
            {videos?.map((video) => (
              <SwiperSlide key={video?.videoId}>
                <SliderItem>
                  <img src={video?.imgUrl} />
                </SliderItem>
              </SwiperSlide>
            ))}
            <BsFillArrowLeftSquareFill className={'swiper-button-prev'} />
            <BsFillArrowRightSquareFill className={'swiper-button-next'} />
          </SwiperBox>
        </>

        <CategoryTitle>
          {type === 'sub' && videos ? 'Subscription' : 'Recommendations'}
        </CategoryTitle>
        <Row>
          {videos?.map((video) => (
            <Index key={video._id} video={video} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
