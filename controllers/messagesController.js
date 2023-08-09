const {messages}=require("../models/messages");
const{users}=require("../models/users");
const io=require("../app.js");


const sentMessage= async (req,res,next)=>{
    let userId=req.userDetail.userId;
    let socketId=req.body.socketId;
    let message=req.body.message;
    let groupId=req.body.groupId;
  // io.to(socketId).emit("message",{message,})
  
  try{
    let user=await users.findOne({where:{id:userId}})
if(user){
  
  
    await messages.create({
        message:message,
        userId:userId,
        groupId:groupId,
        userName:user.dataValues.name

    });
   
    return res.status(200).json({
        staus:"success",
        userName:user.dataValues.name
    });
}else{
   return res.status(404).json({
        status:"failed",
        errorMessage:"user not found"

    })
}
   
  }catch(err){
if(err){
  console.log(err)
    return res.status(404).json({err})
}
  }
   
}

const getMessages=async (req,res,next)=>{

  let groupId= req.params.groupId;
  let result = await messages.findAll({
    where:{groupId:groupId},    
    order:[["createdAt","ASC"]]
  });

  let allMessages=[];
  for(let each of result){
    let userMessage={};
    userMessage.userName=each.dataValues.userName;
    userMessage.userMessage=each.dataValues.message;
    allMessages.push(userMessage);
  }
  

  return res.status(200).json({
status:"yes",
messages:allMessages,
groupId:groupId

  })
}

module.exports={sentMessage,getMessages}


