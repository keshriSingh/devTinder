const express = require('express');
const main = require('./config/database');
const userMiddleware = require('./middleware/userAuth');
const User = require('./models/useModels');
const validate = require('./utils/validate');

const app = express();
const port = 4000;

app.use(express.json());

app.get('/user',userMiddleware,async(req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send('Error: '+error);
    }
})

app.get('/getProfile',userMiddleware,async(req,res)=>{
    try {
        res.status(200).send(req.result);
        
    } catch (error) {
        res.status(500).send('Error: '+error);
    }
})

app.post('/signup',async(req,res)=>{
    try {
        validate(req.body);
        await User.create(req.body);
        res.status(201).send("User Created Successfully");
    } catch (error) {
        res.status(500).send('Error: '+error);
    }
})

app.post('/login',userMiddleware,async(req,res)=>{
    try {
        
        res.status(200).send("User Login Succesfully");

    } catch (error) {
        res.status(400).send('Error: '+error);
    }
})

app.patch('/user',userMiddleware,async(req,res)=>{
    try {
        const {emailId,password,...data} = req.body;
        await User.findOneAndUpdate({emailId:emailId},data,{runValidators:true});
        res.status(200).send('User Updated Succesfully');

    } catch (error) {
        res.status(500).send('ERROR: '+error);
    }
})

app.delete('/user',userMiddleware,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.result._id);
        res.status(200).send("User deleted Succesfully")

    } catch (error) {
        res.status(500).send("ERROR: "+error);
    }
})

main()
.then(()=>{
    console.log("DB CONNECETED");
    app.listen(port,()=>{
        console.log('Server Started At '+port)
    })
})
