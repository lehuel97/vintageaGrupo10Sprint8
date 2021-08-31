'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('products', [{
        name: 'Pantalon Corto',
        description: 'Descripcion de cortesia' ,
        price: 7500,
        image: 'img-1627249544065.jpg',
        discount: 500 ,
        keywords: 'ninguna',
        userId: 5,
        brandId: 5,
        sizeId: 5,
        colorId: 5

      },
      {
        name: 'Pantalon largo',
        description: 'Descripcion de cortesia' ,
        price: 8500,
        image: 'img-1627249544065.jpg',
        discount: 700 ,
        keywords: 'ninguna',
        userId: 15,
        brandId: 15,
        sizeId: 15,
        colorId: 15

      },
      {
        name: 'Vestido de Gala',
        description: 'Descripcion de cortesia' ,
        price: 12000,
        image: 'img-1627249544065.jpg',
        discount: 1500 ,
        keywords: 'ninguna',
        userId: 25,
        brandId: 25,
        sizeId: 25,
        colorId: 25

      },
      {
        name: 'Zapatillas',
        description: 'Descripcion de cortesia' ,
        price: 12500,
        image: 'img-1627249544065.jpg',
        discount: 2500 ,
        keywords: 'ninguna',
        userId: 35,
        brandId: 35,
        sizeId: 35,
        colorId: 35

      },
    ], {});
 
  },

  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkDelete('People', null, {});
  
  }
};
