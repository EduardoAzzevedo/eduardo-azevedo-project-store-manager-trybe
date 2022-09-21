const express = require('express');
const salesController = require('../controllers/salesController');

const routerSales = express.Router();

routerSales.get('/', salesController.findBy);

routerSales.get('/:id', salesController.findById);

// routerSales.post('/', salesController.insert);

module.exports = routerSales;