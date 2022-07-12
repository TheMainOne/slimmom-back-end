const dayjs = require("dayjs");
const { NotFound } = require("http-errors");
const { Diary } = require("../../models");

const removeProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const { _id: productId, date } = req.params;

  const formatedDate = dayjs(date).format("DD-MM-YYYY");

  const result = await Diary.findOne({
    $and: [{ date: formatedDate }, { owner: userId }],
  });
  // const result = await Diary.findByIdAndRemove({
  //   $and: [{ date: formatedDate }, { owner: userId }, { _id: productId }],
  // });
  console.log(result);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json({
    message: "Product deleted",
  });
};

module.exports = removeProduct;
