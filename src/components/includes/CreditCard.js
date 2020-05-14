import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
export default class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {
        brand: 'visa',
        number: '',
        cvv: '',
        expiration_month: '',
        expiration_year: '',
      },
    };
  }

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
      this.props.setCard(this.state.card);
    }
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
      <div className="il-credit-card--container">
        <a
          href="#!"
          className="il-close--modal"
          onClick={(e) => {
            e.preventDefault();
            this.props.close();
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </a>
        <div className="il-credit-card--body">
          <h4 className="il-color--text__light il-center">
            Dados do seu cartão
          </h4>
          <p className="il-color--text__light">
            Preencha os dados do seu cartão.
          </p>
          <form className="il-form" onSubmit={this.setCard}>
            <div className="il-form--field il-flex">
              <div>
                <label htmlFor="brand" className="il-color--text__light">
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
                <label htmlFor="number" className="il-color--text__light">
                  Número
                </label>
                <input
                  type="text"
                  name="number"
                  placeholder="Número de seu cartão"
                  id="card_number"
                  onChange={this.handledData}
                />
              </div>
            </div>
            <div className="il-form--field il-flex">
              <div>
                <label
                  htmlFor="expiration_month"
                  className="il-color--text__light"
                >
                  Dt de Expiração
                </label>
                <input
                  type="text"
                  name="expiration_month"
                  id="expiration_month"
                  placeholder="mês no formato XX"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label
                  htmlFor="expiration_year"
                  className="il-color--text__light"
                >
                  Ano de Expiração
                </label>
                <input
                  type="text"
                  name="expiration_year"
                  id="expiration_year"
                  placeholder="ano no formato XXXX"
                  onChange={this.handledData}
                />
              </div>
              <div>
                <label htmlFor="cvv" className="il-color--text__light">
                  CVV
                </label>
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
