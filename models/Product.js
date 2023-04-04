const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
    validate: { isNumeric: true }
  },
  categoryId: DataTypes.INTEGER
}, {
  sequelize
});

module.exports = Product;
