import axios from 'axios';
import history from '../history';
import { fetchOrderHistory } from './order-history';

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER';
const ADD_TRIP = 'ADD_TRIP';
const LOGOUT_CART = 'LOGOUT_CART';
const CHECKOUT_ORDER = 'CHECKOUT_TRIP';
const UPDATE_TRIP = 'UPDATE_TRIP';

/**
 * INITIAL STATE
 */
const initialState = { trips: [], user: {} };

/**
 * ACTION CREATORS
 */
const getOrder = order => ({ type: GET_ORDER, order });
const addTrip = trip => ({ type: ADD_TRIP, trip });
export const logoutCart = () => ({ type: LOGOUT_CART });
const checkoutOrder = () => ({ type: CHECKOUT_ORDER });
const updateTrip = order => ({ type: UPDATE_TRIP, order });

/**
 * THUNK CREATORS
 */
export const fetchOrder = userId => dispatch => {
  return axios
    .get(`/api/users/${userId}/cart`)
    .then(res => res.data)
    .then(order => {
      return dispatch(getOrder(order));
    })
    .catch(err => console.error(err));
};

//add trip to cart order
export const postOrderThunk = (tripStateInfo, userId) => dispatch => {
  const { tripId, numberOfGuests } = tripStateInfo;
  return axios
    .post(`/api/users/${userId}/orders`, { tripId, numberOfGuests })
    .then(res => res.data)
    .then(trip => {
      //if trip is the same then update it
      if (userId) {
        dispatch(addTrip(trip));
      } else {
        dispatch(addTrip(trip));
      }
      history.push('/cart');
    })
    .catch(err => console.error(err));
};

//user remove item from cart
export const removeTripFromCart = (tripId, userId) => dispatch => {
  return axios
    .delete(`/api/users/${userId}/trip/${tripId}`)
    .then(res => res.data)
    .then(result => {
      // destroy item returs a custom success message
      if (result.message === 'successful') {
        //logged in user
        //update the order state to rerender the cart page
        dispatch(fetchOrder(userId));
      } else {
        //Guest User
        dispatch(getOrder(result));
        //fetch order return new data
      }
    })
    .catch(err => console.error(err));
};

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
      if (userId) {
        dispatch(updateTrip(order));
        dispatch(fetchOrder(userId));
      } else {
        //Guest user
        dispatch(updateTrip(order));
        dispatch(fetchOrder());
      }
    })
    .catch(err => console.error(err));
};

export const updateOrderToCheckedOutThunk = (
  stripeToken,
  promoCode,
  userId
) => dispatch => {
  if (userId) {
    return axios
      .put(`/api/users/${userId}/orders/checkout`, { stripeToken, promoCode })
      .then(res => res.data)
      .then(() => {
        dispatch(checkoutOrder());
        dispatch(fetchOrderHistory(userId));
        history.push('/order-history');
      })
      .catch(err => console.error(err));
  } else {
    return axios
      .post('/api/orders', { stripeToken, promoCode })
      .then(res => res.data)
      .then(() => {
        dispatch(checkoutOrder());
        history.push('/signup');
      })
      .catch(err => console.error(err));
  }
};
/**
 * TRIPS SUB-REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return Object.assign({}, state, action.order);
    case ADD_TRIP:
      return Object.assign({}, state, { trips: [...state.trips, action.trip] });
    case LOGOUT_CART:
      return initialState;
    case CHECKOUT_ORDER:
      return initialState;
    case UPDATE_TRIP:
      return Object.assign({}, state, action.order);
    default:
      return state;
  }
}
