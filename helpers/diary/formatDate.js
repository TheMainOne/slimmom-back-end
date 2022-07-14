const dayjs = require("dayjs");

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

module.exports = formatDate;
