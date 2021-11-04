const express = require('express');
const router = express.Router();
const { addOrder, emptyOrder, getAllOrder, checkout  } = require('../controllers/order.controller');
const auth = require('../middlewares/authorization');
const admin = require('../middlewares/accessAdmin');

router
    //.post('/addOrder',auth, addOrder)
    .get('/checkout',auth, checkout)
    //.delete('/emptyOrder',auth, emptyOrder)
    //.get('/getAllOrder',admin, getAllOrder)
    

module.exports = router;