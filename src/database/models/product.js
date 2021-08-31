'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongsTo
      Product.belongsTo(models.Brand, {
        as: 'brands',
        foreignKey: 'brandId',
      });
      // belongsTo
      Product.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'userId',
      });

      // belongsToMany
      Product.belongsTo(models.Color, {
        as: 'colors',
        foreignKey: 'colorId',
      });
      // belongsToMany
      Product.belongsTo(models.Category, {
        as: 'categories',
        foreignKey: 'categoryId',

      });
      // belongsToMany
      Product.belongsTo(models.Size,{
        as: 'sizes',
        foreignKey: 'sizeId'
      });
    
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    keywords: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER,
    discount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};