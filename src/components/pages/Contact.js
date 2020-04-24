import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <div className="il-content il-contact">
        <div className="il-content--text">
          <h1 className="il-big--title">Faça contato</h1>
          <h3 className="il-subtitle">Alguma dúvida? Fale com a gente</h3>
          <form className="il-form">
            <div className="il-form--field">
              <div>
                <label forHtml="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  value=""
                  class="il-add--description"
                  placeholder="nome completo"
                  id="name"
                  required
                />
              </div>
              <div>
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value=""
                  class="il-add--description"
                  placeholder="Email"
                  id="email"
                  required
                />
              </div>
            </div>
            <div className="il-form--field">
              <div>
                <label forHtml="fone">Fone</label>
                <input
                  type="text"
                  name="address.fone"
                  value=""
                  class="il-add--description"
                  placeholder="fone"
                  id="fone"
                />
              </div>
              <div>
                <label forHtml="cel">Celular</label>
                <input
                  type="text"
                  name="address.clr"
                  value=""
                  class="il-add--description"
                  placeholder="Celular"
                  id="cel"
                />
              </div>
            </div>
            <div className="il-form--field">
              <div>
                <textarea name="message" id="message" cols="30" rows="7">
                  Envie sua mensagem
                </textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
