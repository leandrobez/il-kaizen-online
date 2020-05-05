import React, { Component } from 'react';

import { GerencianetContext } from '../../context/GerencianetContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import Alert from '../includes/Alert';
import Loanding from '../includes/Loading';

export default class Register extends Component {
  static contextType = GerencianetContext;
  constructor(props) {
    super(props);
    this.state = {
      register: {},
      assigned: {},
      plan: {},
      subscription: {},
      showAlert: false,
      showLoad: false,
      message: {
        type: null,
        value: null,
      },
    };
  }

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

  componentDidMount = () => {
    let plan = this.context.getPlan(this.props.plan);
    this.setState({
      plan: plan,
      register: this.props.register,
    });
  };

  handledAlert = () => {
    let show = this.state.showAlert ? true : false;
    return show;
  };

  handledData = (e) => {
    let dataRegister = this.state.register;
    let register = dataRegister;
    for (let props in dataRegister) {
      if (props === e.target.name) {
        register[e.target.name] = e.target.value;
      } else {
        if (props === 'address') {
          let dataRegisterAddress = this.state.register.address;
          let address = dataRegisterAddress;
          for (let props1 in address) {
            if (props1 === e.target.name) {
              register.address[e.target.name] = e.target.value;
            }
          }
        }
      }
      this.setState({
        register: register,
      });
    }
  };

  checkField = () => {
    let fieldsError = [];
    let msg = null;
    //get state
    const dataRegister = this.state.register;
    for (let props in dataRegister) {
      if (props !== 'address') {
        if (props !== 'user_id' && dataRegister[props] === '') {
          //store for show error
          fieldsError.push('O campo ' + props + ' é obrigatório.');
        }
      } else {
        for (let props1 in dataRegister[props]) {
          if (dataRegister[props][props1] === '') {
            //store for show error
            fieldsError.push(
              'O campo ' + props1 + ' para o item endereço é obrigatório.'
            );
          }
        }
      }
    }

    if (fieldsError && fieldsError.length) {
      let errors = fieldsError.map((err, index) => (
        <li key={'error_' + index}>{err}</li>
      ));
      errors = <ul>{errors}</ul>;
      msg = {
        type: 'warning',
        value: errors,
      };
      this.setState({ message: msg });
      return true;
    } else {
      return false;
    }
  };

  setRegister = () => {
    const dataRegister = this.state.register;
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
  };

  register = async (e) => {
    e.preventDefault();
    //first check fields
    if (!this.checkField()) {
      let msg = '';
      //register client
      const register = await this.context.register();
      if (!register.error) {
        this.createPlan();
      } else {
        msg = register.message;
      }
      this.setState({ message: msg, showAlert: true }, (cb) => {
        this.closeAlert();
      });
    } else {
      this.setState({ showAlert: true }, (cb) => {
        this.closeAlert();
      });
    }
  };

  getAddress = (e) => {
    e.preventDefault();
    const code = e.target.value;
    let addressSuburb = window.document.getElementById('neighborhood'),
      addressRua = window.document.getElementById('street'),
      addressCity = window.document.getElementById('city'),
      addressUF = window.document.getElementById('state');
    const urlCorreio = 'https://viacep.com.br/ws';
    fetch(`${urlCorreio}/${code}/json/`).then((res) => {
      if (res.status === 200 && res.statusText === 'OK') {
        res.json().then((address) => {
          addressSuburb.value = address.bairro;
          addressRua.value = address.logradouro;
          addressCity.value = address.localidade;
          addressUF.value = address.uf;
          this.setState({
            register: {
              neighborhood: address.bairro,
              street: address.logradouro,
              city: address.localidade,
              state: address.uf,
            },
          });
        });
      }
    });
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
      <div>
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
          <form className="il-form" onSubmit={this.register}>
            <div className="il-form--field il-flex">
              <div>
                <label className="il-text-color--light" htmlFor="pay">
                  Como quer pagar?
                </label>
                <select
                  className="il-select"
                  name="pay"
                  id="pay"
                  onChange={this.handledData}
                >
                  <option value="banking_billet" defaultValue>
                    Boleto
                  </option>
                  <option value="credit_card">Cartão de Crédito</option>
                </select>
              </div>
              <div>
                <label htmlFor="repeats" className="il-text-color--light">
                  Validade do Plano
                </label>
                <select
                  id="repeats"
                  className="il-select"
                  name="repeats"
                  onChange={this.handledData}
                >
                  <option value="3" defaultValue>
                    3 meses
                  </option>
                  <option value="4">4 meses</option>
                  <option value="6">6 meses</option>
                </select>
              </div>
            </div>
            <div className="il-form--field">
              <label className="il-text-color--light" htmlFor="name">
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={this.handledData}
              />
            </div>
            <div className="il-form--field il-flex">
              <div>
                <label className="il-text-color--light" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label className="il-text-color--light" htmlFor="cpf">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label className="il-text-color--light" htmlFor="birth">
                  Nasc
                </label>
                <input
                  type="date"
                  name="birth"
                  id="birth"
                  onChange={this.handledData}
                />
              </div>
            </div>
            <div className="il-form--field  il-flex">
              <div>
                <label className="il-text-color--light" htmlFor="zipcode">
                  CEP
                </label>
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  onChange={this.handledData}
                  onBlur={(e) => {
                    this.getAddress(e);
                  }}
                />
              </div>
              <div>
                <label className="il-text-color--light" htmlFor="city">
                  Cidade
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label className="il-text-color--light" htmlFor="street">
                  Rua/Av
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label className="il-text-color--light" htmlFor="number">
                  Nr
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  onChange={this.handledData}
                />
              </div>
            </div>
            <div className="il-form--field il-flex">
              <div>
                <label className="il-text-color--light" htmlFor="complement">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complement"
                  id="complement"
                  onChange={this.handledData}
                />
              </div>

              <div>
                <label className="il-text-color--light" htmlFor="neighborhood">
                  Bairro
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label className="il-text-color--light" htmlFor="state">
                  Estado
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  onChange={this.handledData}
                />
              </div>
            </div>

            <div className="il-form--field il-flex">
              <div>
                <label className="il-text-color--light" htmlFor="phone_number">
                  Fone
                </label>
                <input
                  type="phone"
                  name="phone_number"
                  id="phone_number"
                  placeholder="use ddd no formato XXXXXXXXXX"
                  onChange={this.handledData}
                />
              </div>
            </div>
            <div className="il-buttons">
              <button className="il-btn il-btn--submit">
                <FontAwesomeIcon icon={faThumbsUp} />
                Assinar plano
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
