import { instance } from 'api/config';
import { Form } from 'components';
import GoogleButton from 'components/GoogleButton';
import { SIGN_UP_ROUTE } from 'constants/routes';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, Provider } from 'lib/firebase.prod.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, userSelector } from 'redux/userSlice';

const SignIn = () => {
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('borya@gmail.com');
  const [password, setPassword] = useState('12342');
  const [error, setError] = useState(null);

  const nav = useNavigate();

  const signInWithEmail = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setError(null);
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
      console.log(e);
      setError(e.response.data.message);
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
    setError(null);
    setEmail(e.currentTarget.value);
  };

  const onInputPasswordHandle = (e) => {
    setError(null);
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

      <GoogleButton onClick={signInWithGoogle} />
      <Form.Section>or Sign in with Email</Form.Section>

      <Form.Label>Email</Form.Label>
      <Form.Input
        error={error}
        type={'email'}
        placeholder={'example@gmail.com'}
        value={email}
        onChange={onInputEmailHandle}
      />
      <Form.Label>Password</Form.Label>
      <Form.Input
        error={error}
        type={'password'}
        placeholder={'Enter Password'}
        value={password}
        onChange={onInputPasswordHandle}
      />
      <Form.Submit onClick={(e) => signInWithEmail(e)}>Sign In</Form.Submit>
      <Form.TextWithLink
        text={'Not registered yet?'}
        linkedText={'Create an Account'}
        link={SIGN_UP_ROUTE}
      />

      {error ? <Form.ErrorMessage>{error}</Form.ErrorMessage> : null}
    </Form>
  );
};

export default SignIn;
