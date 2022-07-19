import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../firebase.js';
import axios from 'axios';

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

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bg};
  text-align: center;
  padding: 50px;
  z-index: 6;
`;

const Input = styled.input`
  width: 100%;
`;
const Desc = styled.textarea`
  width: 100%;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Label = styled.label`
  display: block;
  text-align: left;
  color: ${({ theme }) => theme.text};
`;

const Upload = ({ setOpen }) => {
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

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgURL' ? setImgPerc(progress) : setVideoPerc(progress);
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
            return { ...prev, urlType: downloadURL };
          });
        });
      },
    );
  };

  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, 'imgURL');
  }, [img]);

  const uploadHandle = async (e) => {
    e.preventDefault();
    const res = await axios.post('videos', { ...inputs });
    setOpen(false);
  };

  return (
    <Container>
      <Background onClick={() => setOpen(false)} />
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
        <Desc placeholder={'Desc'} rows={5} name={'desc'} onChange={handleChange} />
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