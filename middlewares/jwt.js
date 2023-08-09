const jwt=require("jsonwebtoken")

async function setJwt(req,res,next){

if(req.userId){

    let userDetail=jwt.sign({userId:req.userId},"mysecretrizz");
    req.userDetail=userDetail;
    next();
}else{
    next();
}


}

async function validateToken(req,res,next){
    try{

        let token=req.headers.authorization;  
    let result= jwt.verify(token,"mysecretrizz");    
    req.userDetail=result;
    next();

    }catch(err){
        if(err){
            req.userDetail={userId:"32321321"}
           return res.status(404).json("error")
        }
        next();
    }
    

}

module.exports={setJwt,validateToken};;