const routerSales = require('express').Router();
const salesController = require('../controllers/salesController');
const validateFild = require('../middlewares/sales');
const { productId } = require('../middlewares/validateId');
const { saleValide } = require('../middlewares/saleUpdateValidate');

routerSales.get('/', salesController.sales);

routerSales.get('/:id', salesController.byId);

routerSales.post('/', validateFild, productId, salesController.insertSale);

routerSales.delete('/:id', salesController.deleteSaleC);

routerSales.put('/:id', validateFild, productId, saleValide, salesController.updateSaleC);

module.exports = routerSales;