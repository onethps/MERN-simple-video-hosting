import AuthProvider from 'components/AuthProvider/AuthProvider';
import {
  HOME_ROUTE,
  SUB_ROUTE,
  VIDEO_ROUTE,
  EXPLORE_ROUTE,
  SIGN_IN_ROUTE,
  SEARCH_ROUTE,
  EXPLORE_ROUTE_CATEGORY,
} from 'constants/routes';
import Explore from 'pages/Explore/Explore';
import ExploreCategory from 'pages/ExploreCategory';
import Index from 'pages/Home';
import SearchPage from '../pages/SearchPage';
import SignIn from 'pages/SignIn';
import Subs from 'pages/Subs';
import Video from 'pages/Video';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={HOME_ROUTE} element={<Index />} />
        <Route path={EXPLORE_ROUTE} element={<Explore />} />
        <Route path={EXPLORE_ROUTE_CATEGORY} element={<ExploreCategory />} />
        <Route path={SUB_ROUTE} element={<Subs />} />
        <Route path={VIDEO_ROUTE} element={<Video />} />
        <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
        <Route path={SEARCH_ROUTE} element={<SearchPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
