import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v } from 'styles/variables';
import { devices } from 'styles/variables';

export const Container = styled.div`
  //background-color: red;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
  background: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  display: none;
  
}

@media screen and ${devices.tablet} {
  display: block;
  min-width: auto;
}

@media only screen and ${devices.laptopL} {
  min-width: ${({ isOpen }) => (isOpen ? '300px' : '100px')};
}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;

  & a {
    text-decoration: none;
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
  background: ${({ theme, active }) => (!active ? `transparent` : theme.hoverColor)};
  border-radius: ${v.borderRadius};
  margin: 8px 20px;
`;

export const SLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  padding: calc(${v.smSpacing} - 2px) 0;
  color: ${({ theme, active }) => (!active ? theme.text : theme.blueLight)};

  &:hover {
    color: ${({ theme }) => theme.blueLight};
  }
`;

export const SLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;
`;

export const SLinkLabel = styled.span`
  display: none;

  @media only screen and ${devices.laptopL} {
    width: fit-content;
    display: block;
    flex: 1;
    margin-left: (${v.smSpacing});
  }
`;
