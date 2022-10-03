const routerSales = require('express').Router();
const salesController = require('../controllers/salesController');
const validateFild = require('../middlewares/sales');
const { productId } = require('../middlewares/validateId');

routerSales.get('/', salesController.sales);

routerSales.get('/:id', salesController.byId);

routerSales.post('/', validateFild, productId, salesController.insertSale);

routerSales.delete('/:id', salesController.deleteSaleC);

module.exports = routerSales;