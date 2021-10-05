const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/product.controller');

router
    .post('/createProduct', createProduct)


module.exports = router;