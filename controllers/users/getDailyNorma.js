const { calcDailyNormKkal } = require('../../helpers/user');
const { componentBunnedProduct } = require('../../helpers/user');
const { saveUserDataById } = require('../../services/user');

const privateR = async ({ body: userInfo, user: { _id } }, res, next) => {
  const dailyRate = calcDailyNormKkal(userInfo);
  const bannedProducts = await componentBunnedProduct(userInfo.bloodType);

  saveUserDataById(_id, { ...userInfo, dailyRate, bannedProducts });

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

module.exports = { privateR, publicR };
