const express = require('express');
const {
  allProductsServices,
  idProductServices,
  createProducServices,
} = require('../services/productsServices');

const router = express.Router();

router.get('/', allProductsServices);

router.get('/:id', idProductServices);

router.post('/', createProducServices);

module.exports = router;