/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {TripsHome} from './trips-home'

const adapter = new Adapter()
enzyme.configure({adapter})

// describe('Trips Home Component', () => {
//   let tripsHome
//   let moons = [{id:1, moonName:'Charon', planetName:'Pluto', pricePerTrip:5000000.00, startDate:'2016-08-09 04:05:02-04', duration: 5, description:'The best moon ever!', imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Phobos_colour_2008.jpg/225px-Phobos_colour_2008.jpg'},{id:2, moonName:'Proteus', planetName:'Nereid', pricePerTrip:100.00, startDate:'2016-05-02 04:05:02-04', duration: 3, description:'This moon is ok I guess', imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Voyager_2_picture_of_Oberon.jpg/225px-Voyager_2_picture_of_Oberon.jpg'}]

//   beforeEach(() => {
//     tripsHome = shallow(<TripsHome trips={moons} />)
//   })

//   it('renders each moon on the homepage with a link to the single trip view', () => {
//     expect(tripsHome.find('Link').to.equal('trips/1'))
//   })
// })
