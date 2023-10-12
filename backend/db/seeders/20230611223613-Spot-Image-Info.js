'use strict';


/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45178572/original/7fae161f-1d04-4c9b-acea-8bf3593fc004.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/7319fdbf-0f3a-443b-9e89-e8736a433b9a.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45178572/original/eeb9d29e-6c86-414e-87f9-1e55c28496c2.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/c4bbad74-51ca-41df-94c6-93b016ba7a10.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45178572/original/ff64660d-bcc0-45f6-9537-15fbb01c84c0.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752812878873332322/original/f79b0ce2-cd0f-44a2-8037-b42c82c754a1.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752812878873332322/original/1b37a3ce-17d5-406c-8c4e-6bf7c3a63ca5.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752812878873332322/original/1d5d2e08-0cb0-4df1-875b-21d29bc17793.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752812878873332322/original/5cf8ba1e-2910-42d0-b850-d40d27ffc086.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-784124479509853993/original/7f39a862-3e52-48bf-84e1-ba0a0f36a8e3.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-784124479509853993/original/3e8af956-e109-46c4-8551-baf11affb9a4.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-784124479509853993/original/69b2eb4a-5cf8-4ab4-829e-01c4fbf2e055.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-784124479509853993/original/c538d291-af29-46c0-b1b4-c19f5a8edf26.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-784124479509853993/original/5f999db7-a7c5-4a02-aeb2-d2d354e2bca9.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.captivatinghouses.com/wp-content/uploads/2022/03/IMG_1224.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://static01.nyt.com/images/2021/01/31/realestate/28OTM-NYC-slide-HLHO/28OTM-NYC-slide-HLHO-articleLarge.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://photos.zillowstatic.com/fp/24fcd64924e745cbd3b1d2232067a0d7-cc_ft_1536.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.ytimg.com/vi/xCdhQFgQc5o/maxresdefault.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://global-uploads.webflow.com/5e41b446a7ff3206df92bc7a/626065a10682101e2f00533d_IND_255_Sherman_Street_Brooklyn_NY_Studio_-_5_Photos_5_20211206-105114-min.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/05928ce6-01ff-4829-bcde-9670e2a03c22.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/bd30820b-5ce2-40f7-bd81-9b6cfa32be05.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/a40da10c-0bd3-4f65-94da-074567258e99.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/85de7592-1666-4416-909f-ba0d39908552.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/4e904d59-ddd3-41e4-93c4-6779db038490.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-891191453129788615/original/ed80dcbd-5bcf-4e3c-bf98-60fbd7ceb325.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-891191453129788615/original/0c971afe-4260-406d-b6f3-4b66b2a787c8.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-891191453129788615/original/32b1b922-f38f-464b-99a6-c8d23b491582.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-891191453129788615/original/cc29926c-6ad1-4ad3-b18a-bd86e2edd080.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-891191453129788615/original/6633c7c9-838f-4354-883d-e9027d0f9ee3.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613828832469967166/original/716a299f-9640-4aaa-9588-100e1dc519c3.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613828832469967166/original/86679113-d361-4c36-b9f3-93f237d1727a.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613828832469967166/original/2dc8a780-fb8a-4f5a-977d-dce6632189d3.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613828832469967166/original/42ffbda1-24ed-41ea-a9f1-59acccd826c4.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-613828832469967166/original/fb7d02fd-0fdc-4b59-a65b-1732e8ebea55.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52937532/original/06c11070-778e-4f1f-b435-4ae6b3fd8782.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52937532/original/c9e216a7-b452-4a26-9e8a-3d343903a589.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52937532/original/8049cd50-832c-456a-916c-d00294cbf305.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52937532/original/c78ce399-3178-429b-8b5d-58da90cc55d6.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52937532/original/8e0c4521-6252-428f-9bc7-5191ac51f5b0.jpeg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53261147/original/c82ad18e-c7bd-49a7-9a42-8dac671554ed.jpeg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53261147/original/6adf5013-27e0-4e35-b101-07f1d9a1bb8b.jpeg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53261147/original/51fcbc43-b2ac-4605-90fc-4c085e8791fb.jpeg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53261147/original/1245e5c2-893b-4f1e-b96e-f0a39b011d54.jpeg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53261147/original/61fb6cc8-a29c-4f54-8f82-54f2796ae3ee.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-696230087945688939/original/92737452-ad3f-46af-88e9-d02730eaafe3.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-696230087945688939/original/2abc0155-e85b-442a-91ce-749650f819a0.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-696230087945688939/original/8dc24f64-941a-4d0f-bb3b-7753d97bdde8.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-696230087945688939/original/5ba1d7da-730a-4aef-8885-5afb7151cf88.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-696230087945688939/original/2aa3d79f-6340-47a6-a9d0-2aca81363b38.jpeg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/777e592d-a117-4211-949a-5f599da58499.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/ac396f80-f31a-4a96-b1e7-48d60ca4a01e.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/073b251d-9121-48f5-8522-5ddeeb4d0fd7.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/586065f9-94de-4509-b358-414a22aa1bee.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/51303389-edc4-43e3-88ff-88d888c38a2d.jpg',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4] }
    }, {});
  }
};
