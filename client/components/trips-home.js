import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchTrips} from "../store"

/**
 * COMPONENT
 */

class TripsHome extends React.Component {
  componentDidMount() {
    this.props.fetchTripsFromServer()
  }

  render() {
    return (
      <div>
      <h1>Ready for liftoff?</h1>
      <ul>
      {this.props.trips.map(trip => {
        return (
          <li key={trip.id}>
            <Link to={`/trips/${trip.id}`}>{trip.moonName}</Link>
          </li>
        );
      })}
      </ul>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    trips: state.trips
  }
}

const mapDispatch = function(dispatch) {
  return {
    fetchTripsFromServer: function() {
      return dispatch(fetchTrips())
    }
  }
}

export default connect(mapState, mapDispatch)(TripsHome)
