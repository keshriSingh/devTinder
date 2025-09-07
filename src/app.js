const express = require('express');
const main = require('./config/database');
const cookieParser = require('cookie-parser');
const userAuth = require('./routes/userAuth');
const profileRouter = require('./routes/profileRouter');
const connectionRouter = require('./routes/connectionRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors');
const http = require('http');
const initializeSocket = require('./utils/socket.');
const chatRouter = require('./routes/chatRouter');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());


app.use('/auth',userAuth);
app.use('/user',profileRouter);
app.use('/request',connectionRouter);
app.use('/connection',userRouter);
app.use('/chat',chatRouter);

const server = http.createServer(app);

initializeSocket(server);

main()
.then(()=>{
    console.log("DB CONNECETED");
    server.listen(port,()=>{
        console.log('Server Started At '+port)
    })
})
