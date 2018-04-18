/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  after("Synchronize and clear database", () => db.sync({ force: true }));

  describe("Sequelize models", function() {
    describe('instanceMethods', () => {
      let cody

      beforeEach(() => {
        return User.create({
          firstName: 'mary',
          lastName: 'kim',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      describe('correctPassword', () => {

        it('returns true if the password is correct', () => {
          expect(cody.correctPassword('bones')).to.be.equal(true)
        })

        it('returns false if the password is incorrect', () => {
          expect(cody.correctPassword('bonez')).to.be.equal(false)
        })
      }) // end describe('correctPassword')
    })

    describe('valitation' , () => {

      describe("definition", () => {
        // *Assertion translation*:
        // This assertion expects that the Message model will
        // put a `subject` column in the messages table.
        it("has expected schema  firstName definition", () => {
          expect(User.attributes.firstName).to.be.an("object");
        });

        it("has expected schema lastName definition", () => {
          expect(User.attributes.lastName).to.be.an("object");
        });

        it("has expected schema email definition", () => {
          expect(User.attributes.email).to.be.an("object");
        });
      })// end describe('definitation)

      describe("is Admin? ", () => {
        it('defaults isAdmin to false', () => {
          // .build creates an instance of a model
          // without saving the represented data to the database.
          const user = User.build();
          expect(user.isAdmin).to.be.equal(false);
        })
      })
    })

  })// end describe('instanceMethods')
}) // end describe('User model')
