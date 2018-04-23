import axios from 'axios'
import { fetchOrder } from './cart'

const initialState = []

//action
const SET_PERCENTAGE = 'SET_PERCENTAGE'

//action creator
const setPercentage = percentage => ({ type: SET_PERCENTAGE, percentage })

//thunk

//user enter a promo Code
export const addPromoCode = (promoCode, userId) => dispatch => {
  return axios
    .get(`/api/promoCode/${promoCode}`)
    .then(res => res.data)
    .then(result => {
      if (result.error) {
        dispatch(setPercentage({ error: 'error' }))
        dispatch(fetchOrder(userId))
      } else {
        dispatch(setPercentage(result))
        dispatch(fetchOrder(userId))
      }
      console.log(userId)
    })
    .catch(err => console.error(err))
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PERCENTAGE:
      return [...state, action.percentage]

    default:
      return state
  }
}
