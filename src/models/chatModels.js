const mongoose = require('mongoose');

const {Schema} = mongoose;

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    text:{
        type:String,
        required:true,
    }
},{timestamps:true});

const chatSchema = new Schema({
    participant:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }],
    message:[messageSchema]
},{timestamps:true});

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;