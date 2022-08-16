import { Hr } from 'components/Sidebar/styles/sidebar';
import { EXPLORE_ROUTE, HOME_ROUTE, SUB_ROUTE } from 'constants/routes';
import { CgDarkMode } from 'react-icons/cg';
import {
  MdHistory,
  MdMusicVideo,
  MdOutlineExplore,
  MdSubscriptions,
  MdVideoLibrary,
} from 'react-icons/md';
import { RiHome5Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/userSlice';
import { Sidebar } from '../components';
import React from 'react';

const SidebarContainer = ({ isOpenSidebar }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logOutHandle = () => {
    dispatch(logout());
    nav('/');
  };

  return (
    <Sidebar isOpen={isOpenSidebar}>
      <Sidebar.Frame>
        {menuItems.map((item, index) => (
          <Sidebar.LinkContainer
            key={index}
            src={item.src}
            sidebarOpen={isOpenSidebar}
            icon={item.Icon}
            label={item.title}
          />
        ))}

        <Hr />
        {secondMenuItems.map((item, index) => (
          <Sidebar.LinkContainer
            key={index}
            src={item.src}
            sidebarOpen={isOpenSidebar}
            icon={item.Icon}
            label={item.title}
          />
        ))}
        <Hr />
        {/*<Sidebar.CategoryTitle title={'Best of Youtube'} />*/}
        {thirdMenuItems.map((item, index) => (
          <Sidebar.LinkContainer
            key={index}
            src={item.src}
            sidebarOpen={isOpenSidebar}
            icon={item.Icon}
            label={item.title}
          />
        ))}
      </Sidebar.Frame>
    </Sidebar>
  );
};

const menuItems = [
  {
    title: 'Home',
    Icon: <RiHome5Fill size={30} />,
    src: HOME_ROUTE,
  },
  {
    title: 'Explore',
    Icon: <MdOutlineExplore size={30} />,
    src: EXPLORE_ROUTE,
  },
  {
    title: 'Subscriptions',
    Icon: <MdSubscriptions size={30} />,
    src: SUB_ROUTE,
  },
];

const secondMenuItems = [
  {
    title: 'Library',
    Icon: <MdVideoLibrary size={30} />,
    src: '/library',
  },
  {
    title: 'History',
    Icon: <MdHistory size={30} />,
    src: '/history',
  },
];

const thirdMenuItems = [
  {
    title: 'Music',
    Icon: <MdMusicVideo size={30} />,
    src: '/music',
  },
  {
    title: 'Live',
    Icon: <CgDarkMode size={30} />,
    src: '/live',
  },
];

export default SidebarContainer;
