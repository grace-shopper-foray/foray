const {expect} = require('chai')
const db = require('../index')
const Trip = db.model('trip')

describe('Trip Model', ()=> {
  beforeEach(() => {
    return db.sync({force: true})
  })

})
