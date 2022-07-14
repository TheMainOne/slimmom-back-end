const findProductByBlood = require('./findProductByBlood');
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
      const keyOfCategory = resObj.categories[categories];
      const newProduct = { title, _id };
      const totalInBase = reportOfAllBase[categories];

      if (keyOfCategory) {
        add(keyOfCategory, newProduct);
      }

      if (!keyOfCategory) {
        create(keyOfCategory, newProduct, totalInBase);
      }

      return resObj;
    },
    { categories: {} },
  );

  result.total = products.length;
  return result;
};

function add(key, newProduct) {
  key.products?.push(newProduct);
  key.total += 1;
}

function create(key, newProduct, totalInBase) {
  key = {
    products: [newProduct],
    total: 1,
    totalInBase,
  };
}

module.exports = componentBunnedProduct;
