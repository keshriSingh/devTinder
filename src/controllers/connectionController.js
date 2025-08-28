const User = require("../models/userModels");
const Connection = require('../models/connectionModels')


const connectionRequest = async(req,res)=>{
    try {
        const allowedStatus = ["ignore","interested"];
        const {status,toUserId} = req.params;
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status Type");
        }
        
        // if(req.result._id.equals(toUserId)){
        //     throw new Error("you can't send connection to your self");
        // }

        const user = await User.findById(toUserId);
        if(!user){
            throw new Error("User not found");
        }

        const existingRequest = await Connection.findOne({
            $or:[
                {fromUserId:req.result._id,toUserId:toUserId},
                {fromUserId:toUserId,toUserId:req.result._id}
            ]
        })

        if(existingRequest){
            throw new Error("Connection allready exists");
        }

        const data = await Connection.create({
            fromUserId:req.result._id,
            toUserId:toUserId,
            status:status
        })

        res.status(201).json({
            msg:`${status==="interested"? req.result.firstName+" is interested in "+user.firstName : req.result.firstName+" ignored "+user.firstName}`,
            data
        })

    } catch (error) {
        res.status(400).send("Error: "+error);
    }
}

const reviewConnectionRequest = async(req,res)=>{
    try {
        const {status,requestId} = req.params;
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status Type");
        }
        const findConnection = await Connection.findOne({
            _id:requestId,
            toUserId:req.result._id,
            status:"interested"
        }).populate('fromUserId','firstName');
        
        if(!findConnection){
            throw new Error("Not Found Connection");
        };
        findConnection.status = status;
        const data = await findConnection.save();

        res.status(201).json({
            msg:`Connection ${status} from ${findConnection.fromUserId.firstName}`,
            data
        })
        
    } catch (error) {
        res.status(400).send('Error: '+error);
    }
}

module.exports = {connectionRequest,reviewConnectionRequest};