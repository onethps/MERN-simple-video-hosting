import { HeaderContainer } from 'containers/header';
import SignIn from 'pages/SignIn';
import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { userSelector } from 'redux/userSlice';
import AppRoutes from 'routes/AppRoutes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/globalStyles';
import { dartTheme, lightTheme } from 'styles/theme';

export const SidebarContext = createContext(null);

function App() {
  const user = useSelector(userSelector);
  const [darkTheme, setDarkTheme] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <ThemeProvider theme={darkTheme ? lightTheme : dartTheme}>
      <SidebarContext.Provider value={{ isOpenSidebar, setIsOpenSidebar }}>
        <GlobalStyles />
        <BrowserRouter>
          <HeaderContainer
            darkTheme={darkTheme}
            setDarkTheme={setDarkTheme}
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            user={user}
          />
          <AppRoutes />
        </BrowserRouter>
      </SidebarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
