import { RANDOM_TYPE, SUB_TYPE } from 'constants/constants';
import {
  HOME_ROUTE,
  SUB_ROUTE,
  VIDEO_ROUTE,
  EXPLORE_ROUTE,
  SIGN_IN_ROUTE,
  SEARCH_ROUTE,
} from 'constants/routes';
import Home from 'pages/Home';
import SearchPage from 'pages/SearchPage';
import SignIn from 'pages/SignIn';
import Video from 'pages/Video';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home type={RANDOM_TYPE} />} />
      <Route path={EXPLORE_ROUTE} element={<Home type={RANDOM_TYPE} />} />
      <Route path={SUB_ROUTE} element={<Home type={SUB_TYPE} />} />
      <Route path={VIDEO_ROUTE} element={<Video />} />
      <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
      <Route path={SEARCH_ROUTE} element={<SearchPage />} />
    </Routes>
  );
};

export default AppRoutes;
