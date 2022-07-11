const {
  calcDailyNormKkal,
  findProductByBlood,
  putPropsToUserNextReq,
} = require('../../helpers');

const getDailyInfo = async ({ user: { userData } }, res, next) => {
  const dailyRate = calcDailyNormKkal(userData);

  const bunnedProducts = await findProductByBlood({
    blood: userData.bloodType,
    select: 'title calories',
  });

  putPropsToUserNextReq(userData, { dailyRate, bunnedProducts });
  res.json({ status: 200, results: { dailyRate, bunnedProducts } });
  next();
};

module.exports = getDailyInfo;
