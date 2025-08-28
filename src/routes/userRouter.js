const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const { receivedConnection, connectedUser, feed } = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.get('/user/request/received',userMiddleware,receivedConnection);
userRouter.get('/user/connected',userMiddleware,connectedUser);
userRouter.get('/user/feed',userMiddleware,feed)

module.exports = userRouter;