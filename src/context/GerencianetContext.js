import React, { createContext, Component } from 'react';

import listPlans from '../components/common/listPlans';
import {
  registerCustomer,
  createCheckout,
} from '../services/GerencianetService';
import PayTokenGN from '../services/PayTokenGN';

const formatData = require('moment');

export const GerencianetContext = createContext();
export default class GerencianetContextProvider extends Component {
  state = {
    customer: {},
    repeats: null,
  };
  getPlan = (name) => {
    return listPlans(name);
  };

  createRegister = (dataRegister, repeats) => {
    return registerCustomer(dataRegister)
      .then((res) => {
        try {
          if (res.status === 200) {
            if (!res.data.error) {
              this.setState({
                customer: res.data.customer,
                repeats: repeats,
              });
            } else {
              if (res.data.customer) {
                this.setState({
                  customer: res.data.customer,
                  repeats: repeats,
                });
              } else {
                return {
                  error: true,
                  message: res.data.message,
                };
              }
            }
            return res.data;
          }
        } catch (error) {}
      })
      .catch((error) => {
        return {
          error: true,
          message: {
            type: 'warning',
            value: error.message,
          },
        };
      });
  };

  //verif form payment
  getPayBody = (typePay) => {
    const customer = {
      name: this.state.customer.name,
      email: this.state.customer.email,
      cpf: this.state.customer.cpf,
      birth: this.state.customer.birth,
      phone_number: this.state.customer.phone_number,
    };

    if (typePay === 'banking_billet') {
      return {
        payment: {
          banking_billet: {
            expire_at: formatData().add(10, 'days').format('YYYY-MM-DD'),
            customer: customer,
          },
        },
      };
    } else {
      const cardConfig = JSON.parse(window.localStorage.getItem('cardConfig'));
      //remove datas's card
      window.localStorage.removeItem('cardConfig');
      return {
        payment: {
          credit_card: {
            payment_token: cardConfig._token,
            billing_address: this.state.customer.address,
            customer: customer,
          },
        },
      };
    }
  };

  createCheckout = (plan_name, typePay) => {
    const payBody = this.getPayBody(typePay),
      { createPlan, createSubscription, createPay } = createCheckout(),
      currentPlan = this.getPlan(plan_name);

    return createPlan(plan_name, this.state.repeats)
      .then((res) => {
        try {
          if (res.status === 200) {
            if (!res.data.error) {
              const newPlan = res.data.data;
              this.setState({
                plan: newPlan,
              });
              return {
                error: false,
              };
            } else {
              return {
                error: true,
              };
            }
          }
        } catch (error) {}
      })
      .then((status) => {
        if (!status.error) {
          return createSubscription(
            plan_name,
            this.state.plan.plan_id,
            currentPlan,
            this.state.customer._id
          )
            .then((res) => {
              try {
                if (res.status === 200) {
                  if (!res.data.error) {
                    const newSub = res.data.data;
                    this.setState({
                      subscription: newSub,
                    });
                    return {
                      error: false,
                    };
                  } else {
                    return {
                      error: true,
                    };
                  }
                }
              } catch (error) {}
            })
            .then((status) => {
              if (!status.error) {
                return createPay(
                  payBody,
                  this.state.subscription.subscription_id
                ).then((res) => {
                  if (res.status === 200) {
                    if (!res.data.error) {
                      const newPay = res.data.data;
                      this.setState({
                        pay: newPay,
                      });
                      return {
                        error: false,
                        data: res.data.data,
                      };
                    }
                  }
                });
              }
            })
            .catch();
        }
      })
      .catch((error) => {});
  };

  getToken = () => {
    return PayTokenGN();
  };

  render() {
    return (
      <GerencianetContext.Provider
        value={{
          getPlan: this.getPlan,
          register: this.createRegister,
          createCheckout: this.createCheckout,
          payToken: this.getToken,
        }}
      >
        {this.props.children}
      </GerencianetContext.Provider>
    );
  }
}
