'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert('colors', [{
        name: "Lavanda"
      },
      {
        name: "Blanco"
      },
      {
        name: "Negro"
      },
      {
        name: "Amarillo"
      },
      {
        name: "Marron"
      },
      {
        name: "Chocolate"
      },
      {
        name: "Verde"
      },
      {
        name: "Rosa"
      },
      {
        name: "Azul"
      },
      {
        name: "Naranja"
      },
      {
        name: "Violeta"
      }

    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('People', null, {});
    
  }
};
