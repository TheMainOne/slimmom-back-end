const {
  calcDailyNormKkal,
  putPropsToUserNextReq,
  componentBunnedProduct,
} = require('../../helpers');

const privarR = async ({ user: { userData } }, res, next) => {
  const dailyRate = calcDailyNormKkal(userData);
  const bannedProducts = await componentBunnedProduct(userData.bloodType);
  putPropsToUserNextReq(userData, { dailyRate, bannedProducts });

  res.json({
    status: 'success',
    code: 200,
    results: { dailyRate, bannedProducts },
  });
  next();
};

const publicR = async ({ body: userData }, res) => {
  const dailyRate = calcDailyNormKkal(userData);
  const bannedProducts = await componentBunnedProduct(userData.bloodType);

  return res.json({
    status: 'success',
    code: 200,
    results: { dailyRate, bannedProducts },
  });
};

module.exports = { privarR, publicR };
