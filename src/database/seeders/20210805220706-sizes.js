'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('sizes', [{
        name: 'XS',
      },
      {
        name: 'S',
      },
      {
        name: 'M',
      },
      {
        name: 'L',
      },
      {
        name: 'XL',
      },
      {
        name: 'XXL',
      },
      {
        name: 'XXXL',
      },
      {
        name: '30',
      },
      {
        name: '30.5',
      },
      {
        name: '31',
      },
      {
        name: '31.5',
      },
      {
        name: '32',
      },
      {
        name: '32.5',
      },
      {
        name: '33',
      },
      {
        name: '33.5',
      },
      {
        name: '34',
      },
      {
        name: '34.5',
      },
      {
        name: '35',
      },
      {
        name: '35.5',
      },
      {
        name: '36',
      },
      {
        name: '36.5',
      },
      {
        name: '37',
      },
      {
        name: '37.5',
      },
      {
        name: '38',
      },
      {
        name: '38.5',
      },
      {
        name: '39',
      },
      {
        name: '39.5',
      },
      {
        name: '40',
      },
      {
        name: '40.5',
      },
      {
        name: '41',
      },
      {
        name: '41.5',
      },
      {
        name: '42',
      },
      {
        name: '42.5',
      },
      {
        name: '43',
      },
      {
        name: '43.5',
      },
      {
        name: '44',
      }


    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('People', null, {});
    
  }
};
