import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const ADD_TRIP = 'ADD_TRIP'
const REMOVE_TRIP = 'DELETE_TRIP'
const UPDATE_TRIP = 'UPDATE_TRIP'
const CHECKOUT_ORDER = 'CHECKOUT_TRIP'
const LOGOUT_CART = 'LOGOUT_CART'
const UPDATE_ORDER_TO_CHECKED_OUT = 'UPDATE_ORDER_TO_CHECKED_OUT'

/**
 * INITIAL STATE
 */
const initialState = { trips: [], user: {} }

/**
 * ACTION CREATORS
 */
const getOrder = order => ({ type: GET_ORDER, order })
const addTrip = trip => ({ type: ADD_TRIP, trip })
export const logoutCart = () => ({ type: LOGOUT_CART })
const checkoutOrder = () => ({ type: CHECKOUT_ORDER })
const removeTrip = order => ({ type: REMOVE_TRIP, order })
const updateTrip = order => ({ type: UPDATE_TRIP, order })
const updateOrderToCheckedOut = order => ({
  type: UPDATE_ORDER_TO_CHECKED_OUT,
  order
})

/**
 * THUNK CREATORS
 */
export const fetchOrder = userId => dispatch => {
  return axios
    .get(`/api/users/${userId}/cart`)
    .then(res => res.data)
    .then(order => {
      console.log(order, ' in thunk')
      if (order.order) {
        // Guest session
        console.log('HIIIII')
      } else {
        return dispatch(getOrder(order))
      }
    })
    .catch(err => console.error(err))
}

//add trip to cart order
export const postOrderThunk = (tripStateInfo, userId) => dispatch => {
  const { tripId, numberOfGuests } = tripStateInfo
  return axios
    .post(`/api/users/${userId}/orders`, { tripId, numberOfGuests })
    .then(res => res.data)
    .then(trip => {
      console.log(trip)
      if (trip.id) {
        // login user
        dispatch(addTrip(trip))
        history.push('/cart')
      } else {
        //guest
      }
      history.push('/cart')
    })
    .catch(err => console.error(err))
}

//user want to checkout in cart
export const checkoutCart = userId => dispatch => {
  return axios
    .put(`/api/users/${userId}/orders/checkout`)
    .then(res => res.data)
    .then(() => dispatch(checkoutOrder()))
    .catch(err => console.error(err))
}

//user remove item from cart
export const removeTripFromCart = (tripId, userId) => dispatch => {
  return axios
    .delete(`api/users/${userId}/${tripId}`)
    .then(res => res.data)
    .then(result => {
      //since destroy doesnt return anything
      if (result.message === 'successful') {
        //update the order state to rerender the cart page
        dispatch(fetchOrder(userId))
      }
    })
    .catch(err => console.error(err))
}

export const updateNumberOfGuests = (
  tripId,
  userId,
  numberOfGuests,
  orderId
) => dispatch => {
  return axios
    .put(`/api/users/${userId}/orders`, { tripId, numberOfGuests, orderId })
    .then(res => res.data)
    .then(order => {
      dispatch(updateTrip(order))
      dispatch(fetchOrder(userId))
    })
    .catch(err => console.error(err))
}

export const updateOrderToCheckedOutThunk = (
  stripeToken,
  promoCode,
  userId
) => dispatch => {
  console.log('reduce', stripeToken, promoCode, userId)
  return axios
    .put(`/api/users/${userId}/orders/checkout`, { stripeToken, promoCode })
    .then(res => res.data)
    .then(() => {
      dispatch(checkoutOrder())
      history.push('/account')
    })
    .catch(err => console.log(err))
}
/**
 * TRIPS SUB-REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return Object.assign({}, state, action.order)
    case UPDATE_TRIP:
      return Object.assign({}, state, action.order)
    case REMOVE_TRIP:
      return Object.assign({}, state, action.order)
    case ADD_TRIP:
      return Object.assign({}, state, { trips: [...state.trips, action.trip] })
    case CHECKOUT_ORDER:
      return initialState
    case LOGOUT_CART:
      return initialState
    default:
      return state
  }
}
