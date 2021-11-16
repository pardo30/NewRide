const express = require('express');
const router = express.Router();
const { getAllOrder, checkout, invoicePayment  } = require('../controllers/order.controller');
const auth = require('../middlewares/authorization');
const admin = require('../middlewares/accessAdmin');

router
    .get('/checkout',auth, checkout)
    .get('/invoiceAndPayment',auth,invoicePayment)
    .get('/getAllOrder',admin, getAllOrder)
    

module.exports = router;