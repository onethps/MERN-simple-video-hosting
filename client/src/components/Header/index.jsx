import { instance } from 'api/config';
import Upload from 'components/Upload';
import { useDebounce } from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
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
  NonTargetBackground,
  ProfileBox,
  ProfileBoxHeader,
  ProfileBoxItem,
  ProfileBoxUserInfo,
  RightNavButtons,
  SearchBox,
  SuggestionItem,
  Suggestions,
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
  uploadModal = false,
  user,
  ...restProps
}) {
  return (
    <Wrapper {...restProps}>
      {children}
      {uploadModal && <Upload setUploadModal={setUploadModal} />}
    </Wrapper>
  );
};

Header.LeftButtonsGroup = function HeaderLeftButtonsGroup({ children, ...restProps }) {
  return <LeftNavButtons {...restProps}>{children}</LeftNavButtons>;
};

Header.GamburgerMenu = function HeaderGamburgerMenu({ ...restProps }) {
  return <RiMenu2Line {...restProps} size={35} />;
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

Header.ProfileModal = function HeaderProfileModal({
  setOpenProfileMenu,
  children,
  ...restProps
}) {
  return (
    <>
      <ProfileBox {...restProps}>{children}</ProfileBox>
      <NonTargetBackground onClick={() => setOpenProfileMenu(false)} />
    </>
  );
};

Header.Search = function HeaderSearch({
  children,
  onCloseSearch,
  openSearch,
  ...restProps
}) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const debounce = useDebounce(value);

  const nav = useNavigate();

  const onClickSearchHandle = () => {
    nav(`search/?q=${value}`);
    setSuggestions(null);
    // setValue('');
  };

  const handleInputSearch = (e) => {
    setValue(e.currentTarget.value);
  };

  const onClickQueryHandle = (suggestion) => {
    nav(`/video/${suggestion._id}`);
    setSuggestions(null);
    setValue('');
  };
  useEffect(() => {
    const fetchQueryVideos = async () => {
      const { data } = await instance.get(`/videos/search/?q=${value}`);
      if (!data.length) {
        setSuggestions([{ _id: 1, title: 'No Results' }]);
        return;
      }
      setSuggestions(data);
    };

    if (value) {
      fetchQueryVideos().catch((err) => console.log(err));
    }
  }, [debounce]);

  const onBackgroundCloseSuggestionModal = () => {
    setSuggestions(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      nav(`search/?q=${value}`);
      setSuggestions(null);
    }
  };

  return (
    <SearchBox {...restProps} openSearch={openSearch}>
      <ArrowBack onClick={onCloseSearch} />
      <InputWithIconBox>
        <InputSearch
          placeholder={'Search Video...'}
          value={value}
          onChange={handleInputSearch}
          onKeyDown={handleKeyDown}
        />
        {children}
        <InputSearchIcon onClick={onClickSearchHandle} />
      </InputWithIconBox>
      {suggestions && value ? (
        <Suggestions>
          {suggestions.splice(0, 5).map((suggestion) => (
            <SuggestionItem
              disabled={suggestion.title === 'No Results'}
              key={suggestion._id}
              type={'text'}
              defaultValue={suggestion.title}
              onClick={() => onClickQueryHandle(suggestion)}
            />
          ))}
        </Suggestions>
      ) : null}
      {suggestions ? (
        <NonTargetBackground onClick={onBackgroundCloseSuggestionModal} />
      ) : null}
    </SearchBox>
  );
};

Header.ProfileModalHeader = function ProfileModalHeader({
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

Header.ProfileBoxItem = function HeaderProfileBoxItem({ title, icon, action }) {
  return (
    <ProfileBoxItem onClick={action}>
      {icon}
      <TextDesc>{title}</TextDesc>
    </ProfileBoxItem>
  );
};

export default Header;
