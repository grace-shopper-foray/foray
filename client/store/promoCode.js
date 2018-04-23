import axios from 'axios'

const initialState = {}

//action
const SET_PERCENTAGE = 'SET_PERCENTAGE'

//action creator
const setPercentage = percentage => ({ type: SET_PERCENTAGE, percentage })

//thunk

//user enter a promo Code
export const addPromoCode = promoCode => dispatch => {
  return axios
    .get(`/api/promoCode/${promoCode}`)
    .then(res => res.data)
    .then(result => {
      if (result.error) {
        dispatch(setPercentage({ error: 'error' }))
      } else {
        dispatch(setPercentage(result))
      }
    })
    .catch(err => console.error(err))
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PERCENTAGE:
      return action.percentage

    default:
      return state
  }
}
