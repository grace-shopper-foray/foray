import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {fetchTrip} from "../store"

/**
 * COMPONENT
 */

class SingleTrip extends React.Component {
  componentDidMount() {
    const tripId = Number(this.props.match.params.tripId);
    this.props.fetchTrip(tripId);
  }

  render() {
    console.log(this.props.trip)
    return (
      <div>
        <h1>{this.props.trip.moonName}</h1>
        <h2>{this.props.trip.planetName}</h2>
        <img src={this.props.trip.imagePath}/>
        <p>{this.props.trip.pricePerTrip}</p>
        <p>{this.props.trip.startDate}</p>
        <p>{this.props.trip.duration}</p>
        <p>{this.props.trip.description}</p>
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
    fetchTripfromServer: function() {
      return dispatch(fetchTrip())
    }
  }
}

export default connect(mapState, mapDispatch)(SingleTrip)
