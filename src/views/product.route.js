const express = require('express');
const router = express.Router();
const { createProduct, deleteProduct, getProducts, updateProduct, getProduct } = require('../controllers/product.controller');
const auth = require('../middlewares/authorization');
const admin = require('../middlewares/accessAdmin')

router
    .get('/getProducts', getProducts)
    .get('/getProduct/', getProduct)
    .post('/createProduct',auth,admin, createProduct)
    .put('/updateProduct',auth,admin, updateProduct)
    .delete('/deleteProduct',auth,admin, deleteProduct)


module.exports = router;