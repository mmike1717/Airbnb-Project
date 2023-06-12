'use strict';


/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: '2023-08-15',
        endDate: '2023-08-25'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2023-06-14',
        endDate: '2023-06-24'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-07-16',
        endDate: '2023-07-26'
      },
      {
        spotId:4,
        userId: 1,
        startDate: '2023-12-10',
        endDate: '2023-12-20'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1,2,3,4] }
    }, {});
  }
};
