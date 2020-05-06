import axios from 'axios';
export const apiURL = 'kaizenonline/api/';
export const acountID = process.env.REACT_APP_GN_ACCOUNT_ID;

export const getPayToken = () => {
  let s = document.createElement('script');
  s.type = 'text/javascript';
  let v = parseInt(Math.random() * 1000000);
  s.src = 'https://sandbox.gerencianet.com.br/v1/cdn/' + acountID + '/' + v;
  s.async = false;
  s.id = acountID;
  if (!document.getElementById(acountID)) {
    document.getElementsByTagName('head')[0].appendChild(s);
  }
  let gn = {
    validForm: true,
    processed: false,
    done: {},
    ready: function (fn) {
      gn.done = fn;
    },
  };
  return gn;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE + process.env.REACT_APP_HOST_PORT,
});

api.interceptors.request.use(async (config) => {
  return config;
});

export default api;
