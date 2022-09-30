const errorMessage = {
  productNotFound: 404,
  productNameNotFound: 400,
  invalidProductName: 422,
  saleNotFound: 404,
};

const error = (type) => errorMessage[type] || 500;

module.exports = {
  errorMessage,
  error,
};