import React from 'react';
import { FaCat } from 'react-icons/fa';
import {
  MdCardTravel,
  MdFastfood,
  MdSportsHandball,
  MdVideogameAsset,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CategoryItem, CategoryTitle, Container } from './styles/explorecategories';

const ExploreCategories = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

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

ExploreCategories.Categories = function CategoriesExploreCategories() {
  const nav = useNavigate();

  return (
    <>
      {Object.keys(exploreCategories).map((category, index) => (
        <CategoryItem
          key={index}
          onClick={() => nav(exploreCategories[category].category)}
        >
          {exploreCategories[category].icon}
          <CategoryTitle>{exploreCategories[category].name}</CategoryTitle>
        </CategoryItem>
      ))}
    </>
  );
};

export default ExploreCategories;
