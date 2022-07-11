const { calcDailyNormKkal } = require('../../helpers');

const getDailyRate = ({ user }, res, next) => {
  const dailyKkal = calcDailyNormKkal(user.userData);

  return res.json({ dailyKkal });
};

module.exports = getDailyRate;
