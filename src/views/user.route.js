const express = require('express');
const router = express.Router();
const { register, login, authenticate, userProfil, getAllUser} = require('../controllers/user.controller');

router
    .post('/register', register )
    .post('/login', login)
    .get('/authenticate', authenticate)
    .get('/userProfil', userProfil)
    .get('/getAllUsers', getAllUser)


module.exports = router;