'use strict';



/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: 'Was not bad, was okay',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Had an amazing time',
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: 'was not very clean',
        stars: 2
      },
      {
        spotId: 3,
        userId: 2,
        review: 'was not what I expected',
        stars: 3
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Was amazing',
        stars: 5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
