import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {RiVideoUploadLine} from 'react-icons/ri';
import Upload from 'components/Upload';
import Search from 'components/Search';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  background: ${({theme}) => theme.bg};
  margin: 0 auto;
  justify-content: flex-end;
  align-items: center;
`;

const UploadButton = styled.div`
  padding: 0 20px;
  color: ${({theme}) => theme.text};
  cursor: pointer;
`;

const Navbar = () => {
  const {user} = useSelector((state) => state.user);

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <Container>
      <Wrapper>
        <Search/>
        <UploadButton onClick={() => setOpenPopup(true)}>
          <RiVideoUploadLine size={'30px'}/>
        </UploadButton>
        {openPopup && <Upload setOpenPopup={setOpenPopup} userId={user?._id}/>}
      </Wrapper>
    </Container>
  );
};

export default Navbar;