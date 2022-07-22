import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {instance} from "api/config";

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 50px;
  z-index: 6;
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  margin: 20px 0;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  border: none;
  padding: 20px 20px;
  border-radius: 10px;
`;
const Desc = styled.textarea`
  margin: 20px 0;
  padding: 10px 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 10px;
  border: none;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;

const Label = styled.label`
  display: block;
  text-align: left;
  color: ${({ theme }) => theme.text};
`;

const Upload = ({ setOpenPopup, userId }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const mountainsRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(mountainsRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl' ? setImgPerc(progress) : setVideoPerc(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      },
    );
  };

  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  }, [img]);

  const uploadHandle = async (e) => {
    e.preventDefault();
    const res = await instance.post(`/videos/${userId}`, { ...inputs });
    res.status === 200 && navigate(`/video/${res.data._id}`);
    setOpenPopup(false);
  };

  return (
    <Container>
      <Background onClick={() => setOpenPopup(false)} />
      <Wrapper>
        <Label>Video:</Label>

        {videoPerc > 0 ? (
          'Uploading ' + videoPerc + '%'
        ) : (
          <Input
            name={'video'}
            type={'file'}
            accept={'video/*'}
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type={'text'}
          placeholder={'Title'}
          name={'title'}
          onChange={handleChange}
        />
        <Desc placeholder={'Desc'} rows={8} name={'desc'} onChange={handleChange} />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          'Uploading ' + imgPerc + '%'
        ) : (
          <Input
            name={'image'}
            type={'file'}
            accept={'image/*'}
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={uploadHandle}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;