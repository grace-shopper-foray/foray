/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    let geoff;
    let omri;
    beforeEach('Seed Users', () => {
      const users = [
        {
          firstName: 'Geoff',
          lastName: 'hello',
          email: 'geoff@fullstack.com'
        },
        {
          firstName: 'omri',
          lastName: 'world',
          email: 'omri@fullstack.com'
        }
      ];
      return User.bulkCreate(users, { returning: true }).then(createdUser => {
        geoff = createdUser[0].id;
        omri = createdUser[1].id;
      });
    });

    //test get route
    describe('users', () => {
      it('GET /api/users', () => {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0].email).to.be.equal('geoff@fullstack.com');
          });
      });

      //test put route
      it('updates a user at PUT /{{usersId}}, sending a 201 response', () => {
        return request(app)
          .put(`/api/users/${geoff}`)
          .send({
            email: 'potus@hotmail.com'
          })
          .expect(201)
          .then(res => {
            return User.findById(geoff);
          })
          .then(user => {
            expect(user.email).to.be.equal('potus@hotmail.com');
          });
      });

      //test post route
      it('adds a new message on POST /, responding with 201 and created message', () => {
        return request(app)
          .post('/api/users')
          .send({
            firstName: 'chung',
            lastName: 'yi',
            email: 'senior@fullstack.com'
          })
          .expect(201)
          .then(res => {
            const createdUser = res.body;
            return User.findById(createdUser.id);
          })
          .then(foundUser => {
            expect(foundUser.firstName).to.be.equal('chung');
            expect(foundUser.lastName).to.be.equal('yi');
            expect(foundUser.email).to.be.equal('senior@fullstack.com');
          });
      });

      //delete user from db with user Id
      it('delete a user on DELETE / , responding with ', () => {
        return request(app)
          .delete(`/api/users/${geoff}`)
          .expect(204)
          .expect(() => {
            expect(Array(User.findAll())).to.have.length(1);
          });
      });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
