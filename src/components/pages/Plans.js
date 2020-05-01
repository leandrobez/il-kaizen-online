import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';
class Plans extends Component {
  render() {
    const planList = [
      { id: 1, title: '1 x semana', price: '120', path: '/basic' },
      { id: 2, title: '2 x semana', price: '210', path: '/vip' },
      { id: 3, title: '3 x semana', price: '300', path: '/premium' },
    ];

    return (
      <div className="il-content">
        <div className="il-content--text">
          <h1 className="il-big--title">Escolha um plano</h1>
          <h3 className="il-subtitle">Pacotes de 1 a 3 vezes por semana</h3>

          <div className="il-card--plans">
            {planList.map((plan) => (
              <div className="il-card--item" key={'plan_' + plan.id}>
                <span className="il-card--title">{plan.title}</span>
                <span className="il-card--price">R$ {plan.price},00</span>
                <div className="il-card--buttons">
                  <a
                    href={'/agreement' + plan.path}
                    className="il-btn il-btn--card"
                    title={plan.title}
                  >
                    <FontAwesomeIcon icon={faHandsHelping} />
                    Contratar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Plans;
