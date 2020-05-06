import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
export default class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {
        brand: 'visa',
        number: '',
        expiration_month: '',
        expiration_year: '',
        cvv: '',
      },
    };
  }

  getHasActived = () => {
    let show = this.props.show;
    return show
      ? 'il-credit-card--container il-show'
      : 'il-credit-card--container';
  };

  checkField = () => {
    let fieldsError = [];
    let msg = null;
    //get state
    const dataCard = this.state.card;
    for (let props in dataCard) {
      if (dataCard[props] === '') {
        //store for show error
        fieldsError.push(
          'O campo ' + props + ' para o item endereço é obrigatório.'
        );
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

      return msg;
    } else {
      this.setState({
        card: dataCard,
      });
      return false;
    }
  };

  setCard = (e) => {
    e.preventDefault();
    let check = this.checkField();
    if (check) {
      this.props.setAlert(check);
    } else {
      this.close();
    }
  };

  close = () => {
    let modal = document.querySelector('.il-credit-card--container.il-show');
    modal.classList.remove('il-show');
    this.props.close();
    this.payToken();
  };

  handledData = (e) => {
    let dataCard = this.state.card;
    let Card = dataCard;
    for (let props in dataCard) {
      if (props === e.target.name) {
        Card[e.target.name] = e.target.value;
      }
      this.setState({
        card: Card,
      });
    }
  };

  render() {
    return (
      <div className={this.getHasActived()}>
        <div className="il-credit-card">
          <h4 className="il-color--text__light il-center">
            Dados do seu cartão
          </h4>
          <form className="il-form" onSubmit={this.setCard}>
            <div className="il-form--field il-flex">
              <div>
                <label htmlFor="brand" className="il-text-color--light">
                  Bandeira <span>*</span>
                </label>
                <select
                  name="brand"
                  id="brand"
                  className="il-select"
                  onChange={this.handledData}
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">MasterCard</option>
                  <option value="jcb">JCB</option>
                  <option value="diners">Diners</option>
                  <option value="amex">Amex</option>
                  <option value="elo">Elo</option>
                  <option value="hipercard">Hipercard</option>
                </select>
              </div>
              <div>
                <label htmlFor="number">Número</label>
                <input
                  type="text"
                  name="number"
                  placeholder="Número de seu cartão"
                  id="number"
                  onChange={this.handledData}
                />
              </div>
            </div>
            <div className="il-form--field il-flex">
              <div>
                <label htmlFor="expiration_month">Dt de Expiração</label>
                <input
                  type="text"
                  name="expiration_month"
                  id="expiration_month"
                  placeholder="mês no formato XX"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label htmlFor="expiration_year">Ano de Expiração</label>
                <input
                  type="text"
                  name="expiration_year"
                  id="expiration_year"
                  placeholder="ano no formato XXXX"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  placeholder="cvv"
                  onChange={this.handledData}
                />
              </div>
            </div>
            <div className="il-buttons">
              <button className="il-btn il-btn--submit">
                <FontAwesomeIcon icon={faThumbsUp} />
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
