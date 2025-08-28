const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const userMiddleware = async(req,res,next)=>{
    try {
       const {token} = req.cookies;
       if(!token){
        throw new Error("You are not authenticated");
       }
       const payload = jwt.verify(token,process.env.SECRET_KEY);

       if(!payload){
        throw new Error("You are not authenticated")
       }
       const user = await User.findById(payload._id);
       req.result = user;
      
       next();
    } catch (error) {
        throw new Error("You are not authenticated");
    }
}

module.exports = userMiddleware;