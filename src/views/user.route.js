const express = require('express');
const router = express.Router();
const { register, login, authenticate, userProfil, getAllUser} = require('../controllers/user.controller');
const admin = require('../middlewares/accessAdmin');

router
    .post('/register',admin, register )
    .post('/login', login)
    .get('/authenticate', authenticate)
    .get('/userProfil', userProfil)
    .get('/getAllUsers',admin, getAllUser)


module.exports = router;