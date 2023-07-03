const {users,Users}=require("../models/users");

const addUser= async (req,res,next)=>{
let name=req.body.name;
let email=req.body.email;
let phoneNumber=parseInt(req.body.phoneNumber);
let password=req.hashedPassword;


let newUser=new Users(name,email,phoneNumber,password)
try{
await newUser.addUser();
return res.status(200).json({
    status:"success",
    message:'user registered successfully'
})
}catch(err){
    let errorName=err.name;
    let fields=err.errors[0].path;
    let value=err.errors[0].value;

    if(errorName="SequelizeUniqueConstraintError"){
        return res.status(404).json({
            status:"failed",
            message:"duplicate entry",
            errorType:fields,
            errorValue:value
        })
      
    }
     
   
}



}

module.exports={addUser}