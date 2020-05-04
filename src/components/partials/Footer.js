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
              <img src={instagram} title="Compartilhe" alt="Compartilhe" />
            </span>
          </div>
          <div className="il-by">
            <span>
              bys to -{' '}
              <a href="#!" title="InternetLojas">
                internetLojas
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
