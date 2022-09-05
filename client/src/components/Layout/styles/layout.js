import { SIDEBAR_COMPACT_SIZE, SIDEBAR_FULL_SIZE } from 'constants/constants';
import styled from 'styled-components';
import { devices } from 'styles/variables';

export const Container = styled.div`
  display: flex;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px auto;

  width: 100%;
  background: ${({ theme }) => theme.bg};
  //padding: 0 20px;
`;

export const ContentBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  @media only screen and ${devices.mobile} {
    margin: 0 auto;
  }

  @media only screen and ${devices.tablet} {
    padding-left: ${SIDEBAR_COMPACT_SIZE}
    
  }
  }

  @media only screen and ${devices.tablet} {
  }

  @media only screen and ${devices.laptop} {
    padding-left: ${({ isOpenSidebar }) =>
      isOpenSidebar ? SIDEBAR_FULL_SIZE : SIDEBAR_COMPACT_SIZE};
  }

  @media only screen and ${devices.laptopM} {
  }

  @media only screen and ${devices.desktop} {
  }
`;
