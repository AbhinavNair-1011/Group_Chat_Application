const router=require("express").Router();
const controller=require("../controllers/usersController");
const bcryptEncryption=require("../middlewares/bcrypt_encryption")

router.post("/api/add-user",bcryptEncryption,controller.addUser)


module.exports=router;