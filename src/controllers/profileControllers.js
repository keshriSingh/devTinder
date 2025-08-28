const validateEdits = require('../utils/validateEdits');
const bcrypt = require('bcrypt');

const getProfile = async(req,res)=>{
    try {
        res.status(200).send(req.result);
    } catch (error) {
        res.status(500).send('Error: '+error);
    }
}

const editProfile = async (req,res)=>{
    try {
       validateEdits(req);
       const user = req.result;
       Object.keys(req.body).every((key)=>user[key]=req.body[key]);
       await user.save();
       res.status(200).send(`${user.firstName} your profile edit succesfully`);
        
    } catch (error) {
        res.status(400).send("ERROR: "+error)
    }
}

const forgotPassword = async(req,res)=>{
    try {
        const {oldPassword,newPassword} = req.body;
        const check = await bcrypt.compare(oldPassword,req.result.password);
        if(!check){
            throw new Error("Your old password is wrong");
        }
        const newHashPassword = await bcrypt.hash(newPassword,10);
        req.result.password = newHashPassword;
        await req.result.save();

        res.status(200).send("password changed succesfully");

    } catch (error) {
        res.status(400).send("Error: "+error);
    }
}

module.exports = {getProfile,editProfile,forgotPassword}
