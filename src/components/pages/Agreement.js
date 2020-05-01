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
        name: 'Leandro Bezerra',
        email: 'leanbezerra@terra.com.br',
        cpf: '70334641772',
        birth: '1961-06-26',
        phone_number: '5133983816',
        pay: 'banking_billet',
        address: {
          street: 'Av Jacuí',
          number: '1248',
          complement: 'Casa 5',
          neighborhood: 'Cristal',
          zipcode: '90810150',
          city: 'Porto Alegre',
          state: 'RS',
        },
      },
    };
  }

  render() {
    return (
      <div className="il-content il-contact">
        <div className="il-content--text">
          <h1 className="il-big--title">
            Contratar o plano {this.props.match.params.plan}
          </h1>
          <h3 className="il-subtitle">Preencha o formulário para continuar</h3>
          <p className="il-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            repellat id quas! Corporis minus quam, magnam amet deserunt
            perspiciatis adipisci sed sint ab!
          </p>
        </div>
        <GerencianetContextProvider>
          <Register
            register={this.state.register}
            plan={this.props.match.params.plan}
          />
        </GerencianetContextProvider>
      </div>
    );
  }
}

export default Agreement;
