import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <div>
            <div>
              <label htmlFor="firstName">
                <small>FirstName</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>LastName</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="phoneNumber">
                <small>Phone Number</small>
              </label>
              <input name="phoneNumber" type="text" />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      //signup / signin
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;

      let firstName = '';
      let lastName = '';
      let phoneNumber = '';
      if (formName === 'signup') {
        firstName = evt.target.firstName.value;
        lastName = evt.target.lastName.value;
        phoneNumber = evt.target.phoneNumber.value;
      }
      dispatch(
        auth(firstName, lastName, phoneNumber, email, password, formName)
      );
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
