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
        <div className="text-center">
          <img src="http://freedesignfile.com/upload/2017/08/rocket-icon-vector.png" height="100" width="100" id="rocket-logo"/>
          <h1>Ready for liftoff?</h1>
        </div>
        <ul className="row list-unstyled list-inline">
        {this.props.trips.map(trip => {
          return (
            <div className="col-md-3" id="homePageCard">
              <div className="card text-center">
                <li key={trip.id}>
                  <img src={trip.imagePath} height="240" width="42" className="card-img-top rounded mx-auto d-block"/>
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
