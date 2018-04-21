import axios from 'axios'

// initial state
const defaultUserOrder = {}

//action
const GET_USER_ORDER_HISTORY = 'GET_USER_ORDER_HISTORY'

//action creator
const getUserOrderHistory = order => ({ type: GET_USER_ORDER_HISTORY, order })

//THUNK CREATORS
export const fetchOrderHistory = id => dispatch =>
  axios
    .get(`/api/users/${id}/orders`)
    .then(res => res.data)
    .then(orderHistory => dispatch(getUserOrderHistory(orderHistory)))
    .catch(err => console.error(err))

export default function(state = defaultUserOrder, action) {
  switch (action.type) {
    case GET_USER_ORDER_HISTORY:
      return action.order
    default:
      return state
  }
}
