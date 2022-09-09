import {
  EXPLORE_ROUTE,
  EXPLORE_ROUTE_CATEGORY,
  HOME_ROUTE,
  SEARCH_ROUTE,
  SIGN_IN_ROUTE,
  SUB_ROUTE,
  VIDEO_ROUTE,
} from 'constants/routes';
import Explore from 'pages/Explore';
import ExploreCategory from 'pages/ExploreCategory';
import Home from 'pages/Home';
import SearchPage from 'pages/SearchPage';
import Subs from 'pages/Subs';
import Video from 'pages/Video';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector } from 'redux/userSlice';

export const privateRoutes = [
  {
    patch: HOME_ROUTE,
    Component: Home,
  },
  {
    patch: EXPLORE_ROUTE,
    Component: Explore,
  },
  {
    patch: EXPLORE_ROUTE_CATEGORY,
    Component: ExploreCategory,
  },
  {
    patch: SUB_ROUTE,
    Component: Subs,
  },

  {
    patch: VIDEO_ROUTE,
    Component: Video,
  },
  {
    patch: SEARCH_ROUTE,
    Component: SearchPage,
  },
];

const PrivateRoutes = ({ children }) => {
  const { user } = useSelector(userSelector);
  const nav = useNavigate();

  useEffect(() => {
    if (!user) {
      return nav(SIGN_IN_ROUTE);
    }
  }, []);

  return children;
};

export default PrivateRoutes;
