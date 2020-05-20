import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSign, faVideo } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
  render() {
    return (
      <div className="il-content">
        <div className="il-content--text">
          <h1 className="il-big--title">Pilates em casa</h1>
          <h3 className="il-subtitle">Aulas de pilates no confoto do lar</h3>
          <p className="il-description">
            Você gostaria de praticar o pilates, mas a situação que estamos
            passando recomenda que você fique em casa.<br></br>
            Então que tal ter a opção de fazer no conforto do seu lar.<br></br>
            Nós podemos te dar ajudar.<br></br>Escolha um plano e garanta sua
            vaga.
          </p>
          <div className="il-buttons">
            <Link to="/plans" className="il-btn il-btn--plan">
              <FontAwesomeIcon icon={faSign} />
              Escolha um plano
            </Link>
            <Link to="/video" className="il-btn il-btn--video">
              <FontAwesomeIcon icon={faVideo} />
              Veja esse vídeo
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
