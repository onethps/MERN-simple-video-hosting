import { Search } from 'components/Search';
import Upload from 'components/Upload';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoArrowBack } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  Avatar,
  AvatarContainer,
  AvatarProfile,
  Container,
  InputSearch,
  InputSearchIcon,
  InputWithIconBox,
  LeftNavButtons,
  ProfileBox,
  ProfileBoxHeader,
  ProfileBoxItem,
  ProfileBoxUserInfo,
  RightNavButtons,
  SearchBox,
  TextDesc,
  TextHeader,
  Wrapper,
  YoutubeLogoBox,
} from './styles/header';

const Header = ({ children }) => {
  return <Container>{children}</Container>;
};

Header.Frame = function HeaderFrame({
  children,
  setUploadModal,
  uploadModal,
  user,
  ...restProps
}) {
  return (
    <Wrapper {...restProps}>
      {children}
      {uploadModal && <Upload setUploadModal={setUploadModal} userId={user?._id} />}
    </Wrapper>
  );
};

Header.LeftButtonsGroup = function HeaderLeftButtonsGroup({ children, ...restProps }) {
  const nav = useNavigate();

  return (
    <LeftNavButtons {...restProps}>
      {children}
      <h1>YOUTUBE</h1>
    </LeftNavButtons>
  );
};

Header.GamburgerMenu = function HeaderGamburgerMenu({ ...restProps }) {
  return <GiHamburgerMenu {...restProps} size={35} />;
};

Header.Logo = function HeaderLogo({ children, ...restProps }) {
  return <YoutubeLogoBox {...restProps}>{children}</YoutubeLogoBox>;
};

Header.RightButtonsGroup = function HeaderRightButtonsGroup({ children, ...restProps }) {
  return <RightNavButtons {...restProps}>{children}</RightNavButtons>;
};

Header.Avatar = function HeaderAvatar({ src, ...restProps }) {
  return <Avatar {...restProps} src={src} alt={'avatar'} />;
};

// Header.Search = function HeaderSearch({ ...restProps }) {
//   return <Search {...restProps} />;
// };

Header.ProfileBox = function HeaderProfileBox({ children, ...restProps }) {
  return <ProfileBox {...restProps}>{children}</ProfileBox>;
};

Header.ActiveSearch = function HeaderActiveSearch({
  children,
  onCloseSearch,
  openSearch,
  ...restProps
}) {
  return (
    <SearchBox {...restProps} openSearch={openSearch}>
      <ArrowBack onClick={onCloseSearch} />
      <InputWithIconBox>
        {children}
        <InputSearchIcon />
      </InputWithIconBox>
    </SearchBox>
  );
};

Header.ProfileBoxHeader = function HeaderProfileBoxItem({
  avatarUrl,
  userName,
  userDesc,
  ...restProps
}) {
  return (
    <ProfileBoxHeader {...restProps}>
      <AvatarContainer>
        <AvatarProfile src={avatarUrl} />
      </AvatarContainer>
      <ProfileBoxUserInfo>
        <TextHeader>{userName}</TextHeader>
        <TextDesc>{userDesc}</TextDesc>
      </ProfileBoxUserInfo>
    </ProfileBoxHeader>
  );
};

Header.ProfileBoxItem = function HeaderProfileBoxItem({ icon, title }) {
  return (
    <ProfileBoxItem>
      {icon}
      <TextDesc>{title}</TextDesc>
    </ProfileBoxItem>
  );
};

export default Header;
