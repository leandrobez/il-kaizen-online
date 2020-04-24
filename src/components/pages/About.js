import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="il-content">
        <div className="il-content--text">
          <h1 className="il-big--title">O quê você recebe?</h1>
          <h3 className="il-subtitle">
            Uma tutora online que te conduz nas aulas
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            reiciendis necessitatibus aut nemo temporibus magnam maiores totam
            quibusdam. Saepe assumenda magni minima, debitis odit, a asperiores
            animi quis deserunt molestiae eius.
          </p>
          <div className="il-buttons">
            <a href="/plans" className="il-btn il-btn--plan">
              Escolha um plano
            </a>

            <a href="/plans" className="il-btn il-btn--video">
              Veja um vídeo
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
