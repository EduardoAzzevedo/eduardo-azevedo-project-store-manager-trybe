const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().empty().required().min(5)
    .messages({
      'string.empty': '"name" is required',
      'any.required': '"name" is required',
      'string.min': '"name" length must be at least 5 characters long',
    }),
});

const productIdError = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().min(1).required()
      .messages({
        'any.required': '400|"productId" is required',
      }),
    quantity: Joi.number().min(1).required().messages({
      'any.required': '400|"quantity" is required',
      'number.min': '422|"quantity" must be greater than or equal to 1',
    }),
  }),
);

module.exports = { productSchema, productIdError };