const { Diary } = require("../../models");

const updateDateInfo = async (dateId, productId, total) => {
  return await Diary.findByIdAndUpdate(dateId, {
    $pull: { consumedProducts: { _id: productId } },
    $set: { total: total },
  });
};

module.exports = updateDateInfo;
