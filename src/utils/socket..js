const socket = require('socket.io');
const User = require('../models/userModels');
const Chat = require('../models/chatModels');

const initializeSocket = (server)=>{

const io = socket(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

io.on("connection",(socket)=>{
    socket.on("joinChat",async({userId,targetUserId})=>{
        const roomId = [userId,targetUserId].sort().join("_");
        socket.join(roomId);
    }),
    socket.on("sendMessage",async({firstName,userId,targetUserId,chat})=>{
        const roomId = [userId,targetUserId].sort().join("_");

        try {

            let findExistedChat = await Chat.findOne({participant:{ $all:[userId,targetUserId]}}).populate({
            path:'message.senderId',
            select:'firstName photoUrl'
        });

            if(!findExistedChat){
            findExistedChat = await Chat.create({
                    participant:[userId,targetUserId],
                    message:[],
                })
            }
            
            findExistedChat.message.push({
                senderId:userId,
                text:chat,
            })

            await findExistedChat.save();

            const user = await User.findById(userId);
            io.to(roomId).emit("messageReceived",{firstName,userId,photoUrl:user.photoUrl,chat,time:findExistedChat.message.createdAt});
        } catch (error) {
            console.log(error)
        }

    }),
    socket.on("disconnect",()=>{

    })
});

}

module.exports = initializeSocket;