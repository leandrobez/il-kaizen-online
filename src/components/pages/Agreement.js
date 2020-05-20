import React, { Component } from 'react';

import GerencianetContextProvider from '../../context/GerencianetContext';
import Register from '../forms/Register';

class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: {},
      subscription: {},
    };
  }

  render() {
    return (
      <div className="il-content il-agreement">
        <div className="il-content--text">
          <h1 className="il-big--title">
            Contratar o plano <span>{this.props.match.params.plan}</span>
          </h1>
          <h3 className="il-subtitle">Preencha o formulário para continuar</h3>
          <p className="il-description">
            Os dados coletados não serão divulgados. Usamos apenas para o
            controle eficiente dos pagamentos.<br></br>Abaixo escolha como
            deseja fazer o pagamento, logo após preencha o formulário que será
            mostrado.
          </p>
        </div>
        <GerencianetContextProvider>
          <Register plan={this.props.match.params.plan} />
        </GerencianetContextProvider>
      </div>
    );
  }
}

export default Agreement;
