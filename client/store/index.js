import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import trips from './trips'
import cart from './cart'
import trip from './selectedTrip'

const reducer = combineReducers({
  user,
  trips,
  cart,
  trip
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './selectedTrip'
export * from './user'
export * from './trips'
export * from './cart'
