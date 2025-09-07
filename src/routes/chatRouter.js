const express = require('express');
const { sendChat } = require('../controllers/chatControllers');
const userMiddleware = require('../middleware/userMiddleware');

const chatRouter = express.Router();

chatRouter.get('/:targetUserId',userMiddleware,sendChat)

module.exports = chatRouter;