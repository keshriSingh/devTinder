const Connection = require('../models/connectionModels');
const User = require('../models/userModels')

const receivedConnection = async(req,res)=>{
    try {
        const data = await Connection.find({
            toUserId:req.result._id,
            status:"interested"
        }).populate("fromUserId","firstName");
        res.status(200).json({
            msg:"All Connection",
            data
        })
    } catch (error) {
        res.status(400).send("Error: "+error);
    }
}

const connectedUser = async(req,res)=>{
    try {
        const connectionRequest = await Connection.find({
            $or:[
                {fromUserId:req.result._id,status:"accepted"},
                {toUserId:req.result._id,status:"accepted"}
            ]
        }).populate("fromUserId","firstName age").populate("toUserId","firstName age");

        if(!connectionRequest.length){
            return res.status(200).send("No Connection Exist")
        }
        const data = connectionRequest.map((d)=>{
           //i can also use toString();
            if(d.fromUserId._id.equals(req.result._id)){
                return d.toUserId;
            }
            return d.fromUserId;
        })
        res.status(200).json({
            msg:"All Connection",
            data
        })
       
    } catch (error) {
        res.status(400).send("Error: "+error);
    }
}

const feed = async(req,res)=>{
    try {

        const page = parseInt(req.query.page)||1;
        let limit = parseInt(req.query.limit)||10;
        console.log(req.query)

        limit = limit>20?20:limit;
        const skip = (page-1)*limit;

        //find connections of the user that is loggedIn
        const connectionRequest = await Connection.find({
            $or:[
                {fromUserId:req.result._id},
                {toUserId:req.result._id}
            ]
        }).select('fromUserId toUserId');

        const hideUserFeed = new Set();

        connectionRequest.forEach((key)=>{
            hideUserFeed.add(key.fromUserId.toString());
            hideUserFeed.add(key.toUserId.toString());
        })

        const user = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFeed)}},
                {_id:{$ne:req.result._id}}
            ]
        }).select("firstName age").skip(skip).limit(limit);
        //pagination

        res.status(200).send(user);

        
    } catch (error) {
     res.status(400).send('Error: '+error);
    }
}

module.exports = {receivedConnection,connectedUser,feed};