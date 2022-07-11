const { calcDailyNormKkal } = require('../../helpers');
// const { Product } = require('../../models');

const getDailyInfo = ({ user }, res, next) => {
  console.log(user.userData.bloodType);

  // const product =

  //   Product.findOne({ groupBloodNotAllowed:  });

  const dailyKkal = calcDailyNormKkal(user.userData);

  return res.json({ dailyKkal });
};

module.exports = getDailyInfo;
