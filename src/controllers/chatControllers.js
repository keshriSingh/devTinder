const Chat = require("../models/chatModels");
const Connection = require("../models/connectionModels");

const sendChat = async(req,res)=>{
    try {
    const {targetUserId} = req?.params;
    const userId = req.result?._id;

     const friends = await Connection.findOne({
             $or:[
                {fromUserId:userId,toUserId:targetUserId,status:'accepted'},
                {fromUserId:targetUserId,toUserId:userId,status:'accepted'}
               ]
        })

        if(!friends){  
            return res.status(400).send("you can't send message");
        }

    let findExistedChat = await Chat.findOne({participant:{$all:[userId,targetUserId]}}).populate({
        path:'message.senderId',
        select:'firstName photoUrl'
    });

    if(!findExistedChat){
       findExistedChat =  await Chat.create({
            participant:[userId,targetUserId],
            message:[],
        })
    }
    res.status(200).json({
        data:findExistedChat.message,
    })

    } catch (error) {
        console.log(error)
    }

}

module.exports = {sendChat}