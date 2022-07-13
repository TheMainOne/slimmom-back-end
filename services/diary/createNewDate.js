const { Diary } = require("../../models");
const {
  diary: { formatDate },
} = require("../../helpers");

const createNewDate = async (userId, date) => {
  const formatedDate = formatDate(date);

  const dateInfo = {
    owner: userId,
    date: formatedDate,
    consumedProducts: [],
    total: 0,
  };
  return await Diary.create(dateInfo);
};

module.exports = createNewDate;
