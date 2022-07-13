const { Diary } = require("../../models");
const {
  diary: { formatDate },
} = require("../../helpers");

const findProductByDateAndUser = async (date, userId) => {
  const formatedDate = formatDate(date);
  const dateInfo = await Diary.findOne({
    $and: [{ date: formatedDate }, { owner: userId }],
  });
  return dateInfo;
};

module.exports = findProductByDateAndUser;
