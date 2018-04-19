import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchTrips } from '../store'

/**
 * COMPONENT
 */

class TripsHome extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      moonName: ''
    }
    this.filterMoon = this.filterMoon.bind(this)
  }

  componentDidMount() {
    this.props.fetchTripsFromServer()
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1>Ready for liftoff?</h1>
          {this.renderMoonSearch()}
        </div>
        <ul className="row list-unstyled list-inline">
          {this.props.trips.filter(this.filterMoon).map(trip => {
            return (
              <div className="col-md-3" id="homePageCard">
                <div className="card text-center">
                  <li key={trip.id}>
                    <img
                      src={trip.imagePath}
                      height="240"
                      width="42"
                      className="card-img-top rounded mx-auto d-block"
                    />
                    <Link to={`/trips/${trip.id}`}>{trip.moonName}</Link>
                  </li>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }

  renderMoonSearch() {
    return (
      <div>
        <form className="form-inline">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={evt => this.setState({ moonName: evt.target.value })}
          />
        </form>
      </div>
    )
  }

  filterMoon(moon) {
    const moonMatch = new RegExp(this.state.moonName, 'i')

    //return true if moonName === moonName from this.props.trips
    return moonMatch.test(moon.moonName)
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

export default connect(mapState, mapDispatch)(TripsHome)
// {trip.imagePath}
