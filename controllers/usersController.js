const { users } = require("../models/users");

const addUser = async (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let phoneNumber = parseInt(req.body.phoneNumber);
  let password = req.hashedPassword;

  try {
    users.create({
      name,
      email,
      phoneNumber,
      password,
    });
    return res.status(200).json({
      status: "success",
      message: "user registered successfully",
    });
  } catch (err) {
    let errorName = err.name;
    let fields = err.errors[0].path;
    let value = err.errors[0].value;

    if ((errorName = "SequelizeUniqueConstraintError")) {
      return res.status(404).json({
        status: "failed",
        message: "duplicate entry",
        errorType: fields,
        errorValue: value,
      });
    }
  }
};

async function validateUser(req, res, next) {
  if (req.userFound) {
    if (req.passwordMatched) {
      

      return res.status(200).json({
          userFound: req.userFound,
          passwordMatched: req.passwordMatched,
          message: req.message,
          status: req.status,
          t:req.userDetail
        });
    } else {
      return res.status(200).json({
        userFound: req.userFound,
        passwordMatched: req.passwordMatched,
        message: req.message,
        status: req.status,
      });
    }
  } else {
    res.status(404).json({
      userFound: req.userFound,
      message: req.message,
      status: req.status,
    });
  }
}
const userDetails=async (req,res,next)=>{

  let userId=req.userDetail.userId;
  let user= await users.findOne({where:{
    id:userId
  }});
  if(user){
    let userName= user.dataValues.name;
    let userId=user.dataValues.id
    return res.json({
       status:"success",
       userName:userName,
       userId:userId
    })

  }else{
    return res.status(404).json({
      status:"failed"
    })
  }


}
const updateSocketId= async(req,res,next)=>{
let userId=req.userDetail.userId;
let socketId=req.body.socketId;

let result = await users.update({
  socketId:socketId
},
{where:{id:userId}})
return res.json({
  status:"updated"
})
}

module.exports = { addUser, validateUser ,userDetails,updateSocketId};
