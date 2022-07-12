const { Product } = require("../models/product");

const findProductById = async (_id) => {
  const product = await Product.findOne({ _id });
  return product;
};

module.exports = findProductById;
