const express = require('express');
const router = express.Router();
const { register, login, authenticate, userProfil, getAllUser, registerAdmin, updatetUserProfil, deleteUserProfil } = require('../controllers/user.controller');
const { getUserOrder } = require('../controllers/order.controller');
const admin = require('../middlewares/accessAdmin');
const auth = require('../middlewares/authorization');

router
    .post('/register', register)
    .post('/registerAdmin', admin, registerAdmin)
    .post('/login', login)
    .get('/userProfil', auth, userProfil)
    .get('/getAllUsers', admin, getAllUser)
    .get('/orders',auth, getUserOrder)
    .put('/updateUserProfil',auth, updatetUserProfil)
    .delete('/deleteUserProfil',auth, deleteUserProfil)

module.exports = router;