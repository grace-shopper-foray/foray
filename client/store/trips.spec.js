/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchTrips} from './trips'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {trips: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchTrips', () => {
    it('eventually dispatches the GET TRIPS action', () => {
      const fakeTrips = [{id:1, moonName:'Charon', planetName:'Pluto', pricePerTrip:5000000.00, startDate:'2016-08-09 04:05:02-04', duration: 5, description:'The best moon ever!', imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Phobos_colour_2008.jpg/225px-Phobos_colour_2008.jpg'},{id:2, moonName:'Proteus', planetName:'Nereid', pricePerTrip:100.00, startDate:'2016-05-02 04:05:02-04', duration: 3, description:'This moon is ok I guess', imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Voyager_2_picture_of_Oberon.jpg/225px-Voyager_2_picture_of_Oberon.jpg'}]

      mockAxios.onGet('/api/trips').replyOnce(200)
      return store.dispatch(fetchTrips())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_TRIPS')
          // expect(actions[0].trips).to.be.deep.equal(fakeTrips)
        })
    })
  })


})
