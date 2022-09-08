import { BsSearch } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import styled from 'styled-components';
import { v } from 'styles/variables';

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const Wrapper = styled.div`
  padding: 0 30px;
  min-height: 70px;
  display: flex;
  background: ${({ theme }) => theme.bgLighter};
  align-items: center;
  left: 0;
  right: 0;
  justify-content: space-between;
`;

export const LeftNavButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-weight: 800;

  //set bg for burger icon
  &:nth-child(1) {
    color: ${({ theme }) => theme.text};
  }

  //@media only screen and (min-width: 992px) {
  //  display: none;
  //}
`;

export const RightNavButtons = styled.div`
  display: flex;
  flex: 1;
  gap: 30px;
  justify-content: flex-end;
  position: relative;
`;

export const YoutubeLogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;

  ///AiFillYoutube icon
  & svg {
    color: red;
    font-size: 2rem;
  }
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
`;

export const NoUserAvatar = styled(FaUserCircle)`
  font-size: 30px;
  align-self: center;
  color: grey;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const AvatarProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30px;
`;

export const ProfileBox = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  border-radius: 10px;
  z-index: 3;
  width: 300px;
  height: 300px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 20px;
`;

export const ProfileBoxHeader = styled.div`
  align-items: center;
  display: flex;
`;

export const ProfileBoxUserInfo = styled.div`
  color: ${({ theme }) => theme.text};
  flex: 3;
`;

export const TextHeader = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  cursor: default;
`;

export const TextDesc = styled.h4`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  width: 100%;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.logoColor};
  }
`;

export const ProfileBoxItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  gap: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.logoColor};
  }
`;

export const Border = styled.h4`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.border};
  margin: calc(${v.smSpacing} * 2) 0;
`;

export const SearchBox = styled.div`
  display: ${({ openSearch }) => (openSearch ? 'flex' : 'none')};
  flex: 1;
  align-items: center;
  width: 100%;

  //min-header BG
  background: ${({ theme }) => theme.bg2};
  //
  position: ${({ openSearch }) => (openSearch ? 'absolute' : 'none')};
  left: 0;
  top: 0;
  height: 60px;
  z-index: 99;
  padding: 5px 0;

  @media only screen and (min-width: 990px) {
    position: relative;
    display: flex;
    background-color: transparent;
    z-index: 1;
  }
`;

export const InputWithIconBox = styled.div`
  display: flex;
  flex: 2;
  height: 80%;
  z-index: 3;
`;

export const InputSearch = styled.input`
  position: relative;
  width: 80%;
  padding: 0 20px;
  border-radius: 15px 0 0 15px;
  border: none;
  background-color: ${({ theme }) => theme.bgMediumLight};
  outline: none;
  color: ${({ theme }) => theme.text};

  @media only screen and (min-width: 990px) {
    width: 100%;
  }
`;

export const Suggestions = styled.div`
  position: absolute;
  padding: 10px 0;
  top: 55px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.bgMediumLight};
  width: 80%;
  left: 12%;
  z-index: 50;

  @media only screen and (min-width: 990px) {
    width: 100%;
    left: 0;
    z-index: 2;
  }
`;

export const SuggestionItem = styled.input`
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  z-index: 2;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColorLighter};
  }

  &:disabled {
    text-align: center;
    padding: 50px;
    pointer-events: none;
  }
`;

export const InputSearchIcon = styled(BsSearch)`
  width: 60px;
  background-color: ${({ theme }) => theme.logoColor};
  height: 100%;
  align-self: center;
  color: white;
  padding: 10px;
  border-radius: 0 15px 15px 0;
  outline: none;
`;

export const LogoTitle = styled.h1`
  cursor: pointer;
`;

export const ArrowBack = styled(IoArrowBack)`
  flex: 0.3;
  font-size: 30px;
  color: ${({ theme }) => theme.text};

  @media only screen and (min-width: 990px) {
    display: none;
  }
`;

export const SearchIcon = styled(BsSearch)`
  font-size: 25px;
  align-self: center;
  color: ${({ theme }) => theme.text};

  @media only screen and (min-width: 990px) {
    display: none;
  }
`;

export const UploadButton = styled.button`
  display: flex;
  padding: 10px 20px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgMediumLight};
  cursor: pointer;

  & svg {
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    cursor: pointer;
  }
`;

export const ButtonLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const NonTargetBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
`;
