import React, { Component } from 'react';
import movie from '../../assets/video/aulasonline.mp4';

class Video extends Component {
  render() {
    return (
      <div className="il-content il-video">
        <div className="il-content--text">
          <h1 className="il-big--title">Aulas Online</h1>
          <h3 className="il-subtitle">
            Um pequeno vídeo de como são realizadas a aulas.
          </h3>
        </div>
        <div className="il-video--content">
          <video id="video-kaizen" width="320" height="240" controls="controls">
            <source src={movie} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

export default Video;
