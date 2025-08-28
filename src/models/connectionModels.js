const mongoose = require('mongoose');
const {Schema} = mongoose;

const connetionSchema = new Schema({
    fromUserId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        },
        required:true
    }
})

connetionSchema.index({fromUserId:1,toUserId:1});

connetionSchema.pre('save',async function(){
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("you can't send connection to your self");
    }
})

const Connection = mongoose.model("Connection",connetionSchema);

module.exports = Connection;