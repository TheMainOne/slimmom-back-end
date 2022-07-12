const {
  calcDailyNormKkal,
  findProductByBlood,
  putPropsToUserNextReq,
} = require('../../helpers');

const privarR = async ({ user: { userData } }, res, next) => {
  const dailyRate = calcDailyNormKkal(userData);

  const bannedProducts = await findProductByBlood({
    blood: userData.bloodType,
    select: 'title categories',
  });

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

  const bannedProducts = await findProductByBlood({
    blood: userData.bloodType,
    select: 'title categories',
  });

  return res.json({
    status: 'success',
    code: 200,
    results: { dailyRate, bannedProducts },
  });
};

module.exports = { privarR, publicR };
