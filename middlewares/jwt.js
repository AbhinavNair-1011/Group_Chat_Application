const jwt=require("jsonwebtoken")

async function setJwt(req,res,next){

if(req.userId){

    let userDetail=jwt.sign({userId:req.userId},"mysecretrizz");
    console.log(userDetail)
    req.userDetail=userDetail;
    next();
}else{
    next();
}


}

module.exports={setJwt};;