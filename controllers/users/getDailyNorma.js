const { calcDailyNormKkal, componentBunnedProduct } = require("../../helpers");

const privateR = async (req, res, next) => {
  const { body: userData } = req;
  const dailyRate = calcDailyNormKkal(userData);
  const bannedProducts = await componentBunnedProduct(userData.bloodType);
  req.user.userData = { ...userData, dailyRate, bannedProducts };
  res.json({
    status: "success",
    code: 200,
    results: { dailyRate, bannedProducts },
  });
  next();
};

const publicR = async ({ body: userData }, res) => {
  const dailyRate = calcDailyNormKkal(userData);
  const bannedProducts = await componentBunnedProduct(userData.bloodType);

  return res.json({
    status: "success",
    code: 200,
    results: { dailyRate, bannedProducts },
  });
};

module.exports = { privateR, publicR };
