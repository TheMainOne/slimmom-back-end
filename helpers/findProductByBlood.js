const { Product } = require('../models/product');
// const { BadRequest } = require('http-errors');

const findProductByBlood = async ({ blood, select }) => {
  if (!blood) {
    return null;
    // throw new BadRequest('blood group not specified');
  }

  return await Product.find({
    [`groupBloodNotAllowed.${blood}`]: true,
  }).select(select);
};

module.exports = findProductByBlood;
