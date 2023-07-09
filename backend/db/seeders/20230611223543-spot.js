'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Stark Street',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        lat: 60,
        lng: 90,
        name: 'NY Mansion',
        description: 'Friends and family will be wowed when you gather at this spacious and ultra comfortable home. Theres a beautiful new gunite pool, large patio, elevated screened in porch, and spacious deck for barbecuing and dining. ',
        price: 290.50

      },
      {
        ownerId: 1,
        address: '456 Brooklyn Lane',
        city: 'Albany',
        state: 'New York',
        country: 'USA',
        lat: 77.7,
        lng: 99.2,
        name: 'City Mansion',
        description: 'Our vacation rental home is the perfect destination for families or groups of friends looking for a comfortable and luxurious getaway.',
        price: 315.99

      },
      {
        ownerId: 1,
        address: '678 East New York',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        lat: 99.3,
        lng: 33.2,
        name: 'NY Party House',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 450.50

      },
      {
        ownerId: 2,
        address: '234 Universal Ave',
        city: 'Brooklyn',
        state: 'New York',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'Luxurious Studio',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 345.50

      },
      {
        ownerId: 2,
        address: '234 Peter Ave',
        city: 'Brooklyn',
        state: 'New York',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'TownHouse',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 260.00

      },
      {
        ownerId: 3,
        address: '234 Marvel Ave',
        city: 'Hells Kitchen',
        state: 'New York',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'Studio',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 250.50

      },
      {
        ownerId: 3,
        address: '9870 Law Ave',
        city: 'Manhatten',
        state: 'New York',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'Luxury Home',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 330.99

      },
      {
        ownerId: 4,
        address: '7654 Scarlet Ave',
        city: 'Orlando',
        state: 'Florida',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'Party House',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 290.89

      },
      {
        ownerId: 4,
        address: '8930 Florida Ave',
        city: 'Fort Lauderdale',
        state: 'Florida',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'Beach House',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 250.99

      },
      {
        ownerId: 5,
        address: '8930 Casino Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'Party House',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 390.45

      },
      {
        ownerId: 5,
        address: '2456 Bellagio Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'Mansion',
        description: 'A quiet neighborhood that caters to families, business people and traveling professionals or anything else seeking a private place to stay at the end of a busy day.',
        price: 450.69

      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Disney Lane','456 Florida Disney','678 Disney East','234 Universal Ave']}
    }, {})
  }
};
