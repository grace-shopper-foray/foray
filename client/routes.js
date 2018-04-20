import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  Account,
  TripsHome,
  SingleTrip,
  Cart
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
        <Route exact path="/" component={TripsHome} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/account" component={Account} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
