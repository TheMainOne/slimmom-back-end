const { findProductByBlood } = require('../../services/user');
const reportProductByCategories = require('./reportProductByCategories');

const componentBunnedProduct = async blood => {
  const reportOfAllBase = await reportProductByCategories();
  const products = await findProductByBlood({
    blood,
    select: 'title categories',
  });

  if (!products) return null;

  const result = products.reduce(
    (resObj, { categories, title, _id }) => {
      const keyOfCategory = resObj.categories;
      const newProduct = { title, _id };
      const totalInBase = reportOfAllBase[categories];

      if (keyOfCategory[categories]) {
        keyOfCategory[categories].products?.push(newProduct);
        keyOfCategory[categories].total += 1;
      }

      if (!keyOfCategory[categories]) {
        keyOfCategory[categories] = {
          products: [newProduct],
          total: 1,
          totalInBase,
        };
      }

      return resObj;
    },

    { categories: {} },
  );

  result.total = products.length;
  return result;
};

module.exports = componentBunnedProduct;
