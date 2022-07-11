const { Diary } = require("../../models");

const addProduct = async (req, res) => {
  const { _id } = req.user;
  const result = await Diary.create({
    ...req.body,
    owner: _id,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addProduct;
