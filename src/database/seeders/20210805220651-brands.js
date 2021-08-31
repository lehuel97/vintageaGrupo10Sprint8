'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('brands', [{
        name: 'Nike',
      },
      {
        name: 'Gucci',
      },
      {
        name: 'Adidas',
      },
      {
        name: 'Louis Vuitton',
      },
      {
        name: 'Cartier',
      },
      {
        name: 'Zara',
      },
      {
        name: 'H&M',
      },
      {
        name: 'Chanel',
      }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('People', null, {});
    
  }
};
