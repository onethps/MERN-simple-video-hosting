import styled from 'styled-components';
import { RiHome5Fill } from 'react-icons/ri';
import {
  MdHistory,
  MdMusicVideo,
  MdOutlineExplore,
  MdSubscriptions,
  MdVideoLibrary,
} from 'react-icons/md';
import { CgDarkMode } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.color};
  font-size: 14px;
  background: ${({ theme }) => theme.bgLighter};
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  width: 50px;
  height: 25px;
  background: red;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  gap: 20px;
  padding: 7.5px 0;
  cursor: pointer;

  &:hover {
    background-color: green;
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid lightgray;
`;

const Login = styled.div``;

const TittleCategory = styled.h4`
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  display: block;
  padding: 5px 15px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  margin-top: 15px;
`;

const Menu = ({ dark, setDartTheme }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to={'/'}>
          <Logo>
            <Img />
            <Item>TUBE</Item>
          </Logo>
        </Link>

        <Link to={'/'}>
          <Item>
            <RiHome5Fill />
            Home
          </Item>
        </Link>

        <Item>
          <MdOutlineExplore />
          Explore
        </Item>

        <Link to={'/sub'}>
          <Item>
            <MdSubscriptions />
            Subscriptions
          </Item>
        </Link>

        <Hr />
        <Item>
          <MdVideoLibrary />
          Library
        </Item>

        <Item>
          <MdHistory />
          History
        </Item>

        {!user && (
          <>
            <Hr />
            <Login>
              <Item>Sign in to like videso, comments, and subscribe.</Item>
              <Button>
                <Link to={'signin'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Sign In
                </Link>
              </Button>
            </Login>
          </>
        )}

        <Hr />
        <TittleCategory>Best of Youtube</TittleCategory>

        <Item>
          <MdHistory />
          Music
        </Item>

        <Item>
          <MdMusicVideo />
          Live
        </Item>

        <Item onClick={() => setDartTheme(!dark)}>
          <CgDarkMode />
          Dark Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
