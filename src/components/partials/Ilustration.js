import React, { Component } from 'react';

/* context */
import { PageContext } from '../../context/PageContext';

class Ilustration extends Component {
  static contextType = PageContext;

  render() {
    return (
      <div
        className={this.context.getClass(this.props.location.pathname)}
      ></div>
    );
  }
}

export default Ilustration;
