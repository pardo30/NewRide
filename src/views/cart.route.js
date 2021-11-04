const express = require('express');
const router = express.Router();
const { getCartByUser, addProduct, deleteProduct } = require('../controllers/cart.controller');
const auth = require('../middlewares/authorization');
const admin = require('../middlewares/accessAdmin');

router
    .post('/addProduct',auth, addProduct)
    .get('/getCart',auth, getCartByUser)
    .delete('/deleteProduct',auth, deleteProduct)    

module.exports = router;