import { useContext } from 'react';
import { SidebarContext } from 'App';
import SidebarContainer from 'containers/sidebar';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/userSlice';
import styled from 'styled-components';
import { devices } from 'styles/variables';

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  padding: 0 20px;
  @media only screen and ${devices.laptopL} {
    max-width: 1298px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  margin-top: 70px;
  width: 100%;
  justify-content: center;
`;

const Layout = ({ children }) => {
  const { isOpenSidebar } = useContext(SidebarContext);
  const { user } = useSelector(userSelector);

  return (
    <Container>
      <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
      <ContentBox>
        <Content isOpenSidebar={isOpenSidebar}>{children}</Content>
      </ContentBox>
    </Container>
  );
};

export default Layout;
