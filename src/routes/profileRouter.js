const express = require('express');
const userMiddleware = require('../middleware/userMiddleware')
const {getProfile,editProfile, forgotPassword} = require('../controllers/profileControllers')

const profileRouter = express.Router();

profileRouter.get('/getProfile',userMiddleware,getProfile);
profileRouter.patch('/profile/edit',userMiddleware,editProfile);
profileRouter.patch('/profile/forgotPassword',userMiddleware,forgotPassword);


module.exports = profileRouter;