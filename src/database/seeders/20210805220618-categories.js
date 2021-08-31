'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('categories', [{
        name: 'Buzo',
        
      },
      {
        name: 'Remera',
        
      },
      {
        name: 'Pantalon',
        
      },
      {
        name: 'Cartera',
        
      },
      {
        name: 'Zapatilla',
        
      },
      {
        name: 'CalzaBuzo',
        
      },
      {
        name: 'Top',
        
      },
      {
        name: 'Vestido',
        
      },
      {
        name: 'Traje de baño',
        
      },
      {
        name: 'Medias',
        
      },
      {
        name: 'Campera',
        
      },
      {
        name: 'Pijama',
        
      },
      {
        name: 'Traje',
        
      },
      {
        name: 'Conjunto',
        
      }

    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('People', null, {});
    
  }
};

