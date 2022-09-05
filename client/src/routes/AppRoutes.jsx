import AuthProvider from 'components/AuthProvider/AuthProvider';
import {
  EXPLORE_ROUTE,
  EXPLORE_ROUTE_CATEGORY,
  HOME_ROUTE,
  SEARCH_ROUTE,
  SIGN_IN_ROUTE,
  SUB_ROUTE,
  VIDEO_ROUTE,
} from 'constants/routes';
import Explore from 'pages/Explore/Explore';
import ExploreCategory from 'pages/ExploreCategory';
import Home from 'pages/Home';
import Page404 from 'pages/Page404';
import SignIn from 'pages/SignIn';
import Subs from 'pages/Subs';
import Video from 'pages/Video';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />

        <Route path={EXPLORE_ROUTE} element={<Explore />} />
        <Route path={EXPLORE_ROUTE_CATEGORY} element={<ExploreCategory />} />
        <Route path={SUB_ROUTE} element={<Subs />} />
        <Route path={VIDEO_ROUTE} element={<Video />} />
        <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
        <Route path={SEARCH_ROUTE} element={<SearchPage />} />
        <Route path={'*'} element={<Page404 />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
