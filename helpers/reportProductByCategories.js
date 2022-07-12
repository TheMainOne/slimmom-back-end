const { Product } = require('../models/product');

const reportProductByCategories = async () => {
  const products = await Product.find();

  return products.reduce((obj, { categories }) => {
    if (obj[categories]) obj[categories] += 1;
    if (!obj[categories]) obj[categories] = 1;

    return obj;
  }, {});
};

module.exports = reportProductByCategories;
