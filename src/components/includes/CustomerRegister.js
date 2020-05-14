import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: {
        repeats: 3,
        name: '',
        email: '',
        cpf: '',
        birth: '',
        phone_number: '',
        pay: '',
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
    };
  }

  getAddress = (e) => {
    e.preventDefault();
    let register = this.state.register;
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
          //reset register
          register.address.neighborhood = address.bairro;
          register.address.street = address.logradouro;
          register.address.city = address.localidade;
          register.address.state = address.uf;
          this.setState({
            register: register,
          });
        });
      }
    });
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

  formSubmit = (e) => {
    e.preventDefault();
    let msg = null;
    const fieldsError = this.checkFields();
    if (fieldsError.length) {
      let errors = fieldsError.map((err, index) => (
        <li key={'error_' + index}>{err}</li>
      ));
      errors = <ul>{errors}</ul>;
      msg = {
        type: 'warning',
        value: errors,
      };
      this.props.setAlert(msg);
      return false;
    } else {
      const dataRegister = this.state.register;
      let register = {};
      for (let props in dataRegister) {
        if (props !== 'repeats') {
          register[props] = dataRegister[props];
        }
      }
      register.pay = this.props.typePay;
      this.props.submitRegister(register, this.state.register.repeats);
      return;
    }
  };

  checkFields = () => {
    let dataRegister = this.state.register;
    dataRegister.pay = this.props.typePay;
    let fieldsError = [];
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
    return fieldsError;
  };

  render() {
    return (
      <div className="il-form--pay">
        {/* //form to pay */}
        <div className="il-form--register">
          <form className="il-form" onSubmit={this.formSubmit}>
            <div className="il-form--field il-flex">
              <div className="il-register--name">
                <label className="il-color--text__dark" htmlFor="name">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handledData}
                />
              </div>
              <div className="il-register--repeats">
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
            <div className="il-form--field il-flex">
              <div>
                <label className="il-color--text__dark" htmlFor="email">
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
                <label className="il-color--text__dark" htmlFor="cpf">
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
                <label className="il-color--text__dark" htmlFor="birth">
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
                <label className="il-color--text__dark" htmlFor="zipcode">
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
                <label className="il-color--text__dark" htmlFor="city">
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
                <label className="il-color--text__dark" htmlFor="street">
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
                <label className="il-color--text__dark" htmlFor="number">
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
                <label className="il-color--text__dark" htmlFor="complement">
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
                <label className="il-color--text__dark" htmlFor="neighborhood">
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
                <label className="il-color--text__dark" htmlFor="state">
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
                <label className="il-color--text__dark" htmlFor="phone_number">
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

export default CustomerRegister;
