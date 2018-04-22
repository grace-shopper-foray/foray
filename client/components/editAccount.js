import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUserThunk } from '../store'


class EditAccount extends React.Component {
    constructor() {
      super()
        this.state = {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          password: ''
        }
      this.handleChange = this.handleChange.bind(this)
    }

  handleChange (evt) {
      console.log(evt.target.name, evt.target.value)
      this.setState({[evt.target.name]: evt.target.value})
    }

  render() {
    let { handleSubmit, user } = this.props
    return (
      <div>
        <h1>Edit Your Account Information</h1>
        <form onSubmit={() => handleSubmit(event, user.id)}>
        <input
        className="form-control"
        placeholder="First Name"
        name="firstName"
        type="text"
        onChange={this.handleChange}
        value={this.state.firstName}
        />
        <input
        className="form-control"
        placeholder="Last Name"
        name="lastName"
        type="text"
        onChange={this.handleChange}
        value={this.state.lastName}
        />
        <input
        className="form-control"
        placeholder="Email"
        name="email"
        type="text"
        onChange={this.handleChange}
        value={this.state.email}
        />
        <input
        className="form-control"
        placeholder="Password"
        name="password"
        type="text"
        onChange={this.handleChange}
        value={this.state.password}
        />
        <input
        className="form-control"
        placeholder="Phone Number"
        name="phoneNumber"
        type="text"
        onChange={this.handleChange}
        value={this.state.phoneNumber}
        />
        <button>Submit Updated Info</button>
        </form>
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (event, userId) {
      event.preventDefault()
      const updatedEntry = {[event.target.name]: event.target.value}
      console.log('dispatch', userId, event)
    
      dispatch(updateUserThunk(updatedEntry, userId))
      // this.setState({
      //     firstName: '',
      //     lastName: '',
      //     phoneNumber: '',
      //     email: '',
      //     password: ''
      // })

    }
  }
}

export default connect(mapState, mapDispatch)(EditAccount)

// /**
//  * PROP TYPES
//  */
// EditAccount.propTypes = {
//   email: PropTypes.string
// }
