import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* images */
import logo from '../../assets/logo.png';

/* icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptopHouse,
  faFileContract,
  faBook,
  faBroadcastTower,
} from '@fortawesome/free-solid-svg-icons';

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
                  <FontAwesomeIcon icon={faLaptopHouse} />
                  Início
                </Link>
              </li>
              <li>
                <Link to="/about" className="il-link">
                  <FontAwesomeIcon icon={faBook} />
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/plans" className="il-link">
                  <FontAwesomeIcon icon={faFileContract} />
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="il-link">
                  <FontAwesomeIcon icon={faBroadcastTower} />
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
