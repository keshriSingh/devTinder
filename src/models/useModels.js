const mongoose = require('mongoose');
const {Schema} = mongoose;

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
        unique:true
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

const User = mongoose.model('User',userSchema);
module.exports = User;