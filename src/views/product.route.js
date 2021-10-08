const express = require('express');
const router = express.Router();
const { createProduct, deleteProduct, getProducts } = require('../controllers/product.controller');

router
    .get('/getProducts', getProducts)
    .post('/createProduct', createProduct)
    .delete('/deleteProduct', deleteProduct)


module.exports = router;