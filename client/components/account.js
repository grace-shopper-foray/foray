import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const Account = props => {
  const { user } = props

  return (
    <div className="container text-center">
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
              <div>
                <h6>Order History</h6>
              </div>
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
                <a className="dropdown-item" href="#">
                  Edit
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
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
    user: state.user
  }
}

export default connect(mapState)(Account)

/**
 * PROP TYPES
 */
Account.propTypes = {
  email: PropTypes.string
}
