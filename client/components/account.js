import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUsersThunk } from '../store'


/**
 * COMPONENT
 */
const Account = props => {
  const { user } = props
  console.log(props)
  return user.isAdmin ?
  (
    <div className="container">
      <div className="row">
        <div className="container-fluid well span6">
          <h4>Account Information</h4>
          <div className="row-fluid">
            <div className="span2">
              <img src="" className="img-circle" />
            </div>

            <div className="span8">
              <h3>
                Welcome Admin, {user.firstName} {user.lastName}
              </h3>
              <h6>Email: {user.email}</h6>
              <h6>Phone Number: {user.phoneNumber}</h6>
            </div>

            <div className="dropdown show">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Action
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link to="/edit-account" className="dropdown-item" href="#">
                  Edit Account Info
                </Link>
                <Link to="/order-history" className="dropdown-item" href="#">
                  Order History
                </Link>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
    :
  (
    <div className="container">
      <div className="row">
        <div className="container-fluid well span6">
          <h4>Account Information</h4>
          <div className="row-fluid">
            <div className="span2">
              <img src="" className="img-circle" />
            </div>

            <div className="span8">
              <h3>
                Welcome, {user.firstName} {user.lastName}
              </h3>
              <h6>Email: {user.email}</h6>
              <h6>Phone Number: {user.phoneNumber}</h6>
            </div>
            <div className="dropdown show">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Action
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link to="/edit-account" className="dropdown-item" href="#">
                  Edit Account Info
                </Link>
                <Link to="/order-history" className="dropdown-item" href="#">
                  Order History
                </Link>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatch = function(dispatch) {
  return {
    getUsers: function() {
      return dispatch(getUsersThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Account)

/**
 * PROP TYPES
 */
Account.propTypes = {
  email: PropTypes.string
};
