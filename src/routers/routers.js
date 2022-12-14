const express = require('express');
const productController = require('../controllers/productController');
const productMiddle = require('../middlewares/productMiddle');

const router = express.Router();

router.get('/search', productController.searchProductC);

router.get('/', productController.findAllProducts);

router.get('/:id', productController.findById);

router.post('/', productMiddle, productController.insert);

router.put('/:id', productController.updateProductC);

router.delete('/:id', productController.deleteProduct);

module.exports = router;