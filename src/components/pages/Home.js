import React, { Component } from 'react';
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
            Aulas virtuais para você fazer no confoto do lar
          </h3>
          <p className="il-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            reiciendis necessitatibus aut nemo temporibus magnam maiores totam
            quibusdam. Saepe assumenda magni minima, debitis odit, a asperiores
            animi quis deserunt molestiae eius. Cupiditate, maiores placeat
            animi!
          </p>
          <div className="il-buttons">
            <a href="/plans" className="il-btn il-btn--plan">
              <FontAwesomeIcon icon={faSign} />
              Escolha um plano
            </a>

            <a href="/plans" className="il-btn il-btn--video">
              <FontAwesomeIcon icon={faVideo} />
              Veja um vídeo
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
