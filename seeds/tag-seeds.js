const { Tag } = require('../models');

const tagData = [
  { tag_name: 'Music Festival' },
  { tag_name: 'Beach Vacation' },
  { tag_name: 'Outdoor Adventure' },
  { tag_name: 'Gourmet Food' },
  { tag_name: 'Luxury Spa' },
  { tag_name: 'Vintage Finds' },
  { tag_name: 'Urban Exploration' },
  { tag_name: 'Artistic Expression' },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;