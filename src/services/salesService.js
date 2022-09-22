const salesModels = require('../models/salesModel');

const findBy = async () => {
  const result = await salesModels.findBy();
  return result;
};

const findById = async (saleId) => {
  const result = await salesModels.findById(saleId);
  if (result.length === 0) return null;
  return result;
};

const insert = async (name) => {
  const result = await salesModels.insert(name);
  console.log(result);
  return { id: result.insertId, name };
};

module.exports = {
  findBy,
  findById,
  insert,
};