const express = require('express');
const router = express.Router();
const { addOrder, emptyOrder, getOrderByUser, getAllOrder,  } = require('../controllers/order.controller');
const auth = require('../middlewares/authorization');
const admin = require('../middlewares/accessAdmin');

router
    .post('/addOrder',auth, addOrder)
    .get('/getOrderbyUser',auth, getOrderByUser)
    .delete('/emptyOrder',auth, emptyOrder)
    .get('/getAllOrder',admin, getAllOrder)
    

module.exports = router;