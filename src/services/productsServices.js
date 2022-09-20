const { allProducts, idProducts } = require('../models/productsModel');

const allProductsServices = async (req, res) => {
  const query = await allProducts();
  return res.status(200).json(query);
};

const idProductServices = async (req, res) => {
  const { id } = req.params;
  const query = await idProducts(id);
  if (query) {
    return res.status(200).json(query);
  } return res.status(404).json({
    message: 'Product not found',
  });
};

module.exports = {
  allProductsServices,
  idProductServices,
};