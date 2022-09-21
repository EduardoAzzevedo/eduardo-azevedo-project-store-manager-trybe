const productsModel = require('../models/productsModel');

const findAllProducts = async () => {
  const result = await productsModel.findAll();
  return result;
};

const findById = async (id) => {
  const result = await productsModel.idProducts(id);

  if (!result) return null;
  return result;
};

// const insert = async (name) => {
//   const result = await productsModel.insert(name);
//   return result;
// };

module.exports = {
  findAllProducts,
  findById,
  // insert,
};