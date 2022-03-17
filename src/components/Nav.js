import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BrandLogo from '../assets/shop-logo.png';

const Nav = ({ cartQuantity }) => {
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
              <button className="button is-warning">Cart ({cartQuantity})</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  cartQuantity: PropTypes.number
};

export default Nav;
