import React, { Component } from 'react';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
    };
  }
  componentDidMount = () => {
    this.setState({ flag: this.props.match.params.flag });
  };

  getResult = () => {
    if (this.state.flag === 'success') {
      const key = 'checkout';
      const checkout = JSON.parse(window.localStorage.getItem(key));
      const message =
        'Sua inscrição foi realizada com sucesso. Verifique sua caixa de email para mais detalhes sobre o pagamento. Assim que tivermos a confirmação do mesmo o seu acesso as aulas estará liberado.';
      if (checkout.payment !== 'credit_card') {
        return (
          <div className="il-data--inner">
            <h4>Plano VIP</h4>
            <p>{message}</p>
            <p>
              Código de barras - <span>{checkout.barcode}</span>
            </p>
            <p>
              Vizualise seu boleto nesse{' '}
              <a
                href={checkout.link}
                className="il-color--text__dark"
                title="Veja o boleto"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                link
              </a>{' '}
              <span>
                <em>{checkout.link}</em>
              </span>
            </p>
            <p>
              Ou baixe seu boleto no{' '}
              <a
                href={checkout.pdf.charge}
                className="il-color--text__dark"
                title="Veja o boleto"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>{' '}
              <span>
                <em>{checkout.pdf.charge}</em>
              </span>
            </p>
          </div>
        );
      } else {
        return (<div className="il-data--inner">
        <h4>Plano VIP</h4>
        <p>{message}</p>
        
        
      </div>)
      }
    } else {
      return (
        <p>
          'Por algum motivo não foi possível processar suas requisições. Por
          favor entrar em contato com o administrador.'
        </p>
      );
    }
  };

  getResultInner = () => {
    if (this.state.flag === 'success') {
      const key = 'checkout';
      const checkout = JSON.parse(window.localStorage.getItem(key));
      return (
        <div className="il-data--inner">
          <h4>Identificador da inscrição - #{checkout.subscription_id}</h4>
          <span>
            Data: <em>{checkout.first_execution}</em>
          </span>
          <span>
            Forma de pagamento: <em>{checkout.payment}</em>
          </span>
          <span>
            Total: <em>{checkout.total / 100}</em>
          </span>
          <hr />
          <h5>Items</h5>
          <span>Plano: VIP</span>
          <span>Situação: {checkout.charge.status}</span>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="il-content il-checkout">
        <div className="il-content--text">
          <h1 className="il-big--title">Resumo do seu pedido</h1>
          <h3 className="il-subtitle">Veja os detalhes do seu pedido.</h3>
          <div className="il-checkout--result">
            <div className="il-result--data">{this.getResult()}</div>
            <div className="il-result--data">{this.getResultInner()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
