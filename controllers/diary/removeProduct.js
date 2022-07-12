const dayjs = require("dayjs");
const { NotFound } = require("http-errors");
const { Diary } = require("../../models");

const removeProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const { _id: productId, date } = req.query;

  const formatedDate = dayjs(date).format("DD-MM-YYYY");
  const selectedDate = await Diary.findOne({
    $and: [{ date: formatedDate }, { owner: userId }],
  });

  const product = selectedDate.consumedProducts.find(
    (product) => product._id === productId
  );

  if (!selectedDate || !product) {
    throw new NotFound(`Not found`);
  }

  const total = selectedDate.total - product.kcal;
  await Diary.findByIdAndUpdate(selectedDate._id, {
    $pull: { consumedProducts: { _id: productId } },
    $set: { total: total },
  });

  res.json({
    message: `Product was deleted`,
    status: "success",
    code: 200,
    data: {
      product,
    },
  });
};

module.exports = removeProduct;
