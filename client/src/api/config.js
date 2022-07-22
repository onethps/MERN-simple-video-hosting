import axios from 'axios';

const settings = {
  withCredentials: true,
};

export const instance = axios.create({
  baseURL: 'http://localhost:8800/api/',
});