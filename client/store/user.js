import axios from 'axios';
import history from '../history';
import { fetchOrder, logoutCart } from './index';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const initialState = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateUser = user => ({ type: UPDATE_USER, user });

/**
 * THUNK CREATORS
 */

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => {
      dispatch(getUser(res.data || initialState.user));
      dispatch(fetchOrder(res.data.id));
    })
    .catch(err => console.error(err));

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
        dispatch(getUser(res.data));
        dispatch(fetchOrder(res.data.id));
        history.push('/');
      },
      authError => {
        // (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      dispatch(logoutCart());
      history.push('/login');
    })
    .catch(err => console.error(err));

export const updateUserThunk = (entry, userId) => dispatch =>
  axios
    .put(`/api/users/${userId}`, entry)
    .then(res => res.data)
    .then(updatedUser => {
      dispatch(updateUser(updatedUser));
      history.push('/account');
    })
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, action.user);
    case REMOVE_USER:
      return initialState;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
