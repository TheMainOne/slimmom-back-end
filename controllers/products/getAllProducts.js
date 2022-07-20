const { Product } = require('../../models/product');

const getAllProducts = async ({ query: { title, limit = 10 } }, res) => {
  const titleFromUrl = decodeURI(title).trim();

  const products = await Product.find({
    $or: [
      { 'title.ua': { $regex: titleFromUrl, $options: 'i' } },
      { 'title.en': { $regex: titleFromUrl, $options: 'i' } },
    ],
  }).limit(limit);

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
