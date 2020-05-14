import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSign } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
class Home extends Component {
  render() {
    return (
      <div className="il-content">
        <div className="il-content--text">
          <h1 className="il-big--title">Pilates em casa</h1>
          <h3 className="il-subtitle">
            Aulas virtuais de pilates no confoto do lar
          </h3>
          <p className="il-description">
            Você gostaria de praticar exercícios de pilates, mas a situação que
            estamos passando diz que a melhor opção é ficar em casa.<br></br>
            Então porquê não fazer no conforto do seu lar.<br></br>Escolha um
            plano e garanta sua vaga.
          </p>
          <div className="il-buttons">
            <Link to="/plans" className="il-btn il-btn--plan">
              <FontAwesomeIcon icon={faSign} />
              Escolha um plano
            </Link>
            <Link to="/video" className="il-btn il-btn--video">
              <FontAwesomeIcon icon={faVideo} />
              Veja um vídeo
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
