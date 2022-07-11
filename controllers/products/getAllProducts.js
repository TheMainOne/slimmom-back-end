const { Product } = require('../../models/product');

const getAllProducts = async (req, res) => {
  //   const { title } = req.query;
  const products = await Product.find({});
  console.log(products);
  res.json({
    status: 'success',
    code: 200,
    data: products,
  });
};

module.exports = getAllProducts;
