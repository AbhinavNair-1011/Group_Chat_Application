const bcrypt=require("bcrypt");
async function encryptUserPassword(req,res,next){
let password=req.body.password;
let hash= await bcrypt.hash(password,10);
req.hashedPassword=hash;
next();
}
module.exports=encryptUserPassword;