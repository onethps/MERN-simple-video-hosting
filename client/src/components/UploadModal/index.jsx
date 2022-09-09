import { instance } from 'api/config';
import DropDown from 'components/Dropdown';
import Form from 'components/Form';
import Modal from 'components/Modal';
import { OptionUploadData } from 'data/categories';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'lib/firebase.prod';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector } from 'redux/userSlice';

const UploadModal = ({ setUploadModal }) => {
  const navigate = useNavigate();

  const { user } = useSelector(userSelector);

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
      () => {},

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
    const res = await instance.post(`/videos/${user?._id}`, { ...inputs });
    res.status === 200 && navigate(`/video/${res.data._id}`);
    setUploadModal(false);
  };

  const onSetVideoHandle = (e) => {
    setVideo(e.target.files[0]);
  };

  const onSetImageHandle = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCategory = (category) => {
    if (category)
      setInputs((prev) => {
        return { ...prev, category: category };
      });
  };

  return (
    <Modal>
      <Modal.Backdrop onClick={() => setUploadModal(false)} />
      <Modal.Wrapper>
        <Form.Label>Video:</Form.Label>

        {videoPerc > 0 ? (
          <Form.Label>Uploading {Math.floor(videoPerc)} %</Form.Label>
        ) : (
          <Form.Input
            name={'video'}
            type={'file'}
            accept={'video/*'}
            onChange={onSetVideoHandle}
          />
        )}

        <Form.Input
          type={'text'}
          placeholder={'Title'}
          name={'title'}
          onChange={handleChange}
        />

        <Form.TextArea
          placeholder={'Desc'}
          rows={8}
          name={'desc'}
          onChange={handleChange}
        />

        <DropDown
          options={OptionUploadData}
          value={inputs.category}
          prompt={'Select Category'}
          onChange={handleCategory}
          label={'name'}
          id={'id'}
        />

        <Form.Label>Image: </Form.Label>

        {imgPerc > 0 ? (
          <Form.Label>Uploading {Math.floor(imgPerc)} %</Form.Label>
        ) : (
          <Form.Input
            name={'image'}
            type={'file'}
            accept={'image/*'}
            onChange={onSetImageHandle}
          />
        )}

        <Form.Submit onClick={uploadHandle}>Upload</Form.Submit>
      </Modal.Wrapper>
    </Modal>
  );
};

export default UploadModal;
