const salesModels = require('../models/salesModel');

const { insert } = salesModels;

const productsService = require('./productsServices');

const createSale = async (itemsSold) => {
  const productIds = itemsSold.map(({ productId }) => productId);

  const storedIds = await productsService.findAllProducts();

  const validateId = productIds.every(
    (productId) => storedIds.some(({ id }) => id === productId),
  );

  if (!validateId) {
    return { type: 'productNotFound', message: 'Product not found' };
  }

  const id = await insert.dataVenda();

  itemsSold.forEach(async ({ productId, quantity }) => {
    await insert.itemVendido(id, productId, quantity);
  });

  return { type: null, message: { id, itemsSold } };
};

const getSales = async () => {
  const sales = await salesModels.findAll();
  return { type: null, message: sales };
};

const saleById = async (saleId) => {
  const sale = await salesModels.findAllById(saleId);

  if (!sale.length) {
    return { type: 'saleNotFound', message: 'Sale not found' };
  }

  return { type: null, message: sale };
};

module.exports = {
  createSale,
  getSales,
  saleById,
};
