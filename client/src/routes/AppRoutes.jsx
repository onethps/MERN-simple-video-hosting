import AuthProvider from 'components/AuthProvider/AuthProvider';
import { SIGN_IN_ROUTE } from 'constants/routes';
import Page404 from 'pages/Page404';
import SignIn from 'pages/SignIn';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes, { privateRoutes } from 'routes/PrivateRoutes';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
        {privateRoutes.map(({ patch, Component }) => (
          <Route
            key={(patch + Component).toString()}
            path={patch}
            element={
              <PrivateRoutes>
                <Component />
              </PrivateRoutes>
            }
          />
        ))}
        <Route path={'*'} element={<Page404 />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
