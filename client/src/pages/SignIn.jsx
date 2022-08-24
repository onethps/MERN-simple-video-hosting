import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailture, loginStart, loginSuccess } from 'redux/userSlice';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, Provider } from 'lib/firebase.prod.js';
import { firstCharAvatarGenerator } from 'utils/firstCharAvatarGenerator';
import { useNavigate } from 'react-router-dom';
import { instance } from 'api/config';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  padding: 20px 50px;
  gap: 20px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 10px;
`;
const SubmitButton = styled.button``;

const SignIn = () => {
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
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Subtitle>to Continue to</Subtitle>
        <Input placeholder={'Email'} value={email} onChange={onInputEmailHandle} />
        <Input
          placeholder={'Password'}
          value={password}
          onChange={onInputPasswordHandle}
        />
        <SubmitButton onClick={(e) => signInWithEmail(e)}>Sign In</SubmitButton>
        <Subtitle>or</Subtitle>
        <SubmitButton onClick={signInWithGoogle}>Sign with Google</SubmitButton>
        <Subtitle>or</Subtitle>
        <Input placeholder={'email'} name={'email'} onChange={handleChange} />
        <Input placeholder={'userName'} name={'name'} onChange={handleChange} />
        <Input placeholder={'password'} name={'password'} onChange={handleChange} />
        <SubmitButton onClick={signup}>Sign Up</SubmitButton>
      </Wrapper>
    </Container>
  );
};

export default SignIn;
