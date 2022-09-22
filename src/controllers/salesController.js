const salesService = require('../services/salesService');

const findBy = async (_req, res) => {
  const result = await salesService.findBy();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findById(id);
  if (!result) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(result);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const result = await salesService.insert(name);
  return res.status(201).json(result);
};

module.exports = {
  findBy,
  findById,
  insert,
};