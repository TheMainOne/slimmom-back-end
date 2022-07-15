const {
  diary: { findProductByDateAndUser, createNewDate },
} = require("../../services");

const getInfoPerDate = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.query;

  let result = await findProductByDateAndUser(date, _id);
  if (!result) {
    result = await createNewDate(_id, date);
  }

  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getInfoPerDate;
