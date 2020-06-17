import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSign } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

class About extends Component {
  render() {
    return (
      <div className="il-content">
        <div className="il-content--text">
          <h1 className="il-big--title">
            O quê você tem de benefício com nossas aulas?
          </h1>
          <h3 className="il-subtitle">
            Aulas online conduzidas por uma instrutora especializada.
          </h3>
          <p>
            Com mais de 30 anos de experiência como educadora física e mais de
            20 anos como instrutora de pilates formada pela{' '}
            <a
              href="https://physiopilates.com/a-physio-pilates/"
              target="_blank"
              rel="noopener noreferrer"
              title="Physio Pilates"
            >
              Physio Pilates
            </a>
            , pioneira na utilização do método Pilates no Brasil e licenciada
            pela <b>Balanced Body</b>.
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

export default About;
