/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as Account } from './account'
export { default as EditAccount } from './editAccount'
export { default as TripsHome } from './trips-home'
export { default as Cart } from './cart'
export { default as SingleTrip } from './singleTrip'
export { default as Footer } from './footer'
export { default as Checkout } from './checkout'
export { default as OrderHistoryDetail } from './order-history-detail'
export { Login, Signup } from './auth-form'
