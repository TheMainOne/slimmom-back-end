const dayjs = require("dayjs");
const { Diary } = require("../../models");
const { NotFound } = require("http-errors");

const getInfoPerDate = async (req, res) => {
  const { _id: userId } = req.user;
  const { date } = req.params;

  const formatedDate = dayjs(date).format("DD-MM-YYYY");
  const result = await Diary.findOne({
    $and: [{ date: formatedDate }, { owner: userId }],
  });

  if (!result) {
    throw new NotFound(`Not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getInfoPerDate;
