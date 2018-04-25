import axios from 'axios';
import history from '../history';
import { fetchTrips } from './trips';

/**
 * ACTION TYPES
 */
const GET_TRIP = 'GET_TRIP';
const POST_TRIP_ADDED = 'POST_TRIP_ADDED';
const REMOVE_TRIP = 'REMOVE_TRIP';

/**
 * INITIAL STATE
 */
const defaultTrip = {};

/**
 * ACTION CREATORS
 */
const getTrip = trip => ({ type: GET_TRIP, trip });
const postTrip = trip => ({ type: POST_TRIP_ADDED, trip });
const removeTrip = () => ({ type: REMOVE_TRIP });

/**
 * THUNK CREATORS
 */
export const fetchTripThunk = tripId => {
  return dispatch =>
    axios
      .get(`/api/trips/${tripId}`)
      .then(res => res.data)
      .then(trip => dispatch(getTrip(trip)))
      .catch(err => console.error(err));
};

export const postTripThunk = (trip, history) => {
  return dispatch =>
    axios
      .post(`api/orders/${trip.orderId}`)
      .then(res => res.data)
      .then(() => {
        dispatch(fetchTrips());
        dispatch(removeTrip());
        history.push('/cart');
      })
      .catch(err => console.error(err));
};

/**
 * TRIPS SUB-REDUCER
 */
export default function(state = defaultTrip, action) {
  switch (action.type) {
    case GET_TRIP:
      return Object.assign({}, state, action.trip);
    case REMOVE_TRIP:
      return defaultTrip;
    default:
      return state;
  }
}
