const {
  diary: { findProductByDateAndUser, findProductById },
} = require("../../services");
const {
  diary: { createNewProduct },
} = require("../../helpers");

const addProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const { date } = req.query;
  const { id, weight } = req.body;

  const product = await findProductById(id);
  const { _id: productId, title, calories } = product;

  const newProduct = createNewProduct(productId, title, weight, calories);
  const checkDate = await findProductByDateAndUser(date, userId);

  if (checkDate) {
    const checkedProduct = checkDate.consumedProducts.find(
      (product) => product._id === id
    );

    if (!checkedProduct) {
      checkDate.consumedProducts.push(newProduct);
      checkDate.total += newProduct.kcal;
    } else {
      checkedProduct.weight += weight;
      checkedProduct.kcal += Math.round(calories * (weight / 100));
      checkDate.total += newProduct.kcal;
    }

    await checkDate.save();
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      ...newProduct,
    },
  });
};

module.exports = addProduct;
