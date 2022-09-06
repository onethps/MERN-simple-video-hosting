import { instance } from 'api/config';
import Button from 'components/Button';
import {
  Border,
  ButtonLabel,
  LogoTitle,
  SearchIcon,
  UploadButton,
} from 'components/Header/styles/header';
import { HEADER_MENU_PROFILE_ITEMS } from 'constants/constants';
import { SIGN_IN_ROUTE } from 'constants/routes';
import { signOut } from 'firebase/auth';
import { auth } from 'lib/firebase.prod';
import React, { useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import { FaUserAlt } from 'react-icons/fa';
import { IoExit } from 'react-icons/io5';
import { RiUploadCloudLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/userSlice';
import { Header } from '../components';

export const HeaderContainer = ({
  isOpenSidebar,
  setIsOpenSidebar,
  setOpenPopup,
  openPopup,
  setDarkTheme,
  darkTheme,
  user,
}) => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const uploadModalHandle = () => {
    setOpenPopup(true);
  };

  const onCloseSearchHandle = () => {
    setOpenSearch(false);
  };

  const onOpenSearchHandle = () => {
    setOpenSearch(true);
  };

  const onNavToHome = () => {
    nav('/');
  };

  const headerToggleProfileModal = () => {
    setOpenProfileMenu(!openProfileMenu);
  };

  const Action = () => {};

  const darModeSwitchHandler = () => {
    setDarkTheme(!darkTheme);
  };

  const onExitHandle = async (e) => {
    e.preventDefault();

    try {
      dispatch(logout());
      await instance.delete('/auth/logout');
      nav('/signIn');
      setOpenProfileMenu(false);
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Header>
      <Header.Frame setUploadModal={setOpenPopup} uploadModal={openPopup}>
        <Header.LeftButtonsGroup>
          <Header.GamburgerMenu onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
          <Header.Logo>
            <AiFillYoutube onClick={onNavToHome} />
            <LogoTitle onClick={onNavToHome}>utube</LogoTitle>
          </Header.Logo>
        </Header.LeftButtonsGroup>

        <Header.Search openSearch={openSearch} onCloseSearch={onCloseSearchHandle} />

        {user ? (
          <Header.RightButtonsGroup>
            {/*show this icon if min-with tabletL*/}
            <SearchIcon onClick={onOpenSearchHandle} />
            <UploadButton onClick={uploadModalHandle}>
              <RiUploadCloudLine />
              <ButtonLabel>Upload</ButtonLabel>
            </UploadButton>

            <Header.Avatar src={user?.img} onClick={headerToggleProfileModal} />

            {openProfileMenu ? (
              <Header.ProfileModal setOpenProfileMenu={setOpenProfileMenu}>
                <Header.ProfileModalHeader
                  avatarUrl={user?.img}
                  userName={user?.name}
                  userDesc={'0 Subscriptions'}
                />
                <Border />

                <Header.ProfileBoxItem
                  title={HEADER_MENU_PROFILE_ITEMS.MY_CHANNEL}
                  icon={<FaUserAlt size={30} />}
                  action={Action}
                />
                <Header.ProfileBoxItem
                  title={HEADER_MENU_PROFILE_ITEMS.DARK_MODE}
                  icon={<CgDarkMode size={30} />}
                  action={darModeSwitchHandler}
                />
                <Header.ProfileBoxItem
                  title={HEADER_MENU_PROFILE_ITEMS.EXIT}
                  icon={<IoExit size={30} />}
                  action={onExitHandle}
                />
              </Header.ProfileModal>
            ) : null}
          </Header.RightButtonsGroup>
        ) : (
          <Header.RightButtonsGroup>
            <Button src={SIGN_IN_ROUTE} title={'Sign In'} />
          </Header.RightButtonsGroup>
        )}
      </Header.Frame>
    </Header>
  );
};

export default Header;
