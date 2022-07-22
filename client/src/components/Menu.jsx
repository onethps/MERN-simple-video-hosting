import styled from 'styled-components';
import {RiHome5Fill} from 'react-icons/ri';
import {MdHistory, MdMusicVideo, MdOutlineExplore, MdSubscriptions, MdVideoLibrary,} from 'react-icons/md';
import {CgDarkMode} from 'react-icons/cg';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BsYoutube} from 'react-icons/bs';
import {GoTriangleDown} from 'react-icons/go';
import {logout} from 'redux/userSlice';

const Container = styled.div`
  flex: 1;
  background: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.color};
  font-size: 14px;
  background: ${({theme}) => theme.bgLighter};
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 20px 10px;
  font-size: 16px;

  & a {
    text-decoration: none;
  }
`;

const Logo = styled.div`
  & a {
    width: 160px;
    margin-left: 25px;
    color: ${({theme}) => theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    & h1 {
      font-size: 22px;
      text-decoration: none;
    }
  }
`;

const UserProfileName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & h1 {
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({theme}) => theme.text};
  }

  & svg {
    cursor: pointer;
  }
`;

const Item = styled.div`
  // display: flex;
  // align-items: center;
    // color: ${({theme}) => theme.text};
  // gap: 20px;
  // width: 100%;
  // cursor: pointer;
  height: 50px;

  & a {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 10px 40px;
    gap: 20px;
    color: ${({theme}) => theme.text};

    &:hover {
      background: rgba(255, 99, 71, 0.3);
      color: red;
    }
  }

  & h3 {
    font-weight: 400;
    display: inline;
    font-size: 16px;
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
  align-items: center;
`;

const SignInDes = styled.h3`
  font-size: 16px;
  text-align: center;
  color: ${({theme}) => theme.text};
`;

const TittleCategory = styled.h4`
  color: ${({theme}) => theme.text};
  padding: 10px 40px;
`;

const Button = styled.button`
  display: block;
  background: transparent;
  border: 1px solid ${({theme}) => theme.text};
  border-radius: 3px;
  margin-top: 15px;
  cursor: pointer;
  padding: 5px 40px;
  color: ${({theme}) => theme.text};
`;

const TextItem = styled.h1`
  font-size: 16px;
  margin-right: 20px;
  color: ${({theme}) => theme.text};
`;

const Photo = styled.img`
  width: 50px;
  height: 50px;
  padding: 10px;
  margin-right: 20px;
  border-radius: 100px;
`;

const UserBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  flex-direction: column;
  position: relative;
`;

const Popup = styled.div`
  position: absolute;
  bottom: -70px;
  background: ${({theme}) => theme.bgMediumLight};
  width: 80%;
  padding: 20px 0;
  border: 1px solid ${({theme}) => theme.bgDarkLight};
  z-index: 5;
`;

const LogOutButton = styled.div`
  padding: 10px 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: ${({theme}) => theme.text};
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({theme}) => theme.bgDarkLight};
  }
`;

const UserInfoBlock = styled.div`
  display: flex;
  width: 160px;
  flex-direction: column;
  align-items: center;
`;

const Menu = ({dark, setDartTheme}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);

  const [OpenLogOutPopup, setOpenLogOutPopup] = useState(false);

  const activeNavLink = ({isActive}) => ({
    background: isActive && 'rgba(255, 99, 71, 0.3)',
    color: isActive && 'red',
  });

  const logOutHandle = () => {
    dispatch(logout());
    setOpenLogOutPopup(false);
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Logo>
          <NavLink to={'/'}>
            <BsYoutube size={'40px'} color={'red'}/>
            <h1>YouTube</h1>
          </NavLink>
        </Logo>

        <UserBox>
          {user ? (
            <UserInfoBlock>
              <Photo src={user.img}/>
              <UserProfileName>
                <TextItem>{user.name}</TextItem>
                <GoTriangleDown onClick={() => setOpenLogOutPopup(!OpenLogOutPopup)}/>
                {OpenLogOutPopup && (
                  <Popup>
                    <LogOutButton onClick={logOutHandle}>Logout</LogOutButton>
                  </Popup>
                )}
              </UserProfileName>
            </UserInfoBlock>
          ) : (
            <Link to={'signin'}>
              <Button>Sign In</Button>
            </Link>
          )}
        </UserBox>

        <Item>
          <NavLink to={'/'} style={activeNavLink}>
            <RiHome5Fill/>
            <h3>Home</h3>
          </NavLink>
        </Item>

        <Item>
          <NavLink to={'/explore'} style={activeNavLink}>
            <MdOutlineExplore/>
            <h3>Explore</h3>
          </NavLink>
        </Item>

        <Item>
          <Link to={'/sub'}>
            <MdSubscriptions/>
            <h3>Subscriptions</h3>
          </Link>
        </Item>

        <Hr/>
        <Item>
          <NavLink to={'/library'}>
            <MdVideoLibrary/>
            <h3>Library</h3>
          </NavLink>
        </Item>

        <Item>
          <NavLink to={'/history'}>
            <MdHistory/>
            <h3>History</h3>
          </NavLink>
        </Item>

        {!user && (
          <>
            <Hr/>
            <Login>
              <SignInDes>Sign in to like videos, comments, and subscribe.</SignInDes>

              <Link to={'signin'}>
                <Button>Sign In</Button>
              </Link>
            </Login>
          </>
        )}

        <Hr/>
        <TittleCategory>Best of Youtube</TittleCategory>

        <Item>
          <NavLink to={'/'}>
            <MdHistory/>
            <h3>Music</h3>
          </NavLink>
        </Item>

        <Item>
          <NavLink to={'/'}>
            <MdMusicVideo/>
            <h3>Live</h3>
          </NavLink>
        </Item>

        <Item onClick={() => setDartTheme(!dark)}>
          <a>
            <CgDarkMode/>
            <h3>Dark Mode</h3>
          </a>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
