import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchOrder} from '../store'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId;
    this.props.fetchOrderFromServer(orderId)
  }

  render() {
    console.log('hii', this.props)
    return (
      <div>
        <h2>Current Cart</h2>
        <ol>
        {
          this.props.order.map(cartItem => {
            return (
              <li key={cartItem.tripId}>

              <form onSubmit={event => {
                event.preventDefault()
                handleSubmit(this.state)}}>
                <label>Update Number of Guests:
                  <select onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                </label>
                <input type="submit" value="Add Trip to Cart" />
              </form>

                Planet Name - {cartItem.planetName}
                ||
                Moon Name - {cartItem.moonName}
                ||
                Price Per Trip - {cartItem.pricePerTrip}
                ||
                #Nights - {cartItem.duration}
                ||
                Number Of Guests - {cartItem.numberOfGuests}
                ||
                Total - {cartItem.total}
                <button>Delete this Trip</button>
              </li>
            )
          })
        }
        </ol>
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    cart: state.order
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchOrderFromServer: (orderId) => {
      return dispatch(fetchOrder(orderId))
    },
    deleteTripThunk: (tripId) => {
      return dispatch(deleteTrip(tripId))
    },
    updateQuantityThunk: (orderId) => {
      return dispatch(updateTrip(orderId))
    },
    checkoutThunk: (orderId) => {
      return dispatch(checkoutOrder(orderId))
    }
  }
}

//a user can checkout from cart
//a user can delete/remove trip from cart
//a user can update quantity number of guests from cart

export default connect(mapState, mapDispatch)(Cart)
