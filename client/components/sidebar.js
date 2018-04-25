import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTrips } from '../store';

/**
 * COMPONENT
 */

class Sidebar extends React.Component {
  componentDidMount() {
    this.props.fetchTripsFromServer();
  }

  render() {
    return (
      <div className="sidenav">
        <a>Available trips:</a>
        {this.props.trips.map(trip => {
          return (
            <Link key={trip.moonName} to={`/trips/${trip.id}`}>
              {trip.moonName}
            </Link>
          );
        })}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    trips: state.trips
  };
};

const mapDispatch = function(dispatch) {
  return {
    fetchTripsFromServer: function() {
      return dispatch(fetchTrips());
    }
  };
};

export default connect(mapState, mapDispatch)(Sidebar);
