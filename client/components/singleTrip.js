import React from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import {fetchTrip} from "../store"

/**
 * COMPONENT
 */

class SingleTrip extends React.Component {
  constructor() {
    super();
    this.state = {
      tripId: 0,
      numberOfGuests: 1
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      numberOfGuests: Number(event.target.value)
    })
  }
  componentDidMount() {
    const tripId = Number(this.props.match.params.tripId);
    this.setState({
      tripId
    })
    this.props.fetchTripFromServer(tripId);
  }

  render() {
    let {handleSubmit} = this.props;
    return (
      <div>
        <h1>{this.props.trip.moonName}</h1>
        <h2>{this.props.trip.planetName}</h2>
        <img src={this.props.trip.imagePath}/>
        <p>${this.props.trip.pricePerTrip}</p>
        <p>Start Date: {this.props.trip.startDate}</p>
        <p>Duration: {this.props.trip.duration} Nights</p>
        <p>Description: {this.props.trip.description}</p>
        <form onSubmit={event => {
          event.preventDefault()
          handleSubmit(this.state)}}>
          <label>Number of Guests:
            <select onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </label>
          <input type="submit" value="Add Trip to Cart" />
        </form>
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
    },
    handleSubmit: function(tripAdded) {
      console.log(tripAdded);
      dispatch(tripAddedThunk(tripAdded))
      this.setState({
        tripId: 0,
        numberOfGuests: 1
      })
    }
  }
}

export default connect(mapState, mapDispatch)(SingleTrip)
