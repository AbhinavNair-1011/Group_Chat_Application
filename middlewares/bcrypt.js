const bcrypt=require("bcrypt");
const {users}=require("../models/users");

async function encryptUserPassword(req,res,next){
let password=req.body.password;
let hash= await bcrypt.hash(password,10);
req.hashedPassword=hash;
next();
}

async function validateUserPassword(req,res,next){
    let {email,password}=req.body;
    try{
        const user=await users.findOne({
            where:{email:email}
        });

        if(!user){
            req.userFound=false;
            req.status="failed";
            req.message="user not found"
            next();
        }else{
            req.userFound=true;
                        
        }
        
        let dbPassword = user.dataValues.password;
        let result = await bcrypt.compare(password,dbPassword);
        if(result){
            req.passwordMatched=true;
            req.message="user login authorized"
            req.status="success";
            req.userId=user.dataValues.id;
            next();
        }else{
            req.passwordMatched=false;
            req.message="user login not authorized"
            req.status="failed"
            next();
        }
    }catch(err){
        if(err){
            req.status="internal server error";
        }

    }


}
module.exports={encryptUserPassword,validateUserPassword};