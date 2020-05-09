import React, { Component } from 'react';
import CustomerRegister from '../includes/CustomerRegister';
import { GerencianetContext } from '../../context/GerencianetContext';

import Alert from '../includes/Alert';
import Loanding from '../includes/Loading';
import CreditCard from '../includes/CreditCard';

export default class Register extends Component {
  static contextType = GerencianetContext;
  constructor(props) {
    super(props);
    this.state = {
      register: {
        repeats: '3',
        name: '',
        email: '',
        cpf: '',
        birth: '',
        phone_number: '',
        pay: 'banking_billet',
        address: {
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          zipcode: '',
          city: '',
          state: '',
        },
      },
      card: {},
      payment_token: null,
      mask: null,
      assigned: {},
      plan: {},
      subscription: {},
      showAlert: false,
      showLoad: false,
      showCreditCard: false,
      message: {
        type: null,
        value: null,
      },
    };
  }

  componentDidMount = () => {
    let plan = this.context.getPlan(this.props.plan);
    this.setState({
      plan: plan,
    });
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

  handledAlert = () => {
    return this.state.showAlert ? true : false;
  };

  closeModal = () => {
    let register = this.state.register;
    register.pay = 'banking_billet';

    this.setState({
      showCreditCard: false,
      register: register,
    });
  };

  setModal = () => {
    this.setState({
      showCreditCard: true,
    });
  };

  handledModal = () => {
    return this.state.showCreditCard ? true : false;
  };

  setRegister = (dataRegister) => {
    let register = {};
    let repeats = null;
    for (let props in dataRegister) {
      if (props !== 'repeats') {
        register[props] = dataRegister[props];
      } else {
        repeats = register[props];
      }
    }
    this.context.setRegister(register, repeats);
    this.submitRegister();
  };

  submitRegister = async () => {
    let msg = '';
    //register client
    const register = await this.context.register();
    if (!register.error) {
      this.createPlan();
    } else {
      msg = register.message;
    }
    this.setAlert(msg);
  };

  setCard = (card) => {
    window.localStorage.removeItem('cardConfig');
    window.localStorage.removeItem('card');
    this.setState({
      card: card,
    });
    //first store card localstore
    const key = 'card';
    const f = window.localStorage;

    f.setItem(
      key,
      JSON.stringify({
        brand: 'visa', // bandeira do cartão
        number: '4012001038443335', // número do cartão
        cvv: '123', // código de segurança
        expiration_month: '05', // mês de vencimento
        expiration_year: '2021', // ano de vencimento
      })
    );

    //action context
    this.context.getPayToken();
    /*wait 6s to get payload e reset localstore */
    setTimeout(() => {
      //get payment_token and card_mask
      let cardConfig = JSON.parse(window.localStorage.getItem('cardConfig'));
      this.setState({
        payment_token: cardConfig._token,
        mask: cardConfig._mask,
      });
      //erase card
      f.removeItem(key);
    }, 6000);
  };

  createPlan = () => {
    const plan = this.props.plan,
      create = this.context.createPlan(plan);
    let msg = {};
    //process to assigned
    create.then((result) => {
      if (result.error) {
        msg = result.message;
        msg.value = <p>{msg.value}</p>;
        this.setState({ message: msg, showAlert: true }, (cb) => {
          this.closeAlert();
        });
      } else {
        this.createsubscription();
      }
    });
  };

  createSubscription = () => {
    const create = this.context.createSubscription();
    let msg = {};
    create.then((result) => {
      if (result.error) {
        msg = result.message;
        msg.value = <p>{msg.value}</p>;
        this.setState({ message: msg, showAlert: true }, (cb) => {
          this.closeAlert();
        });
      } else {
        this.createPay();
      }
    });
  };

  createPay = () => {
    const create = this.context.createPay();
    let msg = {};
    create.then((result) => {
      msg = result.message;
      msg.value = <p>{msg.value}</p>;
      this.setState({ message: msg, showAlert: true }, (cb) => {
        this.closeAlert();
      });
      //continue;;;
    });
  };

  render() {
    return (
      <div className="il-register">
        <Loanding flag={this.state.showLoad} title="processando" />
        <Alert message={this.state.message} show={this.handledAlert()} />
        <div className="il-plan--intro">
          <div className="il-plan--description">
            <h4>O que você está contratando</h4>
            <ul>
              <li>
                Plano: <strong>{this.props.plan}</strong>
              </li>
              <li>
                Validade: <strong>{this.state.register.repeats}</strong> meses
              </li>
            </ul>
            <span className="il-description--price">
              R$ {this.state.plan.price + ',00'}
            </span>
            <p className="il-description--text">
              {this.state.plan.description}
              <br></br>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis, accusantium enim sed amet, magni recusandae ducimus,
              veniam id iusto exercitationem modi a totam! Ea corporis
              dignissimos accusantium aspernatur dolores. Nisi quam vel commodi
              corrupti rem? Saepe tempora voluptate perferendis deleniti
              doloribus, corrupti cum suscipit, dignissimos, soluta dolorum amet
              sed temporibus! Rerum asperiores obcaecati cupiditate quia.
            </p>
          </div>
        </div>
        <CustomerRegister
          register={this.state.register}
          setAlert={this.setAlert}
          setRegister={this.setRegister}
          setModal={this.setModal}
        />
        <CreditCard
          show={this.handledModal()}
          setAlert={this.setAlert}
          close={this.closeModal}
          setCard={this.setCard}
        />
      </div>
    );
  }
}
