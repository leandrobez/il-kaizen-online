import React, { Component } from 'react';

/* components */
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

/* icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: '',
      name: 'Leandro Bezerra',
      card: {
        brand: 'visa',
        number: '',
        cvv: '',
        expiration_month: '',
        expiration_year: '',
      },
    };
  }

  componentDidMount = () => {
    this.setState({
      name: this.props.name,
    });
  };

  handleInputFocus = (e) => {
    if (e.target.name === 'cvv') {
      this.setState({ focus: 'cvc' });
    } else {
      if (e.target.name === 'name') {
        this.setState({ focus: 'name' });
      } else this.setState({ focus: e.target.name });
    }
  };

  handledData = (e) => {
    let dataCard = this.state.card;
    let Card = dataCard;
    for (let props in dataCard) {
      if (props === e.target.name) {
        Card[e.target.name] = e.target.value;
        this.setState({
          card: Card,
        });
      } else {
        if (e.target.name === 'name')
          this.setState({
            name: e.target.value,
          });
      }
    }
    /* */
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

  cardFormSubmit = (e) => {
    e.preventDefault();
    const check = this.checkField();
    if (check) {
      this.props.setAlert(check);
      return false;
    } else {
      const dataCard = this.state.card;
      this.props.submitCard(dataCard);
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
          <div className="il-card--simulation">
            <Cards
              cvc={this.state.card.cvv}
              expiry={
                this.state.card.expiration_month +
                '/' +
                this.state.card.expiration_year
              }
              focused={this.state.focus}
              name={this.state.name}
              number={this.state.card.number}
              placeholders={{ name: 'Seu nome aqui' }}
            />
          </div>
          <div className="il-card--form">
            <h4 className="il-color--text__light il-center">
              Preencha os dados do seu cartão
            </h4>
            <form className="il-form" onSubmit={this.cardFormSubmit}>
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
                    type="tel"
                    name="number"
                    placeholder="Número de seu cartão"
                    id="card_number"
                    onChange={this.handledData}
                    onFocus={this.handleInputFocus}
                    maxLength="16"
                  />
                </div>
              </div>
              <div className="il-form--field ">
                <label htmlFor="card_name" className="il-color--text__light">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="card_name"
                  defaultValue={this.props.name}
                  placeholder="Seu nome"
                  onChange={this.handledData}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="il-form--field il-flex">
                <div>
                  <label
                    htmlFor="expiration_month"
                    className="il-color--text__light"
                  >
                    Mês
                  </label>
                  <select
                    type="text"
                    name="expiration_month"
                    id="expiration_month"
                    onChange={this.handledData}
                    onFocus={this.handleInputFocus}
                  >
                    <option value="0">Escolha o mês</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="expiration_year"
                    className="il-color--text__light"
                  >
                    Ano
                  </label>

                  <select
                    name="expiration_year"
                    id="expiration_year"
                    onChange={this.handledData}
                    onFocus={this.handleInputFocus}
                  >
                    <option value="0">Escolha o ano</option>
                    <option value="20">2020</option>
                    <option value="21">2021</option>
                    <option value="22">2022</option>
                    <option value="23">2023</option>
                    <option value="24">2024</option>
                    <option value="25">2025</option>
                  </select>
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
                    maxlenght="3"
                    onChange={this.handledData}
                    onFocus={this.handleInputFocus}
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
      </div>
    );
  }
}
