const express = require('express');
const router = express.Router();
const { createProduct, deleteProduct, getProducts, updateProduct, getProduct, filterByCategory, filterByPrice, filterByPriceAsc, filterByPriceDesc, filterByText } = require('../controllers/product.controller');
const admin = require('../middlewares/accessAdmin');

router
    .get('/getProducts', getProducts)
    .get('/getProduct', getProduct)
    .post('/createProduct',admin, createProduct)
    .put('/updateProduct',admin, updateProduct)
    .delete('/deleteProduct',admin, deleteProduct)
    .get('/filterByCategory',filterByCategory)
    .get('/filterByText', filterByText)
    .get('/filterByPriceAsc',filterByPriceAsc)
    .get('/filterByPriceDesc',filterByPriceDesc)

    

module.exports = router;