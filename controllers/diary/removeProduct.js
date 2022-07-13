const { NotFound } = require("http-errors");
const {
  diary: { findProductByDateAndUser },
} = require("../../services");
const { updateDateInfo } = require("../../services/diary");

const removeProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId, date } = req.query;

  const selectedDate = await findProductByDateAndUser(date, userId);
  const { _id: dateId, consumedProducts, total: summary } = selectedDate;
  const product = consumedProducts.find((product) => product._id === productId);

  if (!selectedDate || !product) {
    throw new NotFound(`Not found`);
  }

  const total = summary - product.kcal;
  await updateDateInfo(dateId, productId, total);

  res.json({
    message: `Product was deleted`,
    status: "success",
    code: 200,
    data: product,
  });
};

module.exports = removeProduct;
