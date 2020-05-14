import React from 'react';
import share from '../../assets/share.png';
import instagram from '../../assets/instagram.png';
export default function () {
  return (
    <>
      <footer className="il-footer">
        <div className="il-footer--content">
          <div className="il-shares">
            <span>
              <img src={share} title="Compartilhe" alt="Compartilhe" />
            </span>
            <span>
              <a
                href="https://www.instagram/pilateskaizen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} title="Compartilhe" alt="Compartilhe" />
              </a>
            </span>
          </div>
          <div className="il-by">
            <span className="il-color--text__light">
              by to -{' '}
              <a
                href="http://www.internetlojas.com"
                className="il-color--text__green"
                title="InternetLojas"
                target="_blank"
                rel="noopener noreferrer"
              >
                internetLojas
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
