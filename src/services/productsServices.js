const { allProducts, idProducts, createProduct } = require('../models/productsModel');

const allProductsServices = async (req, res) => {
  const query = await allProducts();
  return res.status(200).json(query);
};

const idProductServices = async (req, res) => {
  const { id } = req.params;
  const query = await idProducts(id);
  if (query) {
    return res.status(200).json(query);
  } return res.status(404).json({ message: 'Product not found' });
};

const createProducServices = async (req, res) => {
  const { name } = req.body;
  const query = await createProduct(name);
  return res.status(201).json(query);
};

module.exports = {
  allProductsServices,
  idProductServices,
  createProducServices,
};