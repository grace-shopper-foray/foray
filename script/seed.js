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
const { User, Trip, Order, TripOrder } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({
      firstName: 'geena',
      lastName: 'gao',
      email: 'cody@email.com',
      password: '123',
      isAdmin: false
    }),
    User.create({
      firstName: 'peter',
      lastName: 'michael',
      email: 'murphy@email.com',
      password: '123',
      isAdmin: false
    }),
    User.create({
      firstName: 'chung',
      lastName: 'lin',
      email: 'chung@email.com',
      password: '123',
      isAdmin: false
    }),
    User.create({
      firstName: 'phillip',
      lastName: 'leung',
      email: 'phil@email.com',
      password: '123',
      isAdmin: true
    })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`successfully seeded ${users.length} users`)

  //create Seed for Trip
  const trip = await Promise.all([
    Trip.create({
      planetName: 'Mars',
      moonName: 'Phobos',
      pricePerTrip: 2000,
      startDate: '2016-08-09 04:05:02',
      duration: 5,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Phobos_colour_2008.jpg/225px-Phobos_colour_2008.jpg'
    }),
    Trip.create({
      planetName: 'Earth',
      moonName: 'Moon',
      pricePerTrip: 1500,
      startDate: '2017-08-09 04:05:02',
      duration: 3,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/225px-FullMoon2010.jpg'
    }),
    Trip.create({
      planetName: 'Jupiter',
      moonName: 'Io',
      pricePerTrip: 1800,
      startDate: '2017-08-09 04:05:02',
      duration: 4,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/225px-Io_highest_resolution_true_color.jpg'
    }),
    Trip.create({
      planetName: 'Jupiter',
      moonName: 'Europa',
      pricePerTrip: 1500,
      startDate: '2017-08-09 04:05:02',
      duration: 4,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Europa-moon.jpg/225px-Europa-moon.jpg'
    }),
    Trip.create({
      planetName: 'Neptune',
      moonName: 'Triton',
      pricePerTrip: 1900,
      startDate: '2017-08-09 04:05:02',
      duration: 7,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Triton_moon_mosaic_Voyager_2_%28large%29.jpg/300px-Triton_moon_mosaic_Voyager_2_%28large%29.jpg'
    }),
    Trip.create({
      planetName: 'Uranus',
      moonName: 'Ariel',
      pricePerTrip: 900,
      startDate: '2017-08-09 04:05:02',
      duration: 6,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Ariel_%28moon%29.jpg/225px-Ariel_%28moon%29.jpg'
    }),
    Trip.create({
      planetName: 'Uranus',
      moonName: 'Miranda',
      pricePerTrip: 600,
      startDate: '2017-08-09 04:05:02',
      duration: 3,
      description: 'One Way Trip',
      imagePath:
        'http://www.seasky.org/solar-system/assets/images/miranda03_sk12.jpg'
    }),
    Trip.create({
      planetName: 'Uranus',
      moonName: 'Oberon',
      pricePerTrip: 800,
      startDate: '2017-08-09 04:05:02',
      duration: 3,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Voyager_2_picture_of_Oberon.jpg/225px-Voyager_2_picture_of_Oberon.jpg'
    }),
    Trip.create({
      planetName: 'Saturn',
      moonName: 'Dione',
      pricePerTrip: 1700,
      startDate: '2017-08-09 04:05:02',
      duration: 8,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dione_in_natural_light.jpg/225px-Dione_in_natural_light.jpg'
    })
  ])

  console.log(`successfully seeded ${trip.length} trips`)

  //create Seed for Order
  const order = await Promise.all([
    Order.create({ isCheckedOut: false, userId: 1 }),
    Order.create({ isCheckedOut: true, userId: 2 }),
    Order.create({ isCheckedOut: false, userId: 3 }),
    Order.create({ isCheckedOut: true, userId: 4 }),
    Order.create({ isCheckedOut: false, userId: 4 })
  ])

  console.log(`successully seeded ${order.length} orders`)

  //create Seed for tripOrder
  const tripOrder = await Promise.all([
    TripOrder.create({ numberOfGuests: 2, orderId: 1, tripId: 1 }),
    TripOrder.create({ numberOfGuests: 4, orderId: 2, tripId: 2 }),
    TripOrder.create({ numberOfGuests: 5, orderId: 3, tripId: 3 }),
    TripOrder.create({ numberOfGuests: 4, orderId: 4, tripId: 4 }),
    TripOrder.create({ numberOfGuests: 3, orderId: 5, tripId: 1 }),
    TripOrder.create({ numberOfGuests: 3, orderId: 5, tripId: 2 }),
    TripOrder.create({ numberOfGuests: 3, orderId: 5, tripId: 3 })
  ])

  console.log(`successfully seeded ${tripOrder.length} Trip Orders`)
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
