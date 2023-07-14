const {messages}=require("../models/messages");
const{users}=require("../models/users")


const sentMessage= async (req,res,next)=>{
    let userId=req.userDetail.userId;
    console.log(userId);
  try{
    let user=await users.findOne({where:{id:userId}})
if(user){
    await messages.create({
        message:req.body.message,
        userId:userId
    });
    return res.status(200).json({
        staus:"success"
    });
}else{
   return res.status(404).json({
        status:"failed",
        errorMessage:"user not found"

    })
}
   
  }catch(err){
if(err){
    return res.status(404).json({err})
}
  }
   
}

const getMessages=async (req,res,next)=>{
 
  let result = await messages.findAll();
  let message=[];
  for(let each of result){
    message.push(each.dataValues.message)
  }
  

  return res.status(200).json({
status:"yes",
messages:message

  })
}

module.exports={sentMessage,getMessages}


