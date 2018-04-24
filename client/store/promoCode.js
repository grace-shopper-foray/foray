import axios from 'axios';
import { fetchOrder } from './cart';

const initialState = {
  percentage: 100,
  error: false
};

//action
const SET_PERCENTAGE = 'SET_PERCENTAGE';
const NOTIFY_INVALID = 'NOTIFY_INVALID';

//action creator
const setPercentage = percentage => {
  return { type: SET_PERCENTAGE, percentage };
};
const notifyInvalid = error => {
  return { type: NOTIFY_INVALID, error };
};

//thunk

//user enter a promo Code
export const addPromoCode = promoCode => dispatch => {
  return axios
    .get(`/api/promoCode/${promoCode}`)
    .then(res => res.data)
    .then(result => {
      dispatch(notifyInvalid(false));
      return dispatch(setPercentage(result));
    })
    .catch(err => {
      console.error(err);
      return dispatch(notifyInvalid(true));
    });
};

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PERCENTAGE:
      return Object.assign({}, state, { percentage: action.percentage });
    case NOTIFY_INVALID:
      return Object.assign({}, state, { error: action.error });
    default:
      return state;
  }
}
