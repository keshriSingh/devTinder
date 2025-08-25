const User = require('../models/useModels');
const userMiddleware = async(req,res,next)=>{

    const{emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
        throw new Error('User not found');
    }
    if(user.password!==password){
        throw new Error('User not found');
    }
    req.result = user;
    next();
}

module.exports = userMiddleware;