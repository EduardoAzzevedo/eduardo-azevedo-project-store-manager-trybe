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

const validateproduct = async (id) => {
  const product = await productsModel.idProducts(id);
  if (!product) return false;
};

const deleteProduct = async (id) => {
  const result = await productsModel.idProducts(id);
  if (!result) return null;
  console.log('delete', result);
  const deleteId = await productsModel.deleteProduct(id);
  return deleteId;
};

module.exports = {
  findAllProducts,
  findById,
  insertP,
  validateproduct,
  deleteProduct,
};