const express = require('express');
const productController = require('../controllers/productController');
const productMiddle = require('../middlewares/productMiddle');

const router = express.Router();

router.get('/', productController.findAllProducts);

router.get('/:id', productController.findById);

router.post('/', productMiddle, productController.insert);

module.exports = router;