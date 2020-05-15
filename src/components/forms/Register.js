import React, { Component } from 'react';

import { GerencianetContext } from '../../context/GerencianetContext';

import Alert from '../includes/Alert';
import Loading from '../includes/Loading';
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
      card: {},
      repeats: 3,
      pay: null,
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

  handledLoad = () => {};

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

  handledIntro = () => {
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

  setCard = (card) => {
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
    window.localStorage.removeItem('cardConfig');
    window.localStorage.removeItem('card');
    this.setState({
      card: card,
    });
    //first store card localstore
    const key = 'card';
    const f = window.localStorage;
    f.setItem(key, JSON.stringify(card));

    //action context
    if (this.context.getPayToken()) {
      /*wait 6s to get payload e reset localstore */
      setTimeout(() => {
        //get payment_token and card_mask
        let cardConfig = JSON.parse(window.localStorage.getItem('cardConfig'));
        this.setState(
          {
            payment_token: cardConfig._token,
            mask: cardConfig._mask,
          },
          (cb) => {
            f.removeItem(key);
            //execute pay process
            this.initCheckout('credit_card');
          }
        );
      }, 6000);
    }
  };

  initCheckout = async (type) => {
    const checkout = this.context.checkout(this.props.plan, type);
    checkout.then((res) => {
      let path = '';
      if (!res.error) {
        path = '/checkout/success';
        this.setLocalStorage(res.data);
      } else {
        path = '/checkout/fail';
      }
      setTimeout(() => {
        window.location = path;
      }, 5000);
    });
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

  render() {
    return (
      <div className="il-register">
        <Loading flag={this.state.showLoad} title="processando" />
        <Alert message={this.state.message} show={this.handledAlert()} />
        <div className="il-register--contents">
          <div className="il-plan--description">
            <h4>O que você está contratando</h4>
            <ul>
              <li>
                Plano: <strong>{this.props.plan}</strong>
              </li>
              <li>
                Validade: <strong>{this.state.repeats}</strong> meses
              </li>
            </ul>
            <span className="il-description--price">
              R$ {this.state.plan.price + ',00'}
            </span>
            <p className="il-description--text">
              {this.state.plan.description}
            </p>
          </div>
          <div className="il-pay--content">
            <div className="il-register--pay">
              <h4>Como gostaria de Pagar?</h4>
              <div className="il-pay--choice">
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
            <div className={this.handledIntro()}>
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
                setCard={this.setCard}
                name={this.state.register.name}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
