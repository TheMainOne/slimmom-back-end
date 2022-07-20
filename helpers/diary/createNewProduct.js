const createNewProduct = (productId, title, weight, calories) => {
  const calculatedCalories = Math.round(calories * (weight / 100));

  const product = {
    _id: productId,
    title: {
      ua: title.ua,
      ru: title.ru,
      en: title.en,
    },
    weight,
    kcal: calculatedCalories,
  };
  return product;
};

module.exports = createNewProduct;
