import React, { createContext, Component } from 'react';

/**services Gerencianet*/
import GerencianetService from '../services/GerencianetService';
import PayTokenGN from '../services/PayTokenGN';
import { apiURL } from '../services/GerencianetService';
const moment = require('moment');

export const GerencianetContext = createContext();
class GerencianetContextProvider extends Component {
  state = {
    customer: {},
    register: {},
    repeats: null,
    plans: [
      {
        id: 1,
        title: 'Basic',
        name: 'basic',
        description:
          'Você faz 1 aula por semana. Totalizando 4 aulas no mês. A cobrança será feita mensalmente',
        price: 120,
      },
      {
        id: 2,
        title: 'Vip',
        name: 'vip',
        description:
          'Você faz 2 aulas por semana. Totalizando 8 aulas no mês. A cobrança será feita mensalmente',
        price: 210,
      },
      {
        id: 3,
        title: 'Premium',
        name: 'premium',
        description:
          'Você faz 3 aulas por semana. Totalizando 12 aulas no mês. A cobrança será feita mensalmente',
        price: 300,
      },
    ],
    subscription: {},
    plan: {},
    pay: {},
  };

  getPayToken = () => {
    
    PayTokenGN();
  };

  setRegister = (register, repeats) => {
    this.setState({ register: register, repeats: repeats });
  };

  getPlan = (name) => {
    const plan = this.state.plans.filter((element) => element.name === name);
    return plan[0];
  };

  register = () => {
    //first register client and then make proccess
    const endPointRegister = 'customer/register';
    try {
      return GerencianetService.post(
        apiURL + endPointRegister,
        this.state.register
      )
        .then((res) => {
          if (!res.data.error) {
            this.setState({
              customer: res.data.customer,
            });
          } else {
            return {
              error: true,
              message: res.data.message,
            };
          }
          return res.data;
        })
        .then((value) => {
          return value;
        });
    } catch (error) {
      return {
        error: true,
        message: {
          type: 'warning',
          value: error.message,
        },
      };
    }
  };

  createPlan = async (plan) => {
    const currentPlan = this.getPlan(plan),
      body = {
        name: currentPlan.name,
        repeats: this.state.repeats,
        interval: 1,
      },
      endPointPlan = 'gerencianet/plan';

    return await GerencianetService.post(apiURL + endPointPlan, body)
      .then((res) => {
        if (res.status === 200) {
          if (!res.data.error) {
            const newPlan = res.data.data;
            this.setState({
              plan: newPlan,
            });
            return {
              error: false,
              message: {},
            };
          }
        }
      })
      .catch((error) => {
        return {
          error: false,
          message: {
            type: 'warning',
            value: error.message,
          },
        };
      });
  };

  createSubscription = async () => {
    const _currentPlan = this.getPlan(this.state.plan.name),
      metadata = {
        custom_id: this.state.customer._id,
        notification_url:
          process.env.REACT_APP_URL_BASE +
          process.env.REACT_APP_CLIENT_PORT +
          '/gerencianet/plan/notification',
      },
      params = {
        id: this.state.plan.plan_id,
      },
      items = [
        {
          name: 'Inscrição no plano ' + this.state.plan.name,
          amount: 1,
          value: _currentPlan.price * 100,
        },
      ],
      endPointSub = 'gerencianet/plan/subscription';

    return await GerencianetService.post(apiURL + endPointSub, {
      metadata,
      params,
      items,
    })
      .then((res) => {
        if (res.status === 200) {
          if (!res.data.error) {
            const newSub = res.data.data;
            this.setState({
              subscription: newSub,
            });
            return {
              error: false,
              message: {},
            };
          }
        }
      })
      .catch((error) => {
        return {
          error: false,
          message: {
            type: 'warning',
            value: error.message,
          },
        };
      });
  };

  createPay = async () => {
    const endPointPay = 'gerencianet/plan/subscription/pay',
      formPay = this.state.register.pay,
      customer = {
        name: this.state.customer.name,
        email: this.state.customer.email,
        cpf: this.state.customer.cpf,
        birth: this.state.customer.birth,
        phone_number: this.state.customer.phone_number,
      },
      payParams = {
        id: this.state.subscription.subscription_id,
      };

    let payBody = {};

    if (formPay === 'banking_billet') {
      payBody = {
        payment: {
          banking_billet: {
            expire_at: moment().add(10, 'days').format('YYYY-MM-DD'),
            customer: customer,
          },
        },
      };
    } else {
      const paymentToken = window.payLoad();
      payBody = {
        payment: {
          credit_card: {
            installments: 1,
            payment_token: paymentToken,
            billing_address: this.state.customer.address,
            customer: customer,
          },
        },
      };
    }

    return await GerencianetService.post(apiURL + endPointPay, {
      payParams,
      payBody,
    })
      .then((res) => {
        if (res.status === 200) {
          if (!res.data.error) {
            const newPay = res.data.data;
            this.setState({
              pay: newPay,
            });
            return {
              error: false,
              message: {
                type: 'success',
                value:
                  'Sua inscrição foi realizada com sucesso. Verifique sua caixa de email para mais detalhes sobre o pagamento. Assim que tivermos a confirmação do mesmo o seu acesso as aulas estará liberado.',
              },
            };
          }
        }
      })
      .catch((error) => {
        return {
          error: false,
          message: {
            type: 'warning',
            value: error.message,
          },
        };
      });
  };

  render() {
    return (
      <GerencianetContext.Provider
        value={{
          ...this.state,
          setRegister: this.setRegister,
          register: this.register,
          getPlan: this.getPlan,
          createPlan: this.createPlan,
          createSubscription: this.createSubscription,
          getPayToken: this.getPayToken,
          createPay: this.createPay,
        }}
      >
        {this.props.children}
      </GerencianetContext.Provider>
    );
  }
}

export default GerencianetContextProvider;
