'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '1234556'
      },
      {
         firstName: 'Fernando',
         lastName: 'Marilla',
         email: 'fernandomarilla@gmail.com',
         password: '1234556'
       },
       {
         firstName: 'Roberto',
         lastName: 'Sanchez',
         email: 'robertsanchez@gmail.com',
         password: '1234556'
       },
       {
         firstName: 'Juan',
         lastName: 'Diaz',
         email: 'juandiaz@gmail.com',
         password: '1234556'
       },
       {
         firstName: 'Alan',
         lastName: 'Zaker',
         email: 'alanzak@gmail.com',
         password: '1234556'
       },
       {
         firstName: 'Alberto',
         lastName: 'Don',
         email: 'donalberto@gmail.com',
         password: '1234556'
       },
       {
         firstName: 'Fabricio',
         lastName: 'Juios',
         email: 'fabriju@gmail.com',
         password: '1234556'
       },
       {
         firstName: 'Martin',
         lastName: 'Papalete',
         email: 'papalete.martin@gmail.com',
         password: '1234556'
       }
   ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('People', null, {});
     
  }
};
