import axios from 'axios';
export const apiURL = 'kaizenonline/api/';
const api = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE + process.env.REACT_APP_HOST_PORT,
});

api.interceptors.request.use(async (config) => {
  return config;
});
export const initCheckout = () => {
  const apiURL = '/kaizenonline/api/';

  const createPlan = async (plan, repeats) => {
    const endPointPlan = 'gerencianet/plan',
      body = {
        name: plan.name,
        repeats: repeats,
        interval: 1,
      };

    return await axios.post(
      process.env.REACT_APP_URL_BASE +
        process.env.REACT_APP_HOST_PORT +
        apiURL +
        endPointPlan,
      body
    );
  };

  const createSubscription = async (
    plan_name,
    plan_id,
    currentPlan,
    customer
  ) => {
    const endPointSub = 'gerencianet/plan/subscription',
      metadata = {
        custom_id: customer,
        notification_url:
          process.env.REACT_APP_URL_BASE +
          process.env.REACT_APP_CLIENT_PORT +
          '/gerencianet/plan/notification',
      },
      params = {
        id: plan_id,
      },
      items = [
        {
          name: 'Inscrição no plano ' + plan_name,
          amount: 1,
          value: currentPlan.price * 100,
        },
      ];
    return axios.post(
      process.env.REACT_APP_URL_BASE +
        process.env.REACT_APP_HOST_PORT +
        apiURL +
        endPointSub,
      {
        metadata,
        params,
        items,
      }
    );
  };

  const createPay = async (payBody, subscription_id) => {
    const endPointPay = 'gerencianet/plan/subscription/pay';
    const payParams = {
      id: subscription_id,
    };

    return axios
      .post(
        process.env.REACT_APP_URL_BASE +
          process.env.REACT_APP_HOST_PORT +
          apiURL +
          endPointPay,
        {
          payParams,
          payBody,
        }
      )
      .then((res) => {
        return res;
      });
  };
  return {
    createPlan,
    createSubscription,
    createPay,
  };
};

export default api;
