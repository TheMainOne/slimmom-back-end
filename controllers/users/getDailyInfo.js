const {
  calcDailyNormKkal,
  findProductByBlood,
  putPropsToUserNextReq,
} = require('../../helpers');

const privarR = async ({ user: { userData } }, res, next) => {
  const dailyRate = calcDailyNormKkal(userData);

  const bunnedProducts = await findProductByBlood({
    blood: userData.bloodType,
    select: 'title calories',
  });

  putPropsToUserNextReq(userData, { dailyRate, bunnedProducts });
  res.json({ status: 200, results: { dailyRate, bunnedProducts } });
  next();
};

const publicR = async ({ body: userData }, res) => {
  const dailyRate = calcDailyNormKkal(userData);

  const bunnedProducts = await findProductByBlood({
    blood: userData.bloodType,
    select: 'title calories',
  });

  return res.json({ status: 200, results: { dailyRate, bunnedProducts } });
};

module.exports = { privarR, publicR };
