import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchOrder, removeTripFromCart } from '../store'

/**
 * COMPONENT
 */
export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfGuests: 0
    }
    this.addUpSubTotal = this.addUpSubTotal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    //let userId = 1
    //this.props.fetchOrderFromServer(userId)
  }

  addUpSubTotal(arrayOfAllTripInCart) {
    if (arrayOfAllTripInCart.length !== 0) {
      const subTotal = arrayOfAllTripInCart.reduce((prev, curr) => {
        return +prev + +curr.pricePerTrip * curr.tripOrder.numberOfGuests
      }, 0)
      //update to store state and database
      return subTotal
    }
  }

  handleChange(tripNumberOfGuest) {
    console.log(tripNumberOfGuest.target.value)
    this.setState({ numberOfGuests: tripNumberOfGuest.target.value })
  }

  render() {
    const { user, order } = this.props
    return (
      <div>
        <h2>Current Cart</h2>
        {order.trips.length !== 0 ? (
          <ol>
            {order.trips.map(trip => {
              return (
                <li key={trip.id}>
                  <div className="container">
                    <table
                      id="cart"
                      className="table table-hover table-condensed"
                    >
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Number Of Guests</th>
                          <th className="text-center">Subtotal</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-th="Product">
                            <div className="row">
                              <div
                                className="col-sm-2 hidden-xs"
                                id="cart-image"
                              >
                                <img
                                  src={trip.imagePath}
                                  alt="..."
                                  className="img-responsive"
                                  height="80"
                                  weight="80"
                                />
                              </div>
                              <div className="col-sm-7">
                                <h4 className="nomargin">{trip.moonName}</h4>
                                <p>
                                  {trip.planetName} , duration : {trip.duration}{' '}
                                  days
                                </p>
                              </div>
                            </div>
                          </td>
                          <td data-th="Price">${trip.pricePerTrip}</td>
                          <td data-th="NumberOfGuests">
                            <input
                              type="number"
                              className="form-control text-center"
                              value={this.state.numberOfGuests}
                              onChange={this.handleChange}
                            />
                          </td>
                          <td data-th="Subtotal" className="text-center">
                            ${trip.pricePerTrip *
                              +trip.tripOrder.numberOfGuests}
                          </td>
                          <td className="actions" data-th="">
                            <button className="btn btn-info btn-sm">
                              <i className="fa fa-refresh" />
                            </button>
                            <button className="btn btn-danger btn-sm">
                              <i
                                className="fa fa-trash-o"
                                onClick={() =>
                                  this.props.deleteTripThunk(trip.id, user.id)
                                }
                              />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              )
            })}
            <div className="in-line input-group mb-3">
              <h4>Total : ${this.addUpSubTotal(this.props.order.trips)}</h4>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo Code"
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">
                    Enter
                  </button>
                </div>
              </div>
              <a href="#" className="btn btn-success">
                <i className="fa fa-angle-right" /> Checkout
              </a>
            </div>
          </ol>
        ) : (
          <div>Shopping Cart Empty</div>
        )}
        <Link to="/" className="btn btn-warning">
          <i className="fa fa-angle-left" /> Continue Shopping
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.order,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrderFromServer: userId => {
      return dispatch(fetchOrder(userId))
    },
    deleteTripThunk: (tripId, userId) => {
      return dispatch(removeTripFromCart(tripId, userId))
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
