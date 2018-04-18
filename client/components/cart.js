import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchCart} from '../store'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCartFromServer()
  }

  render() {
    return (
      <div>
        <h2>Current Cart</h2>
        <ol>
        {
          this.props.cart.map(cartItem => {
            return (
              <li key={cartItem.tripId}>
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
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCartFromServer: () => {
      return dispatch(fetchCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
