import { instance } from 'api/config';
import { SIGN_IN_ROUTE } from 'constants/routes';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/userSlice';
import styled from 'styled-components';

const Container = styled.div``;

const AuthProvider = ({ children }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = async () => {
      try {
        await instance.get(`auth/auth`);
      } catch (e) {
        dispatch(logout());
        nav(SIGN_IN_ROUTE);
      }
    };
    auth().catch((err) => console.log(err));
  }, []);

  return <Container>{children}</Container>;
};

export default AuthProvider;
