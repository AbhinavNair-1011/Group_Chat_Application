const router=require("express").Router();
const controller=require("../controllers/messagesController");
const jwt=require("../middlewares/jwt");

router.post("/api/send-message",jwt.validateToken,controller.sentMessage);
router.get("/api/get-messages",jwt.validateToken,controller.getMessages)


module.exports=router;