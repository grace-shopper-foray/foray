/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Trip = db.model('trip');

describe('Trip Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/trips/', () => {
    let hydra;
    let cupid;
    beforeEach('Seed Trips', () => {
      const trips = [
        {
          moonName: 'Hydra',
          planetName: 'Pluto',
          price: 2000,
          startDate: '2016-08-09 04:05:02-04',
          numberOfNights: 5,
          description: 'Vacation trip for the moon Hydra!!!',
          imagePath:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Hydra_Enhanced_Color.jpg/196px-Hydra_Enhanced_Color.jpg',
          orderId: null
        },
        {
          moonName: 'Cupid',
          planetName: 'Uranus',
          price: 1000,
          startDate: '2016-08-09 04:05:02-04',
          numberOfNights: 4,
          description: 'Vacation trip for the moon Uranus!!!',
          imagePath:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Cupid_moon.png/225px-Cupid_moon.png',
          orderId: null
        }
      ];
      return Trip.bulkCreate(trips, { returning: true }).then(createdTrip => {
        hydra = createdTrip[0].id;
        cupid = createdTrip[1].id;
      });
    });
    describe('trips', () => {
      //get all trips
      it('GET /api/trips', () => {
        return request(app)
          .get('/api/trips')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0].planetName).to.be.equal('Pluto');
            expect(res.body[1].description).to.be.equal(
              'Vacation trip for the moon Uranus!!!'
            );
          });
      });
    });

    //get single trip
    it('GET /api/trips/:id', () => {
      return request(app)
        .get('/api/trips/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.planetName).to.be.equal('Uranus');
          expect(res.body.numberOfNights).to.be.equal(4);
        });
    });
  }); //end describe('api/trips')
}); //end trip routes
