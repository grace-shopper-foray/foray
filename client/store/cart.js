import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const defaultCart = [
  {tripId: 2, orderId: 1, planetName: 'Mars', moonName: 'Phobos', pricePerTrip: 1800, duration: 3, numberOfGuests: 4, isCheckedOut: false, total: 7200},
  {tripId: 9, orderId: 1, planetName: 'Saturn', moonName: 'Dione', pricePerTrip: 800, duration: 4, numberOfGuests: 3, isCheckedOut: false, total: 2400},
  {tripId: 4, orderId: 1, planetName: 'Jupiter', moonName: 'Io', pricePerTrip: 1400, duration: 2, numberOfGuests: 4, isCheckedOut: false, total: 2800}
]


/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})


/**
 * THUNK CREATORS
 */
export const fetchCart = () => 
  dispatch =>
    axios.get('api/cart')
      .then(res => res.data)
      .then(cart => dispatch(getCart(cart)))
      .catch(err => console.error(err))


/**
 * TRIPS SUB-REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}