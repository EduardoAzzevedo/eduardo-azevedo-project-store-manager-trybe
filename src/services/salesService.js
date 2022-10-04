const salesModels = require('../models/salesModel');

const { insert } = salesModels;
const productsService = require('./productsServices');
const { verification } = require('../middlewares/saleUpdateValidate');

const createSale = async (itemsSold) => {
  const productIds = itemsSold.map(({ productId }) => productId);

  const storedIds = await productsService.findAllProducts();
  const validateId = productIds.every(
    (productId) => storedIds.some(({ id }) => id === productId),
  );

  if (!validateId) {
    return { type: 'errorNotFound', message: 'Product not found' };
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
    return { type: 'errorNotFound', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const sale = await salesModels.findAllById(saleId);

  if (!sale.length) {
    return { type: 'errorNotFound', message: 'Sale not found' };
  }
  const saleToDelete = await salesModels.deleteSaleM(saleId);
  return { type: null, message: saleToDelete };
};

const updateSaleS = async (itemUpdate, saleId) => {
  const sales = await salesModels.findAllById(saleId);
  if (!sales) { return { type: 'errorNotFound', message: 'Sale not found' }; }

  const product = await verification(itemUpdate);
  if (product) {
    return { type: 'errorNotFound', message: 'Product not found' };
  }
  await itemUpdate
    .forEach(({ productId, quantity }) => salesModels.updateSaleM(saleId, productId, quantity));
  return {
    type: null, message: { saleId, itemsUpdated: itemUpdate },
  };
};

module.exports = {
  createSale,
  getSales,
  saleById,
  deleteSale,
  updateSaleS,
};
