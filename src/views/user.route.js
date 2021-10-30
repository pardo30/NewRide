const express = require('express');
const router = express.Router();
const { register, login, authenticate, userProfil, getAllUser, registerAdmin, updatetUserProfil, deleteUserProfil } = require('../controllers/user.controller');
const admin = require('../middlewares/accessAdmin');
const auth = require('../middlewares/authorization');

router
    .post('/register', register)
    .post('/registerAdmin', auth, registerAdmin)
    .post('/login', login)
    .get('/authenticate', authenticate)
    .get('/userProfil', auth, userProfil)
    .get('/getAllUsers', admin, getAllUser)
    .put('/updateUserProfil',auth, updatetUserProfil)
    .delete('/deleteUserProfil',auth, deleteUserProfil)

module.exports = router;