import { instance } from 'api/config';
import ExtendedCard from 'components/ExtendedCard';
import Layout from 'components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import { IoFastFoodSharp } from 'react-icons/io5';
import {
  MdOutlineTravelExplore,
  MdSportsEsports,
  MdSportsHandball,
} from 'react-icons/md';
import { FaCat } from 'react-icons/fa';
import styled from 'styled-components';
import { devices } from 'styles/variables';

const Row = styled.div`
  display: grid;
  grid-gap: 10px;

  @media only screen and ${devices.mobileL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }
  //
  // @media only screen and ${devices.tablet} {
  //   grid-template-rows: repeat(1, 1fr);
  //   grid-template-columns: repeat(2, 1fr);
  // }
  //
  // @media only screen and (min-width: 997px) {
  //   grid-template-rows: repeat(1, 1fr);
  //   grid-template-columns: repeat(3, 1fr);
  //   position: static;
  // }
  //
  // @media only screen and (min-width: 1200px) {
  //   grid-template-rows: repeat(1, 1fr);
  //   grid-template-columns: repeat(4, 1fr);
  // }
  //
  // @media only screen and (min-width: 1970px) {
  //   grid-template-rows: repeat(1, 1fr);
  //   grid-template-columns: repeat(5, 1fr);
  // }
  //
  // @media only screen and (min-width: 2300px) {
  //   grid-template-rows: repeat(1, 1fr);
  //   grid-template-columns: repeat(6, 1fr);
  // }
`;

export const Container = styled.div`
  margin-top: 50px;
  max-width: 1292px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  grid-row-gap: 15px;
  justify-content: space-around;
`;
export const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.bgMediumLight};
  border: 1px solid black;
  border-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColorLighter};
  }
`;

export const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.text};
`;

export const SectionTitle = styled.h1`
  padding: 30px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

export const VideoContainer = styled.div`
  padding: 20px;
`;

const Explore = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchTrendVideos = async () => {
      const { data } = await instance.get('videos/trends');
      setVideos(data);
      console.log(data);
    };
    fetchTrendVideos();
  }, []);

  return (
    <Layout>
      <Container>
        <CategoriesContainer>
          <CategoryItem>
            <FaCat size={50} color={'#FD8A86'} />
            <CategoryTitle>Animals</CategoryTitle>
          </CategoryItem>
          <CategoryItem>
            <MdSportsHandball size={50} color={'#EDAF00'} />
            <CategoryTitle>Sport</CategoryTitle>
          </CategoryItem>
          <CategoryItem>
            <MdSportsEsports size={50} color={'#9A55FB'} />
            <CategoryTitle>Gaming</CategoryTitle>
          </CategoryItem>
          <CategoryItem>
            <IoFastFoodSharp size={50} color={'#FD6821'} />
            <CategoryTitle>Food</CategoryTitle>
          </CategoryItem>
          <CategoryItem>
            <MdOutlineTravelExplore size={50} color={'#71A4FC'} />
            <CategoryTitle>Travel</CategoryTitle>
          </CategoryItem>
        </CategoriesContainer>
        <SectionTitle>Popular Videos</SectionTitle>

        <Row>
          {videos
            ? videos.map((video) => <ExtendedCard key={video._id} video={video} />)
            : null}
        </Row>
      </Container>
    </Layout>
  );
};

export default Explore;
