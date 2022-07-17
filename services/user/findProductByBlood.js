const { Product } = require('../../models/product');

const findProductByBlood = async ({ blood, select }) => {
  if (!blood) {
    return null;
  }

  return await Product.find({
    [`groupBloodNotAllowed.${blood}`]: true,
  }).select(select);
};

module.exports = findProductByBlood;
