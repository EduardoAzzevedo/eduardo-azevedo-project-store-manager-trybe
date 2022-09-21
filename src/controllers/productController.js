const prodServ = require('../services/productsServices');

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

module.exports = {
  findAllProducts,
  findById,
  insert,
};