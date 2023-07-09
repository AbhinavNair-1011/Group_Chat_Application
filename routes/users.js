const router=require("express").Router();
const controller=require("../controllers/usersController");
const {encryptUserPassword,validateUserPassword}=require("../middlewares/bcrypt");
const {setJwt}=require("../middlewares/jwt");

router.post("/api/add-user",encryptUserPassword,controller.addUser)
router.post("/api/validate-user",validateUserPassword,setJwt,controller.validateUser)


module.exports=router;