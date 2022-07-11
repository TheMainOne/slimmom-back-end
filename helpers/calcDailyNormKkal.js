const calcDailyNormKkal = ({ currentWeight, height, age, desiredWeight }) => {
  return (
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight)
  );
};

module.exports = calcDailyNormKkal;
