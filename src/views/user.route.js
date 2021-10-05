const express = require('express');
const router = express.Router();
const { register, login, authenticate, userProfil} = require('../controllers/user.controller');

router
    .post('/register', register )
    .post('/login', login)
    .get('/authenticate', authenticate)
    .get('/userProfil', userProfil) 


module.exports = router;