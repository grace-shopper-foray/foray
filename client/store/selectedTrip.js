import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRIP = 'GET_TRIP'

/**
 * INITIAL STATE
 */
const defaultTrip = {};

/**
 * ACTION CREATORS
 */
const getTrip = trip => ({type: GET_TRIP, trip})

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
