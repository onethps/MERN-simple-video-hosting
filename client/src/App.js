import styled, {ThemeProvider} from 'styled-components';
import Menu from 'components/Menu';
import Navbar from 'components/Navbar';
import {dartTheme, lightTheme} from 'utils/Theme';
import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from 'pages/Home';
import Video from 'pages/Video';
import SignIn from 'pages/SignIn';
import SearchPage from 'pages/SearchPage';

const Container = styled.div`
  background: ${({theme}) => theme.bg};
  min-height: 100vh;
  display: flex;

`;

const Main = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 20px 20px;
`;

const BurgerMenu = styled.div`
  @media only screen and (min-width: 997px) {
    display: none;
  }
`

const StaticMenu = styled.div`
  @media only screen and (max-width: 997px) {
    display: none;
  }
`

const BackgroundBurger = styled.div`
  display: none;

  @media only screen and (max-width: 997px) {
    display: block;
    position: absolute;
    background-color: black;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 5;
    width: 100vw;
    min-height: 100vh;
    opacity: 0.5;
  }
`


function App() {
  const [dark, setDartTheme] = useState(true);

  const [toggleMenu, setToggleMenu] = useState(false)
  const display = toggleMenu ? 'block' : 'none'

  return (
    <ThemeProvider theme={dark ? lightTheme : dartTheme}>
      <Container>
        <BrowserRouter>
          <StaticMenu>
            <Menu dark={dark} setDartTheme={setDartTheme}/>
          </StaticMenu>
          {toggleMenu && <BurgerMenu className={display}>
            <Menu dark={dark} setDartTheme={setDartTheme}/>
            <BackgroundBurger onClick={() => setToggleMenu(!toggleMenu)}/>
          </BurgerMenu>}

          <Main>
            <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}/>
            <Wrapper>
              <Routes>
                <Route path={'/'} element={<Home type={'random'}/>}/>
                <Route path={'/sub'} element={<Home type={'sub'}/>}/>
                <Route path={'/video/:id'} element={<Video/>}/>
                <Route path={'/signin'} element={<SignIn/>}/>
                <Route path={'/search'} element={<SearchPage/>}/>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
