import React from 'react';
import { connect } from 'react-redux';

import { fetchTripThunk, postOrderThunk } from '../store';

/**
 * COMPONENT
 */

class SingleTrip extends React.Component {
  constructor() {
    super();
    this.state = {
      numberOfGuests: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      numberOfGuests: Number(event.target.value)
    });
  }
  componentDidMount() {
    const tripId = Number(this.props.match.params.tripId);
    this.props.fetchTripFromServer(tripId);
  }

  render() {
    let { handleSubmit, user } = this.props;
    return (
      <div className="main">
        <h1>{this.props.trip.moonName}</h1>
        <h2>{this.props.trip.planetName}</h2>
        <img src={this.props.trip.imagePath} />
        <p>${this.props.trip.price}</p>
        <p>Start Date: {this.props.trip.startDate}</p>
        <p>Duration: {this.props.trip.numberOfNights} Nights</p>
        <p>Description: {this.props.trip.description}</p>
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSubmit(
              this.props.trip.id,
              this.state.numberOfGuests,
              user.id
            );
          }}
        >
          <label>
            Number of Guests:
            <select onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>
          <input type="submit" value="Add Trip to Cart" />
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    trip: state.trip,
    user: state.user
  };
};

const mapDispatch = function(dispatch) {
  return {
    fetchTripFromServer: function(tripId) {
      return dispatch(fetchTripThunk(tripId));
    },
    handleSubmit: function(tripId, numberOfGuests, userId) {
      const tripAdded = { tripId, numberOfGuests };
      dispatch(postOrderThunk(tripAdded, userId));
    }
  };
};

export default connect(mapState, mapDispatch)(SingleTrip);
