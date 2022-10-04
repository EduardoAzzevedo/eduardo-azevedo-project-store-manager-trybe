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
      type: error.message.includes('required') ? 'errorInvalidFild' : 'errorinvalidValue',
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

const saleValide = (req, res, next) => {
  const { id } = req.params;
  const saleIdValidate = salesModels.findAllById(id).find(({ saleId }) => Number(saleId));
  if (!saleIdValidate) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

// const saleIdValidate = async (req, res, next) => {
//   const sales = await salesModels.findAllById();
//   if (!sales) {
//     return {
//       type: 'errorNotFound', message: 'Sale not found',
//     };
//   }
//   const { id } = req.params;
//   const bodyReq = req.body;
//   const { type, message } = await salesService.updateSaleS(bodyReq, id);

//   if (type) {
//     return res.status(errorSales(type)).json({ message });
//   }
//   return res.status(200).json(message);
// };

module.exports = {
  saleValidate,
  verification,
  saleValide,
};