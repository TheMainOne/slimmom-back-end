const findProductByBlood = require('./findProductByBlood');
const reportProductByCategories = require('./reportProductByCategories');

const componentBunnedProduct = async blood => {
  const reportOfAllBase = await reportProductByCategories();
  const products = await findProductByBlood({
    blood,
    select: 'title categories',
  });

  const result = products.reduce(
    (resObj, food) => {
      const { categories: prevObj } = resObj;
      const { categories, title, _id } = food;
      const newProduct = { title, _id };

      if (prevObj[categories]) {
        prevObj[categories].products.push(newProduct);
        prevObj[categories].total += 1;
      }

      if (!prevObj[categories]) {
        prevObj[categories] = {
          products: [{ title, _id }],
          total: 1,
          totalInBase: reportOfAllBase[categories],
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
