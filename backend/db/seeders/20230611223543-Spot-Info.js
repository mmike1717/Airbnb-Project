'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Fran',
        state: 'California',
        country: 'USA',
        lat: 60,
        lng: 90,
        name: 'Disney Land',
        description: 'Where dreams come true',
        price: 200

      },
      {
        ownerId: 1,
        address: '456 Florida Disney',
        city: 'Orlando',
        state: 'Florida',
        country: 'USA',
        lat: 77.7,
        lng: 99.2,
        name: 'Disney World',
        description: 'More dreams come true',
        price: 300

      },
      {
        ownerId: 1,
        address: '678 Disney East',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        lat: 99.3,
        lng: 33.2,
        name: 'Fake NY Disney',
        description: 'No dreams here its a made up place',
        price: 400

      },
      {
        ownerId: 2,
        address: '234 Universal Ave',
        city: 'Orlando',
        state: 'Florida',
        country: 'USA',
        lat: 40,
        lng: 70,
        name: 'Universal Studio',
        description: 'Its a place to bring your kids',
        price: 300

      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['123 Disney Lane','456 Florida Disney','678 Disney East','234 Universal Ave']}
    }, {})
  }
};
