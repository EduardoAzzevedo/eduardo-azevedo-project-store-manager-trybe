const salesService = require('../services/salesService');
// const { error } = require('../middlewares/erros');
const { errorSales } = require('../middlewares/errorSales');

const insertSale = async (req, res) => {
  const itemsSold = req.body;
  const { type, message } = await salesService.createSale(itemsSold);

  if (type) {
    return res.status(errorSales(type)).json({ message });
  }

  return res.status(201).json(message);
};

const sales = async (req, res) => {
  const { message } = await salesService.getSales();

  return res.status(200).json(message);
};

const byId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.saleById(id);

  if (type) {
    return res.status(errorSales(type)).json({ message });
  }
  return res.status(200).json(message);
};

const deleteSaleC = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);

  if (type) {
    return res.status(errorSales(type)).json({ message });
  }
  return res.status(204).json(message);
};

const updateSaleC = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await salesService.updateSaleS(body, id);

  if (type) {
    return res.status(errorSales(type)).json({ message });
  }
  
  return res.status(200).json(message);
};

module.exports = {
  insertSale,
  sales,
  byId,
  deleteSaleC,
  updateSaleC,
};