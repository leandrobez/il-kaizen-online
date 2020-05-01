import React, { Component } from 'react';

import Alert from '../includes/Alert';
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      contact: {
        name: '',
        email: '',
        fone: '',
        message: '',
      },
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
      });
    }, 4000);
  };

  handleData = (e) => {
    let dataContact = this.state.contact;
    let contact = dataContact;
    for (let props in dataContact) {
      if (props === e.target.name) {
        contact[e.target.name] = e.target.value;
      }
      this.setState({
        contact: contact,
      });
    }
  };

  handledLoad = () => {
    let currentClass = this.state.showLoad ? 'il-load il-show' : 'il-load';
    return currentClass;
  };

  handledAlert = () => {
    let show = this.state.showAlert ? true : false;
    return show;
  };

  checkField = () => {
    let fieldsError = [];
    let msg = null;
    //get state
    const dataContact = this.state.contact;
    for (let props in dataContact) {
      if (dataContact[props] === '') {
        //store for show error
        fieldsError.push('O campo ' + props + ' deve ser preenchido.');
      }
    }
    if (fieldsError.length) {
      if (fieldsError.length > 1) {
        let errors = fieldsError.map((err, index) => (
          <p key={'error_' + index}>{err}</p>
        ));
        msg = {
          type: 'warning',
          value: errors,
        };
        this.setState({ message: msg });
        return true;
      } else {
        msg = {
          type: 'warning',
          value: <p>{fieldsError[0]}</p>,
        };
        this.setState({ message: msg });
        return true;
      }
    }
    return false;
  };

  send = (e) => {
    e.preventDefault();
    if (this.checkField()) {
      this.setState({ showAlert: true });
      return;
    }
    this.setState({
      showLoad: true,
      showAlert: false,
      message: {
        type: null,
        value: null,
      },
    });
    const templateId = 'template_NvqKKDA1';

    this.sendFeedback(templateId, {
      message_html: this.state.contact.message,
      from_name: this.state.contact.name,
      reply_to: process.env.REACT_APP_EMAIL_FROM,
    });

    //return;
  };

  sendFeedback = async (templateId, variables) => {
    await window.emailjs
      .send('gmail', templateId, variables)
      .then((res) => {
        //console.log('Email successfully sent!');
        this.setState({
          message: {
            type: 'success',
            value:
              'Seu email foi encaminhado com sucesso. Aguarde nosso retorno.',
          },
          showAlert: true,
        });

        this.closeAlert();
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) => {
        this.setState({
          message: {
            type: 'warning',
            value: 'Erro no envio de seu email.',
          },
          showAlert: true,
        });
        this.closeAlert();
      });
  };

  render() {
    return (
      <div className="il-content il-contact">
        <div className={this.handledLoad()}>
          <div className="il-load--wrapper">
            <p>Carregando...</p>
            <div className="il-load--animate">
              <span className="il-load--line"></span>
              <span className="il-load--line"></span>
              <span className="il-load--line"></span>
            </div>
          </div>
        </div>
        <Alert message={this.state.message} show={this.handledAlert()} />
        <div className="il-content--text">
          <h1 className="il-big--title">Faça contato</h1>
          <h3 className="il-subtitle">Alguma dúvida? Fale com a gente</h3>
          <form className="il-form" onSubmit={this.send}>
            <div className="il-form--field">
              <div>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  className="il-add--description"
                  placeholder="nome completo"
                  id="name"
                  onChange={this.handleData}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="il-add--description"
                  placeholder="Email"
                  id="email"
                  onChange={this.handleData}
                />
              </div>
            </div>
            <div className="il-form--field">
              <div>
                <label htmlFor="fone">Fone</label>
                <input
                  type="text"
                  name="fone"
                  className="il-add--description"
                  placeholder="use ddd no formato XXXXXXXXXX"
                  onChange={this.handleData}
                  id="fone"
                />
              </div>
            </div>
            <div className="il-form--field">
              <div>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="7"
                  defaultValue={'Envie sua mensagem'}
                  onChange={this.handleData}
                ></textarea>
              </div>
            </div>
            <div className="il-buttons">
              <button className="il-btn il-btn--submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
