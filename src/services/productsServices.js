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

const insertP = async (name) => {
  const result = await productsModel.insert(name);
  return { id: result.insertId, name };
};

module.exports = {
  findAllProducts,
  findById,
  insertP,
};