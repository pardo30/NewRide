const express = require('express');
const router = express.Router();
const { addOrder, getAllItems, emptyOrder,  } = require('../controllers/order.controller');
const auth = require('../middlewares/authorization');

router
    .post('/addOrder', addOrder)
    .get('/getOrder', getAllItems)
    .delete('/emptyOrder', emptyOrder)

module.exports = router;