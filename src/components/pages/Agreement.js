import React, { Component } from 'react';

import GerencianetContextProvider from '../../context/GerencianetContext';
import Register from '../forms/Register';

class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: {},
      subscription: {},
      register: {
        user_id: '',
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
    };
  }

  render() {
    return (
      <div className="il-content il-agreement">
        <div className="il-content--text">
          <h1 className="il-big--title">
            Contratar o plano {this.props.match.params.plan}
          </h1>
          <h3 className="il-subtitle">Preencha o formulário para continuar</h3>
          <p className="il-description">
            Esses dados não serão divulgados e sua importância é apenas para o
            controle eficiente dos pagamentos.
          </p>
        </div>
        <GerencianetContextProvider>
          <Register
            register={this.state.register}
            plan={this.props.match.params.plan}
            {...this.props}
          />
        </GerencianetContextProvider>
      </div>
    );
  }
}

export default Agreement;