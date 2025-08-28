const express = require('express');
const main = require('./config/database');
const cookieParser = require('cookie-parser');
const userAuth = require('./routes/userAuth');
const profileRouter = require('./routes/profileRouter');
const connectionRouter = require('./routes/connectionRouter');
const userRouter = require('./routes/userRouter');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());


app.use('/auth',userAuth);
app.use('/user',profileRouter);
app.use('/request',connectionRouter);
app.use('/connection',userRouter);


main()
.then(()=>{
    console.log("DB CONNECETED");
    app.listen(port,()=>{
        console.log('Server Started At '+port)
    })
})
