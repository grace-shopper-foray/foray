/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User} = require('../server/db/models')
const {Trip} = require('../server/db/models')
const {Order} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({firstName: 'geena', lastName: 'gao' , email: 'cody@email.com', password: '123'}),
    User.create({firstName: 'peter' , lastName: 'michael',email: 'murphy@email.com', password: '123'})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded user successfully`)

  //create Seed for Trip
  const trip = await Promise.all([
    Trip.create({planetName: 'Mars', moonName: 'Phobos' , pricePerTrip: 200000 , startDate: '2016-08-09 04:05:02', duration: 24, description: 'One Way Trip', imagePath: 'TBD'}),
    Trip.create({planetName: 'Earth', moonName: 'Moon' , pricePerTrip: 1 , startDate: '2017-08-09 04:05:02', duration: 1, description: 'One Way Trip', imagePath: 'TBD'})
  ])

  console.log(`seeded ${trip.length} trip`)
  console.log(`seeded trip successfully`)

  //create Seed for Order
// const order = await Promise.all([
//   Order.create({})
// ])

  // console.log(`seeded ${order.length} order`)
  // console.log(`seeded order successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
