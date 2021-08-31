'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
      static associate(models) {

      Image.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: "products"
      })
    }
  };
  Image.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};