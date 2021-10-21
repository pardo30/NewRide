const express = require('express');
const router = express.Router();
const { createProduct, deleteProduct, getProducts, updateProduct, getProduct } = require('../controllers/product.controller');
const auth = require('../middlewares/authorization');
const admin = require('../middlewares/accessAdmin');

router
    .get('/getProducts', getProducts)
    .get('/getProduct/', getProduct)
    .post('/createProduct',admin, createProduct)
    .put('/updateProduct',admin, updateProduct)
    .delete('/deleteProduct',admin, deleteProduct)

    

module.exports = router;