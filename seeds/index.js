const sequelize = require('../config/connection');
const { Category, Product, Tag, ProductTag } = require('../models');

const categoryData = [ /* ... */ ];
const productData = [ /* ... */ ];
const tagData = [ /* ... */ ];
const productTagData = [ /* ... */ ];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Category.bulkCreate(categoryData);
  console.log('Categories seeded');

  await Product.bulkCreate(productData);
  console.log('Products seeded');

  await Tag.bulkCreate(tagData);
  console.log('Tags seeded');

  await ProductTag.bulkCreate(productTagData);
  console.log('Product tags seeded');

  process.exit(0);
};

seedDatabase();