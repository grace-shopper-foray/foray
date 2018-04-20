import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import {Elements} from 'react-stripe-elements';


import InjectedCheckoutForm from './injectedCheckoutForm';

/**
 * COMPONENT
 */

// export default function Checkout () {
//     return (
//       <Elements>
//         <InjectedCheckoutForm />
//       </Elements>
//     )
// }

export default class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}