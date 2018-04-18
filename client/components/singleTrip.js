import React from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {fetchTrip} from "../store"

/**
 * COMPONENT
 */

class SingleTrip extends React.Component {
  componentDidMount() {
    const tripId = Number(this.props.match.params.tripId);
    this.props.fetchTripFromServer(tripId);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>{this.props.trip.moonName}</h1>
        <h2>{this.props.trip.planetName}</h2>
        <img src={this.props.trip.imagePath}/>
        <p>${this.props.trip.pricePerTrip}</p>
        <p>Start Date: {this.props.trip.startDate}</p>
        <p>Duration: {this.props.trip.duration} Nights</p>
        <p>Description: {this.props.trip.description}</p>
        <div>
          <p>Number of Guests:</p>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
        </div>
        <button>Add Trip to Cart</button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    trip: state.trip
  }
}

const mapDispatch = function(dispatch) {
  return {
    fetchTripFromServer: function(tripId) {
      return dispatch(fetchTrip(tripId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleTrip)
