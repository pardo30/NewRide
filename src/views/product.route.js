const express = require('express');
const router = express.Router();
const { createProduct, deleteProduct, getProducts, updateProduct, getProduct, filterByCategory, filterByPrice, filterByPriceAsc, filterByPriceDesc, filterByText } = require('../controllers/product.controller');
const admin = require('../middlewares/accessAdmin');

router
    .post('/createProduct',admin, createProduct)
    .get('/getProducts', getProducts)
    .get('/getProduct', getProduct)
    .get('/filterByCategory',filterByCategory)
    .get('/filterByText', filterByText)
    .get('/filterByPriceAsc',filterByPriceAsc)
    .get('/filterByPriceDesc',filterByPriceDesc)
    .put('/updateProduct',admin, updateProduct)
    .delete('/deleteProduct',admin, deleteProduct)

    

module.exports = router;