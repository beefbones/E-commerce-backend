const { Product } = require('../models');

const productData = [
  {
    product_name: 'Red Bicycle',
    price: 59.99,
    stock: 10,
    category_id: 1,
  },
  {
    product_name: 'Blue Mug',
    price: 12.50,
    stock: 25,
    category_id: 5,
  },
  {
    product_name: 'Yellow Umbrella',
    price: 17.99,
    stock: 5,
    category_id: 4,
  },
  {
    product_name: 'Green Notebook',
    price: 4.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Purple Backpack',
    price: 39.99,
    stock: 15,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;

