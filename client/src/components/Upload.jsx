import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from 'lib/firebase.prod';
import { useNavigate } from 'react-router-dom';
import { instance } from 'api/config';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  background-size: cover;
  margin: 50vh auto 0;
  transform: translateY(-50%);
`;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 50;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 992px) {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 50px;
  z-index: 21;
  width: 800px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const InputBox = styled.div`
  margin: 20px 0;
  width: 100%;
  padding: 5px 20px;
  background-color: ${({ theme }) => theme.hoverColor};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 10px 5px;
  background-color: ${({ theme }) => theme.hoverColor};
  color: ${({ theme }) => theme.text};
  outline: none;
`;
const Desc = styled.textarea`
  margin: 20px 0;
  width: 100%;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.hoverColor};
  border-radius: 10px;
  border: none;
  outline: none;
  resize: none;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 50%;
  padding: 10px 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.blueLight};
  color: ${({ theme }) => theme.text};
`;

const Label = styled.label`
  display: block;
  text-align: left;
  color: ${({ theme }) => theme.text};
`;

const TextItem = styled.span`
  margin-top: 20px;
  color: ${({ theme }) => theme.text};
`;

const Upload = ({ setUploadModal, userId }) => {
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
    setUploadModal(false);
  };

  const onSetVideoHandle = (e) => {
    setVideo(e.target.files[0]);
  };

  const onSetImageHandle = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <Container>
      <Background onClick={() => setUploadModal(false)} />
      <Wrapper>
        <Label>Video:</Label>

        {videoPerc > 0 ? (
          <TextItem>Uploading {Math.floor(videoPerc)} %</TextItem>
        ) : (
          <InputBox>
            <Input
              name={'video'}
              type={'file'}
              accept={'video/*'}
              onChange={onSetVideoHandle}
            />
          </InputBox>
        )}
        <InputBox>
          <Input
            type={'text'}
            placeholder={'Title'}
            name={'title'}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox>
          <Desc placeholder={'Desc'} rows={8} name={'desc'} onChange={handleChange} />
        </InputBox>
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          <TextItem>Uploading ${imgPerc} %</TextItem>
        ) : (
          <InputBox>
            <Input
              name={'image'}
              type={'file'}
              accept={'image/*'}
              onChange={onSetImageHandle}
            />
          </InputBox>
        )}
        <Button onClick={uploadHandle}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
