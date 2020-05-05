import React, { Component } from 'react';
import { PageContext } from '../../context/PageContext';
class Ilustration extends Component {
  static contextType = PageContext;
  constructor(props) {
    super(props);
    this.state = {
      background: {},
    };
  }

  getBackground = () => {
    const page = this.props.location.pathname;
    return this.context.getClass(page);
  };

  render() {
    return <div className={this.getBackground()}></div>;
  }
}

export default Ilustration;
