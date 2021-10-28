const express = require('express');
const router = express.Router();
const { addOrder, getAllItems, emptyOrder,  } = require('../controllers/order.controller');
const auth = require('../middlewares/authorization');

router
    .post('/addOrder',auth, addOrder)
    .get('/getOrder',auth, getAllItems)
    .delete('/emptyOrder',auth, emptyOrder)

module.exports = router;