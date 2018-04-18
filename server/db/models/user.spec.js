/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

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

  }) // end describe('instanceMethods')
}) // end describe('User model')
