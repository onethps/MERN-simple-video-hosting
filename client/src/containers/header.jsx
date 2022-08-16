import { Button } from 'components/Button';
import {
  ArrowBack,
  Border,
  InputSearch,
  InputSearchIcon,
  InputWithIconBox,
  SearchBox,
  SearchIcon,
} from 'components/Header/styles/header';
import { SIGN_IN_ROUTE } from 'constants/routes';
import React, { useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { RiVideoUploadLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';

export const HeaderContainer = ({
  isOpenSidebar,
  setIsOpenSidebar,
  setOpenPopup,
  openPopup,
  user,
}) => {
  const nav = useNavigate();

  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [openSearch, setOpenSearch] = useState(false);

  const uploadModalHandle = () => {
    setOpenPopup(true);
  };

  const onCloseSearchHandle = () => {
    setOpenSearch(false);
  };

  const onOpenSearchHandle = () => {
    setOpenSearch(true);
  };

  return (
    <Header>
      <Header.Frame setUploadModal={setOpenPopup} uploadModal={openPopup}>
        <Header.LeftButtonsGroup>
          <Header.GamburgerMenu onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
          <Header.Logo>
            <AiFillYoutube size={'2rem'} color={'red'} onClick={() => nav('/')} />
          </Header.Logo>
        </Header.LeftButtonsGroup>

        <Header.ActiveSearch openSearch={openSearch} onCloseSearch={onCloseSearchHandle}>
          <InputSearch
            placeholder={'search'}
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
        </Header.ActiveSearch>

        {user ? (
          <Header.RightButtonsGroup>
            <SearchIcon onClick={onOpenSearchHandle} />
            <RiVideoUploadLine
              size={'2rem'}
              onClick={uploadModalHandle}
              style={{ cursor: 'pointer' }}
            />
            <Header.Avatar
              src={user?.img}
              onClick={() => setOpenProfileMenu(!openProfileMenu)}
            />
            {openProfileMenu && (
              <Header.ProfileBox style={{ position: 'absolute', top: 40, right: 0 }}>
                <Header.ProfileBoxHeader
                  avatarUrl={user?.img}
                  userName={user?.name}
                  userDesc={'0 Subscriptions'}
                />
                <Border />

                {menuItems.map((item) => {
                  return (
                    <Header.ProfileBoxItem
                      key={item.title}
                      icon={item.icon}
                      title={item.title}
                    />
                  );
                })}
              </Header.ProfileBox>
            )}
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

const menuItems = [
  { icon: <RiVideoUploadLine size={30} />, title: 'My channel' },
  { icon: <RiVideoUploadLine size={30} />, title: 'Dark Mode' },
  { icon: <RiVideoUploadLine size={30} />, title: 'Exit' },
];

export default Header;
