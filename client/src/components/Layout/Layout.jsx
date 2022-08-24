import { useContext } from 'react';
import { SidebarContext } from 'App';
import SidebarContainer from 'containers/sidebar';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/userSlice';
import styled from 'styled-components';
import { devices } from 'styles/variables';

const Container = styled.div`
  max-width: 1998px;
  margin: 0 auto;
  padding: 70px 20px;
  background: ${({ theme }) => theme.bg};

  @media only screen and ${devices.tablet} {
    margin-left: 100px;
  }

  @media only screen and ${devices.laptopL} {
    margin-left: ${({ isOpenSidebar }) => (isOpenSidebar ? '300px' : '100px')};
  }

  @media only screen and ${devices.desktop} {
    margin: 0 auto;
  }
`;

const Layout = ({ children }) => {
  const { isOpenSidebar } = useContext(SidebarContext);
  const { user } = useSelector(userSelector);

  return (
    <>
      <SidebarContainer user={user} isOpenSidebar={isOpenSidebar} />
      <Container isOpenSidebar={isOpenSidebar}>{children}</Container>
    </>
  );
};

export default Layout;
