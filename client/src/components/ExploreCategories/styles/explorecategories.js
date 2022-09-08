import styled from 'styled-components';
import { devices } from 'styles/variables';

export const Container = styled.div`
  display: grid;
  grid-gap: 15px;
  justify-content: space-between;

  grid-template-columns: repeat(2, 1fr);
  padding: 0 20px;
  width: 100%;
  max-width: 1298px;
  margin: 30px auto;

  @media only screen and ${devices.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }

  @media only screen and ${devices.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and ${devices.laptopXM} {
    grid-template-columns: repeat(5, 1fr);
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
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.bgMediumLight};
  }
`;

export const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.text};
`;
