import { instance } from 'api/config';
import { Form } from 'components';
import GoogleButton from 'components/GoogleButton';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, Provider } from 'lib/firebase.prod.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailture, loginStart, loginSuccess, userSelector } from 'redux/userSlice';

import { firstCharAvatarGenerator } from 'utils/firstCharAvatarGenerator';

const SignIn = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('borya@gmail.com');
  const [password, setPassword] = useState('12342');

  const nav = useNavigate();

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      let { data } = await instance.post(`/auth/signin`, {
        email,
        password,
      });
      //sign In with google in test acc to allow uploading videos in storage
      await signInWithEmailAndPassword(auth, 'test@gmail.com', 'test123');
      dispatch(loginSuccess(data));
      nav('/');
    } catch (e) {
      dispatch(loginFailture());
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      await instance.post(`/auth/signup`, {
        ...inputs,
        img: firstCharAvatarGenerator(inputs.name),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, Provider);
      const { data } = await instance.post('/auth/google', {
        email: user.email,
        name: user.displayName,
        img: user.photoURL,
      });
      dispatch(loginSuccess(data));
    } catch (e) {
      console.log(e);
    }
  };

  const onInputEmailHandle = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onInputPasswordHandle = (e) => {
    setPassword(e.currentTarget.value);
  };

  useEffect(() => {
    if (user) {
      return nav('/');
    }
  }, [user]);

  return (
    <Form>
      <Form.Title>Sign In</Form.Title>
      <Form.Label>Email</Form.Label>
      <Form.Input
        type={'email'}
        placeholder={'example@gmail.com'}
        value={email}
        onChange={onInputEmailHandle}
      />
      <Form.Label>Password</Form.Label>
      <Form.Input
        type={'password'}
        placeholder={'Enter Password'}
        value={password}
        onChange={onInputPasswordHandle}
      />

      <Form.Submit onClick={(e) => signInWithEmail(e)}>Sign In</Form.Submit>
      <Form.Section>OR</Form.Section>
      <GoogleButton onClick={signInWithGoogle} />
    </Form>
  );
};

export default SignIn;
