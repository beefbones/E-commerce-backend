const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Boots',
  },
  {
    category_name: 'Clothes',
  },
  {
    category_name: 'Guns',
  },
  {
    category_name: 'Speakers',
  },
  {
    category_name: 'Dolphins',
  },
];

module.exports = Category.bulkCreate(categoryData);