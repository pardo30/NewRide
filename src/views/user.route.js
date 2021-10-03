const express = require('express');
const router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .get('/authenticate', authenticate)
    .get('/showAllUser', showAll)

module.exports = router;