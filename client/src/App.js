import styled, { ThemeProvider } from 'styled-components';
import Menu from 'components/Menu';
import Navbar from 'components/Navbar';
import { dartTheme, lightTheme } from 'utils/Theme';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Video from 'pages/Video';
import SignIn from 'pages/SignIn';
import SearchPage from 'pages/SearchPage';

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;

const Main = styled.div`
  flex: 4;
`;

const Wrapper = styled.div`
  padding: 20px 30px;
`;

function App() {
  const [dark, setDartTheme] = useState(false);

  return (
    <ThemeProvider theme={dark ? lightTheme : dartTheme}>
      <Container>
        <BrowserRouter>
          <Menu dark={dark} setDartTheme={setDartTheme} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path={'/'} element={<Home type={'random'} />} />
                <Route path={'/sub'} element={<Home type={'sub'} />} />
                <Route path={'/video/:id'} element={<Video />} />
                <Route path={'/signin'} element={<SignIn />} />
                <Route path={'/search/'} element={<SearchPage />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
