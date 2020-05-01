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
                  Início
                </Link>
              </li>
              <li>
                <Link to="/about" className="il-link">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/plans" className="il-link">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="il-link">
                  Contato
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
