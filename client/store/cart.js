import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const DELETE_TRIP = 'DELETE_TRIP'
const UPDATE_TRIP = 'UPDATE_TRIP'
const CHECKOUT_ORDER = 'CHECKOUT_TRIP'

/**
 * INITIAL STATE
 */
const defaultOrder = [
  {tripId: 2, orderId: 1, planetName: 'Mars', moonName: 'Phobos', pricePerTrip: 1800, duration: 3, numberOfGuests: 4, isCheckedOut: false, total: 7200},
  {tripId: 9, orderId: 1, planetName: 'Saturn', moonName: 'Dione', pricePerTrip: 800, duration: 4, numberOfGuests: 3, isCheckedOut: false, total: 2400},
  {tripId: 4, orderId: 1, planetName: 'Jupiter', moonName: 'Io', pricePerTrip: 1400, duration: 2, numberOfGuests: 4, isCheckedOut: false, total: 2800}
]


/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_ORDER, order})


/**
 * THUNK CREATORS
 */
export const fetchOrder = (orderId) =>
  dispatch =>
    axios.get(`api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => dispatch(getOrder(order)))
      .catch(err => console.error(err))


/**
 * TRIPS SUB-REDUCER
 */
export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}
