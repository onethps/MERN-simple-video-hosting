import styled from 'styled-components';
import { devices } from 'styles/variables';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 0 4%;

  @media only screen and ${devices.laptopL} {
    max-width: 2332px;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-gap: 10px;

  @media only screen and ${devices.mobile} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and ${devices.mobileL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and ${devices.tablet} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and ${devices.laptop} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and ${devices.laptopM} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }

  @media only screen and ${devices.laptopL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const EmptyList = styled.h1`
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

export const SectionTitle = styled.h2`
  text-align: left;
  padding: 20px 0;
  color: ${({ theme }) => theme.text};
`;
