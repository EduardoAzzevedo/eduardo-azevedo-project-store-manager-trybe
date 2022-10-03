const productsModel = require('../models/productsModel'); 
const { validateProd } = require('../middlewares/validateProduct');

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

const productUpdate = async (nameUpdate, idUpdate) => {
  const product = await productsModel.idProducts(idUpdate);
  if (!product) {
    return { type: 'productNotFound', message: 'Product not found' };
  }

  const errorM = validateProd(nameUpdate);
  if (errorM.type) return errorM;

  const updateProducts = await productsModel.updateProduct(nameUpdate, idUpdate);
  return { type: null, message: updateProducts };
};

const deleteProduct = async (id) => {
  const result = await productsModel.idProducts(id);
  if (!result) return null;
  const deleteId = await productsModel.deleteProduct(id);
  return deleteId;
};

module.exports = {
  findAllProducts,
  findById,
  insertP,
  validateproduct,
  productUpdate,
  deleteProduct,
};