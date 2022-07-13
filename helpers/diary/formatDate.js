const dayjs = require("dayjs");

const formatDate = (date) => {
  return dayjs(date).format("DD-MM-YYYY");
};

module.exports = formatDate;
