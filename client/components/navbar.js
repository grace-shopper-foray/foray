import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand">FORAY</a>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div navbar-nav>
              {/* The navbar will show these links before you log in */}
              <Link to="/" className="btn btn-secondary">All Trips</Link>
              <Link to="/login" className="btn btn-success">Login</Link>
              <Link to="/signup" className="btn btn-danger">Sign Up</Link>
              <Link to="/cart" className="btn btn-warning">Go To Cart</Link>
            </div>
          )}
          <form className="form-inline">
            <input className='form-control' type='search' placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type='submit'>Search</button>
          </form>
        <hr />
      </div>
    </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
