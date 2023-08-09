const router=require("express").Router();
const controller=require("../controllers/groupsController");
const {setJwt,validateToken}=require("../middlewares/jwt");


router.post("/api/add-group",validateToken,controller.addGroup);
router.get("/api/get-groups",validateToken,controller.getGroups);
router.post("/api/add-user-group",validateToken,controller.addUserToGroup);

module.exports=router;