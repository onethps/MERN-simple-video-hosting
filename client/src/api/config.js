import axios from 'axios';

const settings = {
  withCredentials: true,
};

export const instance = axios.create({
  baseURL: '/api/',
  ...settings

})
;