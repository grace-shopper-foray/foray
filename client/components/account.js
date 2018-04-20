import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Account = (props) => {
  const {user} = props

  return (
    <div>
      <h3>Welcome, {user.firstName} {user.lastName}</h3>
      <h4>Account Information</h4>
      <ul>
        <li>Email Address: {user.email}</li>
        <li>Phone Number: {user.phoneNumber}</li>
        <li>Order History: TBD</li>
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
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
