const {groups}=require("../models/groups");
const {userGroups}=require("../models/userGroups");
const {users}=require("../models/users");
const io=require("../app.js");


const addGroup= async(req,res,next)=>{
    let userId=req.userDetail.userId;
    let {groupName,socketId}=req.body
    try{
    let result= await groups.create({
        name:groupName,
        groupAdmin:userId
    })
   
    return res.json({
        status:"success",
        name:result.dataValues.name,
        id:result.dataValues.id
       
    })
}catch(err){
    console.log(err);
}
}

const getGroups= async (req,res,next)=>{
    let result = await groups.findAll({where:{
groupAdmin:req.userDetail.userId
    }});
    let result2=await userGroups.findAll({where:{
        userId:req.userDetail.userId
    }});

   
    let groupNames=[];
    for(let each of result){
        groupNames.push({name:each.dataValues.name,id:each.dataValues.id})
    }
    for(let each of result2){
        groupNames.push({name:each.dataValues.groupName,id:each.dataValues.groupId})
    }
    return res.json({
        status:"success",

        groupNames:groupNames
    }) 
    
}
const addUserToGroup=async(req,res,nest)=>{
    
    let groupAdmin=req.userDetail.userId;
    let userId=req.body.userId;
    let groupId=req.body.groupId;
    let groupName=req.body.gn;
    
    

        try{
            let user=await users.findOne({where:{id:userId}})
            let addedUserName=user.dataValues.name;
            let socketId=user.dataValues.socketId;

            let checkUser=await userGroups.findAll({where:{userId:userId}});
            let flag=false;
            
            for(let each of checkUser){
                if(each.userId==userId && each.groupId==groupId){
                    
                    flag=true;
                }
            }

            if(flag===false){
                if(groupAdmin==userId){

                    return res.status(404).json({
                        status:"failed",
                        message:"user already in group"
                    })
                }else{
                    await userGroups.create({
                        userId:userId,
                        groupId:groupId,
                        groupName:groupName
                    });
                    return res.json({
                        status:"success",
                        name:addedUserName,
                        socketId:socketId,
                    })
                }
              

            }else{
                return res.status(404).json({
                    status:"failed",
                    message:"user already in group"
                })
            }
            
            
            
            
        }catch(err){
          
            if(err){
                console.log(err)
                return res.status(404).json({
                    status:"failed"
                })
            }

        }
 

}
module.exports={addGroup,getGroups,addUserToGroup}