import axios from 'axios';
export const apiURL = 'kaizenonline/api/';
export const countID = process.env.REACT_APP_GN_ACCOUNT_ID;

export const getPayToken = () => {
  let s = document.createElement('script');
  s.type = 'text/javascript';
  let v = parseInt(Math.random() * 1000000);
  s.src = 'https://sandbox.gerencianet.com.br/v1/cdn/' + countID + '/' + v;
  s.async = false;
  s.id = countID;
  if (!document.getElementById(countID)) {
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
