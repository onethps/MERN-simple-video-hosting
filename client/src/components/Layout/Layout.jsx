import { SidebarContext } from 'App';
import { SIDEBAR_COMPACT_SIZE, SIDEBAR_FULL_SIZE } from 'constants/constants';
import SidebarContainer from 'containers/sidebar';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/userSlice';
import styled from 'styled-components';
import { devices } from 'styles/variables';

const Container = styled.div`
  display: flex;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px auto;

  width: 100%;
  background: ${({ theme }) => theme.bg};
  //padding: 0 20px;
`;

const ContentBox = styled.div`
  display: flex;

  width: 100%;
  justify-content: center;

  @media only screen and ${devices.mobile} {
    margin: 0 auto;
  }

  @media only screen and ${devices.mobileL} {
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

const Layout = ({ children }) => {
  const { isOpenSidebar } = useContext(SidebarContext);
  const { user } = useSelector(userSelector);

  return (
    <Container>
      <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
      <ContentBox isOpenSidebar={isOpenSidebar}>
        <Content isOpenSidebar={isOpenSidebar}>{children}</Content>
      </ContentBox>
    </Container>
  );
};

export default Layout;
