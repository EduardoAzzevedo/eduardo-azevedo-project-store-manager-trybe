const errorSalesMessage = {
  errorNotFound: 404,
  errorInvalidFild: 400,
  errorinvalidValue: 422,
};

const errorSales = (type) => errorSalesMessage[type];

module.exports = {
  errorSalesMessage,
  errorSales,
};