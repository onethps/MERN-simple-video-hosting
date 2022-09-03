import { SidebarContext } from 'App';
import SidebarContainer from 'containers/sidebar';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/userSlice';
import { Container, Content, ContentBox } from './styles/layout';

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
