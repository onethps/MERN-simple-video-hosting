import axios from 'axios';

const settings = {
  credentials: 'include',
  mode: 'cors',
  withCredentials: true,
};

export const instance = axios.create({
  baseURL: '/api/',
  ...settings

})
;