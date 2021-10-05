const express = require('express');
const router = express.Router();
const { register, login, authenticate} = require('../controllers/user.controller');

router
    .post('/register', register )
    .post('/login', login)
    .get('/authenticate', authenticate)


module.exports = router;