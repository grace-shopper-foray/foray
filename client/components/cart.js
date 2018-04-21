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
    console.log(this.props.order.trips)
    return (
      <div>
        <h2>Current Cart</h2>
        {this.props.order.trips.length !== 0 ? (
          <ol>
            {this.props.order.trips.map(trip => {
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
                          <th> Quantity</th>
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
                          <td data-th="Quantity">
                            <input
                              type="number"
                              className="form-control text-center"
                              value={trip.tripOrder.numberOfGuests}
                            />
                          </td>
                          <td data-th="Subtotal" className="text-center">
                            {trip.pricePerTrip * trip.tripOrder.numberOfGuests}
                          </td>
                          <td className="actions" data-th="">
                            <button className="btn btn-info btn-sm">
                              <i className="fa fa-refresh" />
                            </button>
                            <button className="btn btn-danger btn-sm">
                              <i className="fa fa-trash-o" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="visible-xs">
                          <td className="text-center">
                            <strong>Total 1.99</strong>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="hidden-xs" />
                          <td className="hidden-xs text-center">
                            <strong>Total $1.99</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <a href="#" className="btn btn-success btn-block">
                    Checkout <i className="fa fa-angle-right" />
                  </a>
                </li>
              )
            })}
          </ol>
        ) : (
          <div>Shopping Cart Empty</div>
        )}
        <div>
          <Link to="/" className="btn btn-warning">
            <i className="fa fa-angle-left" /> Continue Shopping
          </Link>
        </div>
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
