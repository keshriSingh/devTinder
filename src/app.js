const express = require('express');

const app = express();
const port = 4000;
app.use('/',(req,res)=>{
    res.send("helllooo");
})

app.use('/chat/all',(req,res)=>{
    res.send("allllllllll")
})

app.use('/chat',(req,res)=>{
    res.send("chatttt")
})



app.listen(port,()=>{
    console.log('Server Started At '+port);
})