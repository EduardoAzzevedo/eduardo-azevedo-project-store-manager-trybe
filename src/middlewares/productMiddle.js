const schemas = require('./schemas');

const productMiddle = async (req, res, next) => {
  const validation = schemas.productSchema.validate(req.body);
  if (validation.error) {
    if (validation.error.details[0].type === ('string.empty', 'any.required')) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }
    if (validation.error.details[0].type === 'string.min') {
      return res.status(422).json({ message: validation.error.details[0].message });
    }
  }
  next();
};

module.exports = productMiddle;