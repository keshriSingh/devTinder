const express = require('express');
const { register, login,logout,deleteUser } = require('../controllers/authControllers');
const userMiddleware = require('../middleware/userMiddleware');


const userAuth = express.Router();

userAuth.post('/signup',register);
userAuth.post('/login',login);
userAuth.post('/logout',userMiddleware,logout);
userAuth.delete('/delete',userMiddleware,deleteUser);

module.exports = userAuth;