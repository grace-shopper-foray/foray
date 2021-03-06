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
const db = require('../server/db');
const { User, Trip, Order, TripOrder } = require('../server/db/models');
const bluebird = require('bluebird');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({
      firstName: 'geena',
      lastName: 'gao',
      email: 'cody@email.com',
      password: '123'
    })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);

  //create Seed for Trip
  const trip = await Promise.all([
    Trip.create({
      planetName: 'Mars',
      moonName: 'Phobos',
      price: 2000,
      startDate: '2016-08-09 04:05:02',
      numberOfNights: 5,
      description: 'One Way Trip',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Phobos_colour_2008.jpg/225px-Phobos_colour_2008.jpg'
    })
  ]);

  console.log(`seeded ${trip.length} trip`);

  //create Seed for Order
  const order = await Promise.all([
    Order.create({ isCheckedOut: false, userId: 1 })
  ]);

  console.log(`seeded ${order.length} order`);

  //create Seed for tripOrder
  const tripOrder = await Promise.all([
    TripOrder.create({ numberOfGuests: 2, orderId: 1, tripId: 1 })
  ]);

  console.log(`seeded ${tripOrder.length} trip Order*`);
}

module.exports = seed;
