const Joi = require('joi');
// const salesService = require('../models/salesModel');
const { findAll } = require('../models/productsModel');
const salesModels = require('../models/salesModel');
// const { errorSales } = require('./errorSales');

const saleSchemaValidate = Joi.object({
  productId: Joi.number().integer().min(1).required()
    .messages({
      'any.required': '"productId" is required',
      'number.min': '"productId" must be greater than or equal to 1',
    }),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'any.required': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

const saleList = Joi.array().items(saleSchemaValidate);

const saleValidate = (sales) => {
  const { error } = saleList.validate(sales);
  if (error) {
    return {
      type: error.message.includes('required') ? 'errorInvalidFild' : 'errorInvalidValue',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

const verification = async (itemsUpdated) => {
  const productIds = itemsUpdated.map(({ productId }) => productId);
  const products = await findAll(productIds);
  return products.some((product) => !product);
};

const saleValide = async (req, res, next) => {
  const { id } = req.params;
  const saleIdValidate = (await salesModels.findAllById(id)).find((saleId) => saleId);
  if (!saleIdValidate) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

module.exports = {
  saleValidate,
  verification,
  saleValide,
};