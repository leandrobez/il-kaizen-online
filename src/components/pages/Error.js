import React, { Component } from 'react';

class Error extends Component {
  render() {
    const currentStyle = { textAlign: 'center' };
    return (
      <section className="il-section il-section--error">
        <h2
          className="il-section--title il-text-color--medium-dark"
          style={currentStyle}
        >
          404 - não encontrada
        </h2>
      </section>
    );
  }
}

export default Error;
