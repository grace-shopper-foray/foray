import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {fetchTrips} from "../store"

/**
 * COMPONENT
 */

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchTripsFromServer()
  }

  render() {
    return (
      <div>
      <h1>Foray</h1>
      <ul>
      {this.props.trips.map(trips => {
        return (
          <li key={trip.id}>
            <Link to={`/trips/${trip.id}`}>{trip.name}</Link>
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

export default connect(mapState, mapDispatch)(Home)
