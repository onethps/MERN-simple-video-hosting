import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginFailture, loginStart, loginSuccess} from "redux/userSlice";
import {signInWithPopup} from 'firebase/auth'
import {auth, Provider} from '../firebase'

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
  background-color: ${({ theme }) => theme.bgLighter};
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
    const [userName, setUserName] = useState('test1');
    const [password, setPassword] = useState('12342');

    const dispatch = useDispatch()

    const onSubmitButton = async (e) => {
        e.preventDefault();
        dispatch(loginStart())

        try {
            let {data} =  await axios.post(`/auth/signin`, {
                name: userName,
                password: password,
            });
            dispatch(loginSuccess(data))
        } catch (e) {
            dispatch(loginFailture())
        }
    };

    const signInWithGoogle = async () => {

        try {
            const {user} = await   signInWithPopup(auth, Provider)
            const {data } = await  axios.post('/auth/google', {email:user.email, name: user.displayName, img: user.photoURL})
            dispatch(loginSuccess(data))
        } catch (e) {
            console.log(e)
        }



    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <Subtitle>to Continue to</Subtitle>
                <Input
                    placeholder={"userName"}
                    value={userName}
                    onChange={(e) => setUserName(e.currentTarget.value)}
                />
                <Input
                    placeholder={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <SubmitButton onClick={(e) => onSubmitButton(e)}>Sign In</SubmitButton>
                <Subtitle>or</Subtitle>
                <SubmitButton onClick={signInWithGoogle}>Sign with Google</SubmitButton>
                <Subtitle>or</Subtitle>
                <Input placeholder={"userName"} />
                <Input placeholder={"email"} />
                <Input placeholder={"password"} />
                <SubmitButton>Sign Up</SubmitButton>
            </Wrapper>
        </Container>
    );
};

export default SignIn;
