import axios from 'axios';
import { fetchOrder } from './cart';

const initialState = {
  percentage: 100,
  code: '',
  error: false
};

//action
const SET_PERCENTAGE = 'SET_PERCENTAGE';
const NOTIFY_INVALID = 'NOTIFY_INVALID';
const SET_CODE = 'SET_CODE'

//action creator
const setPercentage = percentage => {
  return { type: SET_PERCENTAGE, percentage };
};
const notifyInvalid = error => {
  return { type: NOTIFY_INVALID, error };
};
const setCode = code => {
  return { type: SET_CODE, code }
}

//thunk

//user enter a promo Code
export const addPromoCode = promoCode => dispatch => {
  return axios
    .get(`/api/promoCode/${promoCode}`)
    .then(res => res.data)
    .then(result => {
      dispatch(notifyInvalid(false));
      dispatch(setCode(result.name))
      return dispatch(setPercentage(result.percentage));
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
    case SET_CODE:
      return Object.assign({}, state, { code: action.code })
    default:
      return state;
  }
}
