import React, { Component } from 'react';

import { GerencianetContext } from '../../context/GerencianetContext';

/**Alerts and loader */
import Alert from '../includes/Alert';
import Loading from '../includes/Loading';

/**icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';

//components
import CustomerRegister from '../includes/CustomerRegister';
import CreditCard from '../includes/CreditCard';

class Register extends Component {
  static contextType = GerencianetContext;
  constructor(props) {
    super(props);
    this.state = {
      register: {},
      plan: {},
      repeats: 3,
      pay: null,
      payment_token: null,
      mask: null,
      message: {
        type: null,
        value: null,
      },
      showRegister: false,
      showCreditCard: false,
      showLoad: false,
      showAlert: false,
    };
  }

  componentDidMount = () => {
    const plan = this.context.getPlan(this.props.plan);
    this.setState({
      plan,
    });
  };

  handledAlert = () => {
    return this.state.showAlert ? true : false;
  };

  handledPay = (e) => {
    let register = this.state.register;
    register.pay = e.target.value;
    this.setState({
      showRegister: true,
    });
  };

  handledShowRegister = () => {
    if (this.state.showRegister) {
      return 'il-customer il-show';
    } else return 'il-customer';
  };

  handledCreditCard = () => {
    if (this.state.showCreditCard) {
      return 'il-credit-card il-show';
    } else return 'il-credit-card';
  };

  setAlert = (msg) => {
    this.setState({ message: msg, showAlert: true }, (cb) => {
      this.closeAlert();
    });
  };

  closeAlert = () => {
    setTimeout(() => {
      this.setState({
        showAlert: false,
        message: {
          type: null,
          value: null,
        },
        showLoad: false,
      });
    }, 4000);
  };

  closeModal = () => {
    this.setState({
      showCreditCard: false,
    });
  };

  cardForTest = (card) => {
    const cardTemplate = {
      brand: 'visa', // bandeira do cartão
      number: '4012001038443335', // número do cartão
      cvv: '123', // código de segurança
      expiration_month: '05', // mês de vencimento
      expiration_year: '2021', // ano de vencimento
    };

    if (card.brand !== cardTemplate.brand) {
      card.brand = cardTemplate.brand;
    }
    if (card.number !== cardTemplate.number) {
      card.number = cardTemplate.number;
    }
    if (card.cvv !== cardTemplate.cvv) {
      card.cvv = cardTemplate.cvv;
    }
    if (card.expiration_month !== cardTemplate.expiration_month) {
      card.expiration_month = cardTemplate.expiration_month;
    }
    if (card.expiration_year !== cardTemplate.expiration_year) {
      card.expiration_year = cardTemplate.expiration_year;
    }

    return card;
  };

  submitCard = (card) => {
    this.setState({
      showLoad: true,
      showCreditCard: false,
    });
    //for production uses fake credit_card
    let cardTest = this.cardForTest(card);

    //first store card localstore
    const key = 'cardConfig';
    const f = window.localStorage;
    f.removeItem(key);
    f.removeItem('card');

    //remove last card
    f.setItem('card', JSON.stringify(cardTest));
    const scriptLoad = this.context.payToken();

    scriptLoad.onload = () => {
      setTimeout(() => {
        const cardConfig = JSON.parse(f.getItem(key));
        if (cardConfig) {
          this.setState(
            {
              payment_token: cardConfig._token,
              mask: cardConfig._mask,
            },
            (cb) => {
              //execute pay process
              this.initCheckout('credit_card');
            }
          );
        } else {
          this.setAlert({
            type: 'warning',
            value:
              'Não foi possível fazer a sua requisição.|nPor favor tente mais tarde',
          });
        }
      }, 6000);
    };
  };

  setLocalStorage = (data) => {
    const key = 'checkout';
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  submitRegister = async (dataRegister, repeats) => {
    this.setState({
      showLoad: true,
    });
    let msg = '';
    //register client
    const register = await this.context.register(dataRegister, repeats);

    if (register.customer) {
      if (dataRegister.pay === 'credit_card') {
        this.setState({
          pay: dataRegister.pay,
          showCreditCard: true,
          showRegister: false,
          showLoad: false,
        });
      } else {
        //execute pay process
        this.initCheckout('banking_billet');
      }
    } else {
      msg = register.message;
      this.setAlert(msg);
    }
  };

  initCheckout = async (type) => {
    const checkout = await this.context.createCheckout(this.props.plan, type);
    let path = '';
    if (!checkout.error) {
      path = '/checkout/success';
      this.setLocalStorage(checkout.data);
    } else {
      path = '/checkout/fail';
    }
    setTimeout(() => {
      this.setState({
        showLoad: false,
      });
      window.location = path;
    }, 2000);
  };

  render() {
    return (
      <div className="il-register">
        <Loading flag={this.state.showLoad} title="processando" />
        <Alert message={this.state.message} show={this.handledAlert()} />
        <div className="il-register--contents">
          <div className="il-plan--description">
            <div className="il-plan--header">
              <h3>
                Plano: <strong>{this.props.plan}</strong>
              </h3>
            </div>
            <span className="il-description--price">
              R$ {this.state.plan.price + ',00'}
            </span>
            <p className="il-description--text">
              {this.state.plan.description}
            </p>
          </div>
          <div className="il-plan--pay">
            <div className="il-pay--register">
              <h4>Como gostaria de Pagar?</h4>
              <div className="il-choice">
                <div>
                  <label htmlFor="banking_billet">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} />
                    Boleto Bancário
                  </label>
                  <input
                    type="radio"
                    name="pay"
                    id="banking_billet"
                    value="banking_billet"
                    onClick={(e) => this.handledPay(e)}
                  />
                </div>
                <div>
                  <label htmlFor="credit_card">
                    <FontAwesomeIcon icon={faCreditCard} />
                    Cartão de Crédito
                  </label>
                  <input
                    type="radio"
                    name="pay"
                    id="credit_card"
                    value="credit_card"
                    onClick={(e) => this.handledPay(e)}
                  />
                </div>
              </div>
            </div>
            <div className={this.handledShowRegister()}>
              <CustomerRegister
                setAlert={this.setAlert}
                typePay={this.state.register.pay}
                submitRegister={this.submitRegister}
              />
            </div>
            <div className={this.handledCreditCard()}>
              <CreditCard
                setAlert={this.setAlert}
                closeModal={this.closeModal}
                submitCard={this.submitCard}
                name=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
