import { instance } from 'api/config';
import { Form } from 'components';
import { SIGN_IN_ROUTE } from 'constants/routes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firstCharAvatarGenerator } from 'utils/firstCharAvatarGenerator';

const SignUp = () => {
  const [inputs, setInputs] = useState({});
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      await instance.post(`/auth/signup`, {
        ...inputs,
        img: firstCharAvatarGenerator(inputs.name),
      });
      nav('/');
    } catch (e) {
      setError(e.response.data.message);
      console.log(e);
    }
  };

  return (
    <Form>
      <Form.Title>Sign Up</Form.Title>
      <Form.Label>Name</Form.Label>
      <Form.Input
        name={'name'}
        type={'text'}
        placeholder={'Enter Name'}
        onChange={handleChange}
      />
      <Form.Label>Email</Form.Label>
      <Form.Input
        name={'email'}
        type={'email'}
        placeholder={'example@gmail.com'}
        onChange={handleChange}
      />
      <Form.Label>Password</Form.Label>
      <Form.Input
        name={'password'}
        type={'password'}
        placeholder={'Enter Password'}
        onChange={handleChange}
      />
      <Form.Submit onClick={(e) => signup(e)}>Sign Up</Form.Submit>
      <Form.TextWithLink
        text={'Already have account?'}
        linkedText={'Sign In'}
        link={SIGN_IN_ROUTE}
      />
      {error ? <Form.ErrorMessage>{error}</Form.ErrorMessage> : null}
    </Form>
  );
};

export default SignUp;
