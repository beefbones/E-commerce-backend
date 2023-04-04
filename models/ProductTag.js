const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init({
  productId: DataTypes.INTEGER,
  tagId: DataTypes.INTEGER
}, {
  sequelize
});

module.exports = ProductTag;
