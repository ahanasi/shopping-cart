import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../assets/shop-logo.png';

const Nav = () => {
  return (
    <nav className="navbar" role={'navigation'} aria-label={'main navigation'}>
      <div className="navbar-brand m-2">
        <Link to={'/'}>
          <img src={BrandLogo} className="image is-64x64" />
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to={'/cart'}>
              {' '}
              <button className="button is-warning">Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
