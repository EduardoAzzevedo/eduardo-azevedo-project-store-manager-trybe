const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().empty().required().min(5)
    .messages({
      'string.empty': '"name" is required',
      'any.required': '"name" is required',
      'string.min': '"name" length must be at least 5 characters long',
    }),
});

module.exports = { productSchema };