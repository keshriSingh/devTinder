const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const {connectionRequest,reviewConnectionRequest} = require('../controllers/connectionController');

const connectionRouter = express.Router();

connectionRouter.post('/send/:status/:toUserId',userMiddleware,connectionRequest);
connectionRouter.post('/review/:status/:requestId',userMiddleware,reviewConnectionRequest);

module.exports = connectionRouter;