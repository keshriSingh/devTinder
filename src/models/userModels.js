const mongoose = require('mongoose');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        immutable:true,
    },
    age:{
        type:Number,
        min:16,
        max:70,
    },
    password:{
        type:String, 
        required:true,
    },
    gender:{
        type:String,
        enum:["male","female","other"],
    }

},{timestamps:true})

userSchema.methods.getJwt = async function () {
     const token =  jwt.sign({_id:this._id,emailId:this.emailId},process.env.SECRET_KEY,{expiresIn:3600});
     return token;
}

const User = mongoose.model('User',userSchema);
module.exports = User;