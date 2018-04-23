import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchTrips } from '../store'

/**
 * COMPONENT
 */

class Sidebar extends React.Component {

componentDidMount() {
  this.props.fetchTripsFromServer()
  }

  render() {
    return (
      <div class="sidenav">
        <a>Available trips:</a>
        {this.props.trips.map(trip => {
          return (
            <a href={`/trips/${trip.id}`}>{trip.moonName}</a>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
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

export default connect(mapState, mapDispatch)(Sidebar)