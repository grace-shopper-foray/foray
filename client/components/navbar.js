import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <nav className="navbar navbar-light bg-light">
    <div className="container">
      <img
        src="http://freedesignfile.com/upload/2017/08/rocket-icon-vector.png"
        height="75"
        width="75"
        id="rocket-logo"
      />
      <a className="navbar-brand">FORAY</a>
      <Link to="/" className="btn btn-info">
        Home
      </Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick} className="btn btn-danger">
            Logout
          </a>
          <Link to="/account" className="btn btn-primary">
            My Account
          </Link>
          <a>Welcome, {user.firstName}!</a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="btn btn-success">
            Login
          </Link>
          <Link to="/signup" className="btn btn-danger">
            Sign Up
          </Link>
        </div>
      )}
      <Link to="/cart" className="btn btn-warning">
        Go To Cart
      </Link>
      <hr />
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
