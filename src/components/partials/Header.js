import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
class Header extends Component {
  render() {
    return (
      <header className="il-header">
        <div className="il-container--wrapper">
          <nav>
            <div className="il-brand">
              <img src={logo} alt="logo" />
              <h1 className="il-brand--title">Kaizen Pilates Online</h1>
            </div>

            <ul className="il-menu">
              <li>
                <Link to="/" className="il-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="il-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/plans" className="il-link">
                  Plans
                </Link>
              </li>
              <li>
                <Link to="/contact" className="il-link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
