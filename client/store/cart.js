import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER';
const ADD_TRIP = 'ADD_TRIP';
const DELETE_TRIP = 'DELETE_TRIP';
const UPDATE_TRIP = 'UPDATE_TRIP';
const CHECKOUT_ORDER = 'CHECKOUT_TRIP';

/**
 * INITIAL STATE
 */
// const initialState = {
//   // id: 1,
//   // isCheckedOut: false,
//   // createdAt: '2018-04-18T20:39:32.316Z',
//   // updatedAt: '2018-04-18T20:39:32.316Z',
//   // userId: 1,
//   // trips: [
//   //   {
//   //     id: 1,
//   //     moonName: 'default',
//   //     planetName: 'default',
//   //     pricePerTrip: 'default',
//   //     startDate: '2016-08-09T08:05:02.000Z',
//   //     duration: 0,
//   //     description: 'One Way Trip',
//   //     imagePath:
//   //       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Phobos_colour_2008.jpg/225px-Phobos_colour_2008.jpg',
//   //     createdAt: '2018-04-18T20:39:32.296Z',
//   //     updatedAt: '2018-04-18T20:39:32.296Z',
//   //     tripOrder: {
//   //       numberOfGuests: 0,
//   //       createdAt: '2018-04-18T20:39:32.325Z',
//   //       updatedAt: '2018-04-18T20:39:32.325Z',
//   //       tripId: 1,
//   //       orderId: 1
//   //     }
//   //   }
//   // ],
//   // user: {
//   //   id: 1,
//   //   firstName: 'geena',
//   //   lastName: 'gao',
//   //   email: 'cody@email.com',
//   //   phoneNumber: null,
//   //   googleId: null,
//   //   facebookId: null,
//   //   isAdmin: null,
//   //   stripeTokenId: null,
//   //   createdAt: '2018-04-18T20:39:32.266Z',
//   //   updatedAt: '2018-04-18T20:39:32.266Z'
//   }
// }

const initialState = { trips: [], user: {} };

/**
 * ACTION CREATORS
 */
const getOrder = order => ({ type: GET_ORDER, order });
const addTrip = trip => ({ type: ADD_TRIP, trip });

/**
 * THUNK CREATORS
 */
export const fetchOrder = userId => dispatch => {
  return axios
    .get(`/api/users/${userId}/orders?cart=active`)
    .then(res => res.data)
    .then(order => {
      return dispatch(getOrder(order));
    })
    .catch(err => console.error(err));
};

//add trip to cart order
export const postOrderThunk = (tripStateInfo, userId) => dispatch => {
  const { tripId, numberOfGuests } = tripStateInfo;
  return axios
    .post(`/api/users/${userId}/orders`, { tripId, numberOfGuests })
    .then(res => res.data)
    .then(trip => {
      console.log(trip, 'HELPPPPPP');
      return dispatch(addTrip(trip));
    })
    .catch(err => console.error(err));
};
/**
 * TRIPS SUB-REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return Object.assign({}, state, action.order);

    //case postOrder
    case ADD_TRIP:
      return Object.assign({}, state, { trips: [...state.trips, action.trip] });
    default:
      return state;
  }
}
