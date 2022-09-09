import { SIDEBAR_COMPACT_SIZE, SIDEBAR_FULL_SIZE } from 'constants/constants';
import styled from 'styled-components';
import { devices } from 'styles/variables';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.bgMediumLight};
  width: 100%;
  align-items: center;
  position: relative;
  padding: 0 4%;
`;

export const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1298px;
  margin: 0 auto;
`;

export const IconBox = styled.div`
  display: ${({ fixedHeader }) => (fixedHeader ? 'none' : 'flex')};
  max-width: 1298px;
  padding: 0 4%;
  margin: 0 auto;
`;

export const TitleBox = styled.div`
  &.fixed {
    z-index: 100;
    position: fixed;
    top: 70px;
    padding: 10px 25px;
    background-color: ${({ theme }) => theme.bgMediumLight};
    left: 0;
    right: 0;

    @media only screen and ${devices.mobileL} {
      left: ${SIDEBAR_COMPACT_SIZE};
    }

    @media only screen and ${devices.laptop} {
      left: ${({ isOpenSidebar }) =>
        !isOpenSidebar ? SIDEBAR_COMPACT_SIZE : SIDEBAR_FULL_SIZE};
    }
  }
`;

export const Title = styled.h2`
  max-width: 1298px;
  width: 100%;
  padding: 0 4%;
  margin: 0 auto;
  justify-content: flex-start;
  color: ${({ theme }) => theme.text};
`;
