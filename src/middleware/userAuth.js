const User = require('../models/useModels');
const bcrypt = require('bcrypt');
const userMiddleware = async(req,res,next)=>{

    const{emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
        throw new Error('User not found');
    }
    const correctPassword = await bcrypt.compare(password,user.password);
    if(!correctPassword){
         throw new Error('Invalid');
    }
    req.result = user;
    next();
}

module.exports = userMiddleware;