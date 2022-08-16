import { BsSearch } from 'react-icons/bs';
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
  background: ${({ theme }) => theme.bg};
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
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
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
  border-radius: 10px;
  z-index: 1;
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
  flex: 3;
`;

export const TextHeader = styled.h1`
  font-size: 16px;
`;

export const TextDesc = styled.h4`
  font-size: 14px;
  font-weight: 400;
`;

export const ProfileBoxItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  gap: 20px;
  cursor: pointer;

  &:hover {
    color: red;
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
  background-color: white;
  position: absolute;
  left: 0;
  top: 0;
  height: 60px;
  z-index: 99;
  padding: 5px 0;

  @media only screen and (min-width: 990px) {
    display: flex;
    background-color: transparent;
    position: relative;
    z-index: 1;
  }
`;

export const InputWithIconBox = styled.div`
  display: flex;
  flex: 2;
  height: 80%;
`;

export const InputSearch = styled.input`
  width: 80%;
  padding: 0 20px;

  @media only screen and (min-width: 990px) {
    width: 100%;
  }
`;
export const InputSearchIcon = styled(BsSearch)`
  width: 60px;
  background-color: grey;
  height: 100%;
  padding: 10px;
`;

export const ArrowBack = styled(IoArrowBack)`
  flex: 0.3;
  font-size: 30px;

  @media only screen and (min-width: 990px) {
    display: none;
  }
`;

export const SearchIcon = styled(BsSearch)`
  font-size: 25px;
  align-self: center;

  @media only screen and (min-width: 990px) {
    display: none;
  }
`;
