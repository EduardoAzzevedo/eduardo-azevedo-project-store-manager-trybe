const productsModel = require('../../models/productsModel');

const validationId = async (id) => {
  const product = await productsModel.idProducts(id);

  if (!product) return true;
};

module.exports = {
  validationId,
};