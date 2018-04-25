import React from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe
} from 'react-stripe-elements';
import { connect } from 'react-redux';
import { updateOrderToCheckedOutThunk, fetchOrder } from '../store';

// Reserved for future implementation.
const handleBlur = () => {
  // console.log('[blur]');
};
const handleChange = change => {
  // console.log('[change]', change);
};
const handleFocus = () => {
  // console.log('[focus]');
};
const handleReady = () => {
  // console.log('[ready]');
};

const createOptions = fontSize => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

class InjectedCheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address_line1: '',
      address_line2: '',
      address_city: '',
      address_state: '',
      address_country: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    let { handleSubmit } = this.props;
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit(
            this.props.stripe,
            this.state,
            this.props.user,
            this.props.promoCode.code
          );
        }}
      >
        <input
          className="form-control"
          placeholder="Name"
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input
          className="form-control"
          placeholder="Address Line 1"
          name="address_line1"
          type="text"
          onChange={this.handleChange}
          value={this.state.address_line1}
        />
        <input
          className="form-control"
          placeholder="Address Line 2"
          name="address_line2"
          type="text"
          onChange={this.handleChange}
          value={this.state.address_line2}
        />
        <input
          className="form-control"
          placeholder="State"
          name="address_state"
          type="text"
          onChange={this.handleChange}
          value={this.state.address_state}
        />
        <input
          className="form-control"
          placeholder="City"
          name="address_city"
          type="text"
          onChange={this.handleChange}
          value={this.state.address_city}
        />
        <input
          className="form-control"
          placeholder="Country"
          name="address_country"
          type="text"
          onChange={this.handleChange}
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
        <button type="submit">Pay</button>
      </form>
    );
  }
}

const mapState = state => {
  return {
    order: state.order,
    user: state.user,
    promoCode: state.promoCode,
    total: state.total
  };
};

const mapDispatch = function(dispatch) {
  return {
    fetchOrderFromServer: userId => {
      return dispatch(fetchOrder(userId));
    },
    handleSubmit: (stripe, state, user, code) => {
      stripe.createToken(state).then(stripeToken => {
        dispatch(
          updateOrderToCheckedOutThunk(stripeToken.token.id, code, user.id)
        );
      });
    }
  };
};

export default injectStripe(
  connect(mapState, mapDispatch)(InjectedCheckoutForm)
);
