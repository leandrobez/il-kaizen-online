import axios from 'axios';
export const apiURL = 'kaizenonline/api/';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE + process.env.REACT_APP_HOST_PORT,
});

api.interceptors.request.use(async (config) => {
  return config;
});

export default api;
