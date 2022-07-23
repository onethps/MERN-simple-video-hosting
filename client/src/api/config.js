import axios from 'axios';

const settings = {

  withCredentials: true,
};

export const instance = axios.create({
  baseURL: 'https://mern-simple-video-hosting.herokuapp.com/api/',
  ...settings

})
;