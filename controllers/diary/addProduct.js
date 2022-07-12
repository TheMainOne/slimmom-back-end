const dayjs = require("dayjs");
const { Diary } = require("../../models");
const { findProductById } = require("../../helpers");

const addProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const {
    date,
    product: { _id, weight },
  } = req.body;
  const product = await findProductById(_id);
  const { _id: productId, title, calories } = product;

  const calculatedCalories = calories * (weight / 100);
  const formatedDate = dayjs(date).format("DD-MM-YYYY");
  const newProduct = {
    _id: productId,
    title: {
      ua: title.ua,
      ru: title.ru,
    },
    weight,
    kcal: calculatedCalories,
  };

  const dayInfo = {
    date: formatedDate,
    consumedProducts: [newProduct],
    owner: userId,
  };

  const checkDate = await Diary.findOne({
    $and: [{ date: formatedDate }, { owner: userId }],
  });

  if (checkDate) {
    checkDate.consumedProducts.push(newProduct);
    return await checkDate.save();
  }
  await Diary.create(dayInfo);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      ...newProduct,
    },
  });
};

module.exports = addProduct;
