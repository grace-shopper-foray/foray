import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  Account,
  TripsHome,
  SingleTrip,
  Cart,
  Checkout,
  OrderHistoryDetail,
  EditAccount
} from './components';
import { me, fetchTrips, fetchOrder } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchTripsFromServer();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/cart" component={Cart} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/trips/:tripId" component={SingleTrip} />
        <Route exact path="/order-history" component={OrderHistoryDetail} />

        <Route exact path="/" component={TripsHome} />
        <Route exact path="/checkout" component={Checkout} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/account" component={Account} />
            <Route exact path="/edit-account" component={EditAccount} />
            <Redirect to="/account" />
          </Switch>
        )}
        {!isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available to guests */}
            <Redirect to="/login" />
          </Switch>
        )}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    fetchTripsFromServer: function() {
      return dispatch(fetchTrips());
    },
    fetchOrderfromServer: function(userId) {
      return dispatch(fetchOrder(userId));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
