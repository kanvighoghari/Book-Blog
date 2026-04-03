const express = require("express")
const router  = express.Router();
const auth = require("../middleware/auth")

const userController = require("../controller/userController")


router.post("/signup",userController.userSignUp);
router.post("/login",userController.userLogin);
router.get("/getuser/:id",userController.getUser);
router.delete("/logout",userController.userLogout);

router.get("/me", auth, (req,res)=>{
    res.json({ authenticated: true });
});

module.exports = router;