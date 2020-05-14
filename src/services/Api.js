import axios from 'axios';

function checkout(plan) {
  const apiURL = 'kaizenonline/api/';

  const createPlan = async () => {
    const endPointPlan = 'gerencianet/plan',
      body = {
        name: plan,
        repeats: null, //this.state.repeats,
        interval: 1,
      };

    return await axios.post(apiURL + endPointPlan, body);
  };

  const createSubscription = async () => {
    let namePlan = '';
    const endPointSub = 'gerencianet/plan/subscription';
    const currentPlan = this.getPlan(plan),
      metadata = {
        custom_id: this.state.customer._id,
        notification_url:
          process.env.REACT_APP_URL_BASE +
          process.env.REACT_APP_CLIENT_PORT +
          '/gerencianet/plan/notification',
      },
      params = {
        id: null, //this.state.plan.plan_id,
      },
      items = [
        {
          name: 'Inscrição no plano ' + namePlan, //this.state.plan.name,
          amount: 1,
          value: currentPlan.price * 100,
        },
      ];
    return axios.post(apiURL + endPointSub, {
      metadata,
      params,
      items,
    });
  };

  const createPay = async () => {
    const endPointPay = 'gerencianet/plan/subscription/';
    const payParams = {
        id: null, //this.state.subscription.subscription_id,
      },
      payBody = this.getPayBody();

    return axios.post(apiURL + endPointPay, {
      payParams,
      payBody,
    });
  };
  return {
    createPlan,
    createSubscription,
    createPay,
  };
}

export default checkout;
