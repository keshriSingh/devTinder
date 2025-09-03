const validate = require('../utils/validate');
const User = require('../models/userModels');
const bcrypt = require('bcrypt');


const register = async(req,res)=>{
    try {
        validate(req.body);
        req.body.password = await bcrypt.hash(req.body.password,10);
        const user = await User.create(req.body);
        const token = await user.getJwt();
        res.cookie('token',token,{expires: new Date(Date.now() + 3600 * 1000)});
        res.status(201).send(user);
    } catch (error) {   
        res.status(500).send(''+error);
    }
}

const login = async(req,res)=>{
    try {
    const{emailId,password} = req.body;
    if(!emailId){
        throw new Error("Invalid Credentials")
    }
    const user = await User.findOne({emailId:emailId});
    if(!user){
        throw new Error('User not found');
    }
    const correctPassword = await bcrypt.compare(password,user.password);
    if(!correctPassword){
         throw new Error('Invalid Credentials');
    }
    const token = await user.getJwt();
    res.cookie('token',token,{expires: new Date(Date.now() + 3600 * 1000)});
    res.status(200).send(user);

    } catch (error) {
        res.status(400).send(""+error);
    }
}

const logout = async(req,res)=>{
    try {
        res.cookie("token",null,{expires: new Date(Date.now())});
        res.send("Logout Succesfully..");
    } catch (error) {
        res.status(401).send(""+error);
    }
}

const deleteUser = async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.result._id);
        res.status(200).send("User deleted Succesfully")

    } catch (error) {
        res.status(500).send("ERROR: "+error);
    }
}

module.exports = {register,login,logout,deleteUser}