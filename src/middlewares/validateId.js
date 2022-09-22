const produtoIdError = require('./schemas');
const productService = require('../services/productsServices');

const validation = (sale) => {
  const isValid = produtoIdError.validate(sale);
  return isValid;
};

const validationProductId = (req, res, next) => {
  const product = [...req.body];
  const { error } = validation(product);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
};

const productId = async (req, res, next) => {
  const data = req.body;
  const result = await Promise.all(
    data.map((sale) => productService.findById(sale.productId)),
  );
  if (result.some((check) => check === false)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validationProductId,
  productId,
};