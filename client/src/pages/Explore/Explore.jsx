import Layout from 'components/Layout';
import Spinner from 'components/LoaderSpinner';
import ExtendedCardContainer from 'containers/ecard';
import { useFetchVideosPagesData } from 'hooks/useFetchVideosPagesData';
import React from 'react';
import {
  MdCardTravel,
  MdFastfood,
  MdSportsHandball,
  MdVideogameAsset,
} from 'react-icons/md';
import { FaCat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from 'styles/variables';

export const exploreCategories = {
  animals: {
    id: 1,
    name: 'Animals',
    icon: <FaCat size={70} color={'#FD8A86'} />,
    category: 'animals',
  },
  sport: {
    id: 2,
    name: 'Sport',
    category: 'sport',
    icon: <MdSportsHandball size={70} color={'#EDAF00'} />,
  },
  gaming: {
    id: 3,
    name: 'Gaming',
    category: 'gaming',
    icon: <MdVideogameAsset size={70} color={'#9A55FB'} />,
  },
  food: {
    id: 4,
    name: 'Food',
    category: 'food',
    icon: <MdFastfood size={70} color={'#FD6821'} />,
  },
  travel: {
    id: 5,
    name: 'Travel',
    category: 'travel',
    icon: <MdCardTravel size={70} color={'#71A4FC'} />,
  },
};

const Row = styled.div`
  display: grid;
  grid-gap: 10px;

  @media only screen and ${devices.mobileL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);

`;

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 0 4%;

  @media only screen and ${devices.laptop} {
    padding: 0;
  }

  @media only screen and ${devices.laptop} {
    max-width: 1298px;
  }
`;

export const CategoriesContainer = styled.div`
  display: grid;
  grid-row-gap: 15px;
  justify-content: center;
  grid-template-columns: repeat(2, 50%);
  padding: 0 20px;
  width: 100%;
  margin-top: 20px;

  @media only screen and ${devices.tablet} {
    grid-template-columns: repeat(3, 220px);
    grid-gap: 10px;
  }

  @media only screen and ${devices.laptop} {
    grid-template-columns: repeat(4, 220px);
  }

  @media only screen and ${devices.laptopXM} {
    grid-template-columns: repeat(5, 220px);
  }
`;
export const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColorLighter};
  }
`;

export const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.text};
`;

export const SectionTitle = styled.h3`
  padding: 30px 0;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Explore = () => {
  const nav = useNavigate();

  const { videos, loading } = useFetchVideosPagesData(`trends`);

  return (
    <Layout>
      <CategoriesContainer>
        {Object.keys(exploreCategories).map((category, index) => (
          <CategoryItem
            key={index}
            onClick={() => nav(exploreCategories[category].category)}
          >
            {exploreCategories[category].icon}
            <CategoryTitle>{exploreCategories[category].name}</CategoryTitle>
          </CategoryItem>
        ))}
      </CategoriesContainer>
      <Container>
        <SectionTitle>Popular Videos</SectionTitle>

        <Row>
          {videos
            ? videos.map((video) => (
                <ExtendedCardContainer key={video._id} video={video} />
              ))
            : null}
        </Row>
        {loading ? <Spinner /> : null}
      </Container>
    </Layout>
  );
};

export default Explore;
