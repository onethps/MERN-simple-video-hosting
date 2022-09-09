import styled from 'styled-components';
import { devices } from 'styles/variables';

export const MainBox = styled.div`
  margin: 50px auto;
  width: 100%;
  padding: 0 4%;

  @media only screen and ${devices.laptop} {
    max-width: 1298px;
  }

  @media only screen and ${devices.laptopXM} {
    margin: 50px auto;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-gap: 10px;

  @media only screen and ${devices.mobileL} {
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
`;

export const CategoryCurrentWrapper = styled.div`
  width: 100%;
  margin: ${({ fixedHeader }) => (fixedHeader ? '200px auto' : '80px auto')};
  padding: 0 4%;

  @media only screen and ${devices.laptop} {
    max-width: 1298px;
  }
`;
