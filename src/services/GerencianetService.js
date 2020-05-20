import axios from 'axios';
const apiURL = 'kaizenonline/api/';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE + process.env.REACT_APP_HOST_PORT,
});

api.interceptors.request.use(async (config) => {
  return config;
});

export const registerCustomer = async (data) => {
  const endPointRegister = 'customer/register';
  return await api.post(apiURL + endPointRegister, data);
};

export const createCheckout = () => {
  const createPlan = async (plan, repeats) => {
    const endPointPlan = 'gerencianet/plan',
      body = {
        name: plan,
        repeats: repeats,
        interval: 1,
      };

    return await api.post(apiURL + endPointPlan, body);
  };

  const createSubscription = (plan_name, plan_id, currentPlan, customer) => {
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
    return api.post(apiURL + endPointSub, {
      metadata,
      params,
      items,
    });
  };

  const createPay = (payBody, subscription_id) => {
    const endPointPay = 'gerencianet/plan/subscription/pay';
    const payParams = {
      id: subscription_id,
    };

    return api.post(apiURL + endPointPay, {
      payParams,
      payBody,
    });
  };
  return {
    createPlan,
    createSubscription,
    createPay,
  };
};
