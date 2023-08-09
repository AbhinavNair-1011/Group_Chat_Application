const router=require("express").Router();
const controller=require("../controllers/usersController");
const {encryptUserPassword,validateUserPassword}=require("../middlewares/bcrypt");
const {setJwt,validateToken}=require("../middlewares/jwt");

router.post("/api/add-user",encryptUserPassword,controller.addUser)
router.post("/api/validate-user",validateUserPassword,setJwt,controller.validateUser)
router.get("/api/user-details",validateToken,controller.userDetails);
router.put("/api/update-socket",validateToken,controller.updateSocketId)

module.exports=router;