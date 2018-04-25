import React from 'react';
import { Elements } from 'react-stripe-elements';

import InjectedCheckoutForm from './injectedCheckoutForm';

/**
 * COMPONENT
 */

export default function Checkout() {
  return (
    <Elements>
      <InjectedCheckoutForm />
    </Elements>
  );
}
