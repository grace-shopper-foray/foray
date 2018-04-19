import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRIP = 'GET_TRIP'
const POST_TRIP_ADDED = 'POST_TRIP_ADDED'

/**
 * INITIAL STATE
 */
const defaultTrip = {};

/**
 * ACTION CREATORS
 */
const getTrip = trip => ({type: GET_TRIP, trip})
const postTrip = trip => ({type: POST_TRIP_ADDED, trip})

/**
 * THUNK CREATORS
 */
export const fetchTrip = (tripId) => {
  console.log('hey', tripId)
  return dispatch =>
    axios.get(`/api/trips/${tripId}`)
      .then(res => res.data)
      .then(trip => dispatch(getTrip(trip)))
      .catch(err => console.error(err))
}

export const postTripThunk = (trip, history) => {
  return dispatch =>
    axios.post(`api/orders/${trip.orderId}`)
      .then(res => res.data)
      .then(addedTrip => dispatch(fetchTrips()))
      history.push('/cart')

}

/**
 * TRIPS SUB-REDUCER
 */
export default function (state = defaultTrip, action) {
  switch (action.type) {
    case GET_TRIP:
      return Object.assign({}, state, action.trip)
    default:
      return state
  }
}
