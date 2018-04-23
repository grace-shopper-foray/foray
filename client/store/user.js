import axios from 'axios'
import history from '../history'
import { fetchOrder, logoutCart, fetchOrderHistory } from './index'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => {
      dispatch(getUser(res.data || defaultUser))
      dispatch(fetchOrder(res.data.id))
      dispatch(fetchOrderHistory(res.data.id))
    })
    .catch(err => console.log(err))

export const auth = (
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
  method
) => dispatch =>
  axios
    .post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    })
    .then(
      res => {
        dispatch(getUser(res.data))
        dispatch(fetchOrder(res.data.id))
        dispatch(fetchOrderHistory(res.data.id))
        history.push('/')
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      dispatch(logoutCart())
      history.push('/login')
    })
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
