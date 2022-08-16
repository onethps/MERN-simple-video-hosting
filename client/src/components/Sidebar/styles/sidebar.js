import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v } from 'styles/variables';

export const Container = styled.div`
  //background-color: red;
  position: fixed;
  left: 0;
  
  bottom: 0;
  z-index: 1;
  background: ${({ theme }) => theme.bg};
  min-width: auto;
  height: 100vh;
  display: none;
}

@media only screen and (min-width: 990px) {
  display: block;
  min-width: ${({ isOpen }) => (!isOpen ? `auto` : v.sidebarWidth)};
}

`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;

  & a {
    text-decoration: none;
  }

  @media only screen and (min-width: 990px) {
    display: block;
  }
`;

export const UserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  flex-direction: column;
  position: relative;
`;

export const Item = styled.div`
  height: 50px;
  cursor: pointer;
  padding: 10px 40px;
  margin: 10px;

  & a {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    align-items: center;
    padding: 20px 40px;
    gap: 20px;
    color: ${({ theme }) => theme.text};

    &:hover {
      background: #e0e0e0;
    }
  }
`;

export const Hr = styled.hr`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.border};
  margin: ${v.lgSpacing} 0;
`;

export const TittleCategory = styled.h4`
  color: ${({ theme }) => theme.text};
  font-size: 1.27rem;
  text-transform: uppercase;
  padding: 10px 0;
`;

export const TextItem = styled.h1`
  display: inline;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;

export const Photo = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
  margin-right: 20px;
  border-radius: 100px;
`;

export const Popup = styled.div`
  position: absolute;
  bottom: -70px;
  background: ${({ theme }) => theme.bgMediumLight};
  width: 80%;
  padding: 20px 0;
  border: 1px solid ${({ theme }) => theme.bgDarkLight};
  z-index: 5;
`;

export const SLinkContainer = styled.div`
  background: ${({ theme, isActive }) => (!isActive ? `transparent` : theme.bgDarkLight)};
  border-radius: ${v.borderRadius};
  margin: 8px 20px;

  :hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

export const SLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  padding: calc(${v.smSpacing} - 2px) 0;
`;

export const SLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;
`;

export const SLinkLabel = styled.span`
  display: none;
  width: fit-content;

  @media only screen and (min-width: 990px) {
    display: block;
    flex: 1;
    margin-left: ${v.smSpacing};
  }
`;
