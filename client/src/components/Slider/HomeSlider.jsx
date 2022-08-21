import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  //width: 1000vw;
  //height: 500px;
  //padding: 150px;
  height: 30vw;
  width: 40vw;
  margin: 0 auto;
  left: -10%;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const Carorusel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  margin: auto;
  width: 60%;
  height: 100%;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  cursor: pointer;
  transition: transform 0.4s ease;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HomeSlider = ({ videos }) => {
  const [activeSlide, setActiveSlide] = useState(2);

  const nextIndexSlide = activeSlide === videos?.length - 1 ? 0 : activeSlide + 1;
  const prevIndexSlide = activeSlide === 0 ? videos?.length - 1 : activeSlide - 1;

  const prev = () => {
    setActiveSlide(prevIndexSlide);
  };

  const next = () => {
    setActiveSlide(nextIndexSlide);
  };

  const renderElems = videos?.map((el, index) => (
    <div key={el + index}>
      {index === prevIndexSlide && (
        <ImgBox
          current={activeSlide}
          index={index}
          onClick={prev}
          style={{
            transform: 'translate3d(-50%, 0, -100px)',
          }}
        >
          <Image src={el?.imgUrl} />
        </ImgBox>
      )}

      {index === activeSlide && (
        <ImgBox
          current={activeSlide}
          index={index}
          style={{
            transform: 'translate3d(0, 0, 0)',
            zIndex: '50',
          }}
        >
          <Image src={el?.imgUrl} />
        </ImgBox>
      )}

      {index === nextIndexSlide && (
        <ImgBox
          current={activeSlide}
          index={index}
          onClick={next}
          style={{
            transform: 'translate3d(50%, 0, -100px)',
          }}
        >
          <Image src={el?.imgUrl} />
        </ImgBox>
      )}
    </div>
  ));

  return (
    <Container>
      <Carorusel>{renderElems}</Carorusel>
    </Container>
  );
};

export default HomeSlider;
