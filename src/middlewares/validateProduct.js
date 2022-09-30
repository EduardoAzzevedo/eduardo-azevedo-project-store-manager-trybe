const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

const validateProd = (name) => {
  const { error } = nameSchema.validate({ name });
  if (error) {
    return {
      type: error.details[0].type,
      message: error.message,
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateProd,
};