import axios from 'axios';

const settings = {
  withCredentials: true,
};

export const instance = axios.create({
  //dev
  baseURL: 'http://localhost:8800/api/',
  //
  //prod
  // baseURL: 'https://mern-simple-video-hosting.herokuapp.com/api/',
  //
  ...settings,
});
