const prodServ = require('../services/productsServices');
const { error } = require('../middlewares/erros');

const findAllProducts = async (_req, res) => {
  const result = await prodServ.findAllProducts();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await prodServ.findById(id);
  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(result);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const result = await prodServ.insertP(name);
  return res.status(201).json(result);
};

const updateProductC = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await prodServ.productUpdate(name, id);
  if (type) {
    return res.status(error(type)).json({ message });
  }
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await prodServ.deleteProduct(id);
  if (result == null) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).json({ message: '' });
};

const searchProductC = async (req, res) => {
  const { q } = req.query;

  const products = await prodServ.searchProductS(q);
  return res.status(200).json(products);
};

module.exports = {
  findAllProducts,
  findById,
  insert,
  updateProductC,
  deleteProduct,
  searchProductC,
};