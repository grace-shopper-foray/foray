import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchOrder, removeTripFromCart, updateNumberOfGuests } from '../store'

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
    this.subTotalItem = this.subTotalItem.bind(this)
  }

  componentDidMount() {
    //let userId = 1
    //this.props.fetchOrderFromServer(userId)
  }

  //add subTotal for all item in cart
  addUpSubTotal(arrayOfAllTripInCart) {
    if (arrayOfAllTripInCart.length !== 0) {
      const subTotal = arrayOfAllTripInCart.reduce((prev, curr) => {
        return +prev + +curr.pricePerTrip * curr.tripOrder.numberOfGuests
      }, 0)
      //update to store state and database
      return subTotal
    }
  }

  subTotalItem(allTripInCart) {
    if (allTripInCart.length === 1) {
      return <strong>{`${allTripInCart.length} item`}</strong>
    } else {
      return <strong>{`${allTripInCart.length} items`}</strong>
    }
  }

  //send to thunk immediately and reload cart
  handleChange(event, tripId, userId, orderId) {
    event.persist() //react async for SyntheticEvent
    let numberOfGuest = +event.target.value
    this.props.updateQuantityThunk(tripId, userId, numberOfGuest, orderId)
  }

  render() {
    const { user, order } = this.props
    console.log(order.trips.length)
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
                          {/* <th className="text-center">Subtotal</th> */}
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
                            <select
                              onChange={evt =>
                                this.handleChange(
                                  evt,
                                  trip.id,
                                  user.id,
                                  order.id
                                )
                              }
                              value={trip.tripOrder.numberOfGuests}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </td>
                          <td className="actions" data-th="">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                this.props.deleteTripThunk(trip.id, user.id)
                              }
                            >
                              <i className="fa fa-trash-o" />
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
              <h4>
                Subtotal : {this.subTotalItem(order.trips)} ${this.addUpSubTotal(
                  this.props.order.trips
                )}
              </h4>
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
                <i className="fa fa-angle-right" /> Proceed to Checkout
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
    updateQuantityThunk: (tripId, userId, numberOfGuest, orderId) => {
      return dispatch(
        updateNumberOfGuests(tripId, userId, numberOfGuest, orderId)
      )
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
