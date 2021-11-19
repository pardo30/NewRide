const express = require('express');
const router = express.Router();
const { getAllOrder, checkout } = require('../controllers/order.controller');
const auth = require('../middlewares/authorization');
const admin = require('../middlewares/accessAdmin');

router
    .get('/checkout', auth, checkout)
    .get('/getAllOrder', admin, getAllOrder)


module.exports = router;