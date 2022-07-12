const { Product } = require('../../models/product');

const getAllProducts = async ({ query: { title, limit = 10 } }, res) => {
  const searchQuerry = new RegExp(title, 'i');

  const products = await Product.find()
    .or(
      { 'title.ru': { $regex: searchQuerry } },
      { 'title.ua': { $regex: searchQuerry } }
    )
    .limit(limit);

  if (products.length === 0) {
    const error = new Error(`${title} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: 'success',
    code: 200,
    data: products,
  });
};

module.exports = getAllProducts;
