import React, { Component } from 'react';

class Plans extends Component {
  render() {
    return (
      <div className="il-content">
        <div className="il-content--text">
          <h1 className="il-big--title">Escolha um plano</h1>
          <h3 className="il-subtitle">Pacotes de 1 a 3 vezes por semana</h3>
          <div className="il-card--plans">
            <div className="il-card--item">
              <span className="il-card--title">1 x semana</span>
              <span className="il-card--price">R$ 45,00</span>
              <div className="il-card--buttons">
                <button className="il-btn il-btn--card">Contratar</button>
              </div>
            </div>
            <div className="il-card--item">
              <span className="il-card--title">2 x semana</span>
              <span className="il-card--price">R$ 65,00</span>
              <div className="il-card--buttons">
                <button className="il-btn il-btn--card">Contratar</button>
              </div>
            </div>
            <div className="il-card--item">
              <span className="il-card--title">3 x semana</span>
              <span className="il-card--price">R$ 89,00</span>
              <div className="il-card--buttons">
                <button className="il-btn il-btn--card">Contratar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Plans;
