import React from 'react';
import {
	CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};


class InjectedCheckoutForm extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      address_line1: '',
      address_line2: '',
      address_city: '',
      address_state: '',
      address_country:''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
  }
  
  handleAddressChange= evt => {
      console.log('name', evt.target.name)
      console.log('value', evt.target.value)
      this.setState({[evt.target.name]: evt.target.value})
  }
  
  handleSubmit = ev => {
    ev.preventDefault();
    console.log('submit', this.state)
    this.props.stripe.createToken(this.state)
    .then(payload => console.log(payload))
    .then(() => this.setState({
      name: '',
      address_line1: '',
      address_line2: '',
      address_city: '',
      address_state: '',
      address_country:''
    }))
    
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <input
          className="form-control"
          placeholder="Name"
          name="name"
          type="text"
          onChange={this.handleAddressChange}
          value={this.state.name}
          />
          <input
          className="form-control"
          placeholder="Address Line 1"
          name="address_line1"
          type="text"
          onChange={this.handleAddressChange}
          value={this.state.address_line1}
          />
          <input
          className="form-control"
          placeholder="Address Line 2"
          name="address_line2"
          type="text"
          onChange={this.handleAddressChange}
          value={this.state.address_line2}
          />
          <input
          className="form-control"
          placeholder="State"
          name="address_state"
          type="text"
          onChange={this.handleAddressChange}
          value={this.state.address_state}
          />
          <input
          className="form-control"
          placeholder="City"
          name="address_city"
          type="text"
          onChange={this.handleAddressChange}
          value={this.state.address_city}
          />
          <input
          className="form-control"
          placeholder="Country"
          name="address_country"
          type="text"
          onChange={this.handleAddressChange}
          value={this.state.address_country}
          />

        <label>
          Card number
          <CardNumberElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Postal code
          <PostalCodeElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}

export default injectStripe(InjectedCheckoutForm)
