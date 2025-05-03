import axios from 'axios';

export const baseURL = 'http://3.39.18.57:8080';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
