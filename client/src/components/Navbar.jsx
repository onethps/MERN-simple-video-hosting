import React from 'react';
import styled from "styled-components";
import {AiOutlineSearch} from "react-icons/ai";
import {useSelector} from "react-redux";

const Container = styled.div`
  position: relative;

`
const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  background: ${({theme}) => theme.bgLighter};
  margin: 0 auto;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`

const Search = styled.div`
  position: absolute;
  align-items: center;
  left: 0;
  border: 1px solid ${({theme}) => theme.text};
  right: 0;
  margin: auto;
  color: ${({theme}) => theme.text};
  padding: 5px;
  display: flex;
  justify-content: space-between;
  width: 40%;

`

const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  color: ${({theme}) => theme.text};
`


const Button = styled.button`
  padding: 5px 15px;
  background: transparent;
  border: 1px solid ${({theme}) => theme.text};
  border-radius: 3px;
  color: ${({theme}) => theme.text};
`

const TextItem = styled.h1`
  font-size: 16px;
  margin-right: 20px;
  color: ${({theme}) => theme.text};
`

const Photo = styled.img`
width: 30px;
  height: 30px;
  padding: 10px;
  margin-right: 20px;
  border-radius: 100px;
`

const NoPhoto = styled.div`
width: 30px;
  height: 30px;
  padding: 10px;
  background-color: grey;
  margin-right: 20px;
  border-radius: 100px;
`

const Navbar = () => {
    const {user} = useSelector((state) => state.user)


    return (
        <Container>
            <Wrapper>
                <Search>
                    <Input placeholder={'search'}/>
                    <AiOutlineSearch/>
                </Search>
                {user ? <>
                {user.img ? <Photo src={user.img}/> : <NoPhoto/> }
                    <TextItem> {user.name}</TextItem>
                </> : <Button>Sign In</Button>}
            </Wrapper>
        </Container>
    );
};

export default Navbar;