const router = require("express").Router()
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");
router.get("/", isLoggedIn, (req, res)=>{
    console.log("req.session.currentUser in userProfile",
    req.session.currentUser)
    res.render("userProfile")
})

module.exports=router