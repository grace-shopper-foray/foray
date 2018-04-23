import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import trips from './trips'
import order from './cart'
import trip from './selectedTrip'
import orderHistory from './order-history'
import promoCode from './promoCode'

const reducer = combineReducers({
  user,
  trips,
  order,
  trip,
  orderHistory,
  promoCode
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './selectedTrip'
export * from './user'
export * from './trips'
export * from './cart'
export * from './order-history'
export * from './promoCode'
