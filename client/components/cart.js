import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchOrder } from '../store'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  componentDidMount() {
    //let userId = 1
    //this.props.fetchOrderFromServer(userId)
  }

  render() {
    return (
      <div>
        <h2>Current Cart</h2>
        <ol>
          {this.props.order.trips &&
            this.props.order.trips.map(trip => {
              return (
                <li key={trip.id}>
                  {/*
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
              */}
                  Moon Name - {trip.moonName}
                  || Planet Name - {trip.planetName}
                  || Price Per Trip - {trip.pricePerTrip}
                  || #Nights - {trip.duration}
                  || Number Of Guests - {trip.tripOrder}
                  || Total - {trip.tripOrder}
                  <button>Delete this Trip</button>
                </li>
              )
            })}
        </ol>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrderFromServer: userId => {
      return dispatch(fetchOrder(userId))
    },
    deleteTripThunk: tripId => {
      return dispatch(deleteTrip(tripId))
    },
    updateQuantityThunk: orderId => {
      return dispatch(updateTrip(orderId))
    },
    checkoutThunk: orderId => {
      return dispatch(checkoutOrder(orderId))
    }
  }
}

//a user can checkout from cart
//a user can delete/remove trip from cart
//a user can update quantity number of guests from cart

export default connect(mapState, mapDispatch)(Cart)
