const calcDailyNormKkal = ({ currentWeight, height, age, desiredWeight }) => {
  if ((!currentWeight, !height, !age, !desiredWeight)) {
    return null;
  }

  const formula =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  return Math.round(formula);
};

module.exports = calcDailyNormKkal;
