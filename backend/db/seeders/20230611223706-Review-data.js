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
        userId: 2,
        review: 'Was not bad, was okay',
        stars: 2.5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Great place to stay, had a wonderful time.',
        stars: 3.8
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Great place to stay, had a wonderful time.',
        stars: 3.0
      },
      {
        spotId: 2,
        userId: 2,
        review: 'The home is spacious, clean, and has plenty of amenities.',
        stars: 4.0
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Had an amazing time',
        stars: 3.5
      },
      {
        spotId: 2,
        userId: 5,
        review: ' The house is immaculate, and is beautiful.',
        stars: 4.3
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Needs some TLC',
        stars: 2.5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Was not too bad, needs some work',
        stars: 3.5
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Couldnt ask of a better place',
        stars: 3.9
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Great place and exactly what we were looking for.',
        stars: 3.2
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Highly recommended.',
        stars: 3.0
      },
      {
        spotId: 5,
        userId: 4,
        review: 'Lots of space and the location was terrific.',
        stars: 4.3
      },
      {
        spotId: 5,
        userId: 1,
        review: 'was not what I expected',
        stars: 3.0
      },
      {
        spotId: 6,
        userId: 2,
        review: 'Great place for a big group, definitely we will come back',
        stars: 4.0
      },
      {
        spotId: 6,
        userId: 1,
        review: 'Location was perfect!',
        stars: 4.5
      },
      {
        spotId: 6,
        userId: 4,
        review: 'Was not bad, would not stay here again',
        stars: 2.5
      },
      {
        spotId: 7,
        userId: 5,
        review: 'Would recommend to stay here',
        stars: 4.5
      },
      {
        spotId: 7,
        userId: 2,
        review: 'Needs some TLC but still enjoyed staying here',
        stars: 3.0
      },
      {
        spotId: 8,
        userId: 1,
        review: 'Needs some TLC but still enjoyed staying here',
        stars: 3.0
      },
      {
        spotId: 8,
        userId: 2,
        review: 'This house was great for our family trip!',
        stars: 3.5
      },{
        spotId: 8,
        userId: 3,
        review: 'House is amazing the pictures dont compare to how beautiful the home is.',
        stars: 4.0
      },
      {
        spotId: 8,
        userId: 5,
        review: 'Truly an awesome and beautiful place.',
        stars: 4.5
      },
      {
        spotId: 9,
        userId: 5,
        review: 'Incredible house and stay! Would do the same all over again.',
        stars: 4.5
      },
      {
        spotId: 10,
        userId: 1,
        review: 'Has to be the coolest place in Vegas.',
        stars: 4.0
      },
      {
        spotId: 10,
        userId: 5,
        review: 'We really enjoyed our stay',
        stars: 4.5
      },
      {
        spotId: 10,
        userId: 5,
        review: 'Was a good time',
        stars: 3.5
      },
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
