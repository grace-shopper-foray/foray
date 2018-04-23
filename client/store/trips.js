import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRIPS = 'GET_TRIPS'

/**
 * INITIAL STATE
 */
const defaultTrips = [{planetName: 'Mars', moonName: 'Phobos', pricePerTrip: 200000, startDate: '2016-08-09 04:05:02', duration: 24, description: 'One Way Trip', imagePath: 'TBD'},{planetName: 'Earth', moonName: 'Moon', pricePerTrip: 1, startDate: '2017-08-09 04:05:02', duration: 1, description: 'One Way Trip', imagePath: 'TBD'}];

/**
 * ACTION CREATORS
 */
const getTrips = trips => ({type: GET_TRIPS, trips})

/**
 * THUNK CREATORS
 */
export const fetchTrips = () =>
  dispatch =>
    axios.get('/api/trips')
      .then(res => res.data)
      .then(trips => dispatch(getTrips(trips)))
      .catch(err => console.error(err))

/**
 * TRIPS SUB-REDUCER
 */
export default function (state = defaultTrips, action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.trips
    default:
      return state
  }
}
