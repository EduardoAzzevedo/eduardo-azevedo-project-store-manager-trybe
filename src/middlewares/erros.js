const errorMessage = {
  productNotFound: 404,
  'any.required': 400,
  'string.min': 422,
  saleNotFound: 404,
};

const error = (type) => errorMessage[type] || 500;

module.exports = {
  errorMessage,
  error,
};