import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RiVideoUploadLine} from 'react-icons/ri';
import Upload from 'components/Upload';
import Search from 'components/Search';
import {AiFillYoutube} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 10px 30px;
  display: flex;
  background: ${({theme}) => theme.bg};
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  justify-content: space-between;

  @media only screen and (min-width: 992px) {
    position: static;
    justify-content: flex-end;

  }


`;

const UploadButton = styled.div`
  color: ${({theme}) => theme.text};
  cursor: pointer;
`;

const LeftNavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;

  
  //set bg for burger icon
  &:nth-child(1) {
    color: ${({theme}) => theme.text};
  }


  @media only screen and (min-width: 992px) {
    display: none;
  }
`

const YoutubeLogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;

`

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
`

const RightNavButtons = styled.div`
  display: flex;
  gap: 30px;
`


const Navbar = ({toggleMenu, setToggleMenu}) => {
  const {user} = useSelector((state) => state.user);
  const nav = useNavigate()

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <Container>
      <Wrapper>
        <LeftNavButtons>
          <GiHamburgerMenu onClick={() => setToggleMenu(!toggleMenu)}/>
          <YoutubeLogoBox>
            <AiFillYoutube size={'2rem'} color={'red'} onClick={() => nav('/')}/>
          </YoutubeLogoBox>
        </LeftNavButtons>
        <Search/>
        <RightNavButtons>
          <UploadButton>
            <RiVideoUploadLine size={'30px'} onClick={() => setOpenPopup(true)}/>
          </UploadButton>
          {user?.img && <Avatar src={user?.img}/>}
        </RightNavButtons>

        {openPopup && <Upload setOpenPopup={setOpenPopup} userId={user?._id}/>}
      </Wrapper>
    </Container>
  );
};

export default Navbar;