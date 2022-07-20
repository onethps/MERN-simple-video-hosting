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
import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { BsYoutube } from 'react-icons/bs';
import { firstCharAvatarGenerator } from 'utils/firstCharAvatarGenerator';

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
  padding: 20px 0;
  font-size: 16px;

  & a {
    text-decoration: none;
  }
`;
const Logo = styled.div`
  margin-bottom: 25px;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: ${({ theme }) => theme.text};

    & h1 {
      display: inline-block;
      font-size: 18px;
      text-decoration: none;
    }
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  gap: 20px;
  width: 100%;
  cursor: pointer;

  & a {
    display: flex;
    align-items: center;
    padding: 10px 40px;
    gap: 20px;
    color: ${({ theme }) => theme.text};
  }

  & h3 {
    font-weight: 400;
    display: inline;
    font-size: 16px;
  }

  &:hover {
    background: rgba(255, 99, 71, 0.3);
    width: 100%;
    color: red;
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid lightgray;
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SignInDes = styled.h3`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const TittleCategory = styled.h4`
  color: ${({ theme }) => theme.text};
  padding: 10px 40px;
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

const TextItem = styled.h1`
  font-size: 16px;
  margin-right: 20px;
  color: ${({ theme }) => theme.text};
`;

const Photo = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
  margin-right: 20px;
  border-radius: 100px;
`;

const NoPhoto = styled.img`
  width: 50px;
  height: 50px;
  padding: 15px;
  margin-right: 20px;
  border-radius: 100px;
`;

const UserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
`;

const Menu = ({ dark, setDartTheme }) => {
  const { user } = useSelector((state) => state.user);

  const activeNavLink = ({ isActive }) => ({
    background: isActive && 'rgba(255, 99, 71, 0.3)',
    width: isActive && '100%',
    padding: isActive && '10px 40px',
    color: isActive && 'red',
  });

  return (
    <Container>
      <Wrapper>
        <Logo>
          <NavLink to={'/'}>
            <BsYoutube size={'40px'} color={'red'} />
            <h1>YouTube</h1>
          </NavLink>
        </Logo>

        <UserBox>
          {user ? (
            <>
              <Photo src={user.img ? user.img : firstCharAvatarGenerator(user.name)} />
              <TextItem> {user.name}</TextItem>
            </>
          ) : (
            <Button>Sign In</Button>
          )}
        </UserBox>

        <Item>
          <NavLink to={'/'} style={activeNavLink}>
            <RiHome5Fill />
            <h3>Home</h3>
          </NavLink>
        </Item>

        <Item>
          <NavLink to={'/explore'} style={activeNavLink}>
            <MdOutlineExplore />
            <h3>Explore</h3>
          </NavLink>
        </Item>

        <Item>
          <Link to={'/sub'}>
            <MdSubscriptions />
            <h3>Subscriptions</h3>
          </Link>
        </Item>

        <Hr />
        <Item>
          <NavLink to={'/library'}>
            <MdVideoLibrary />
            <h3>Library</h3>
          </NavLink>
        </Item>

        <Item>
          <NavLink to={'/history'}>
            <MdHistory />
            <h3>History</h3>
          </NavLink>
        </Item>

        {!user && (
          <>
            <Hr />
            <Login>
              <SignInDes>Sign in to like videos, comments, and subscribe.</SignInDes>
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
          <NavLink to={'/'}>
            <MdHistory />
            <h3>Music</h3>
          </NavLink>
        </Item>

        <Item>
          <NavLink to={'/'}>
            <MdMusicVideo />
            <h3>Live</h3>
          </NavLink>
        </Item>

        <Item onClick={() => setDartTheme(!dark)}>
          <a>
            <CgDarkMode />
            <h3>Dark Mode</h3>
          </a>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
