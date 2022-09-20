const express = require('express');
const { allProductsServices, idProductServices } = require('../services/productsServices');

const router = express.Router();

router.get('/', allProductsServices);

router.get('/:id', idProductServices);

module.exports = router;