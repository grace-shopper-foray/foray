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
      <div className="container">
        <h1 className="text-center">Ready for liftoff?</h1>
        <ul className="row">
        {this.props.trips.map(trip => {
          return (
            <div className="col-md-3">
              <div className="card text-center">
                <li key={trip.id}>
                  <img src={trip.imagePath} height="200" width="42" className="card-img-top rounded mx-auto d-block"/>
                  <Link to={`/trips/${trip.id}`}>{trip.moonName}</Link>
                </li>
              </div>
            </div>
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
// {trip.imagePath}
