const router = require ("express").Router()
const User = require ("../models/User.model")
const bcrypt = require ("bcryptjs")
const async = require("hbs/lib/async")


const signUp = (req, res) => res.render("auth/signup")

router.get("/signup", signUp)

router.post("/signup", async (req, res)=>{
    const { email, password } = req.body
    
    if(!password || !email){
        const errorMessage = `Password or email are not valid`
        return res.render("auth/signup",{errorMessage});
        
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    if (!regex.test(password)){
        return res.render("auth/signup", {
            errorMessage: `Password needs to be eight characters long, use lower and upper cases and digits`,
        })
    }
    try{
        const findUser= await User.findOne({email})
        if(findUser){
        const errorMessage = `You are already registered`
        res.render("auth/signup",{errorMessage})
        return
        }
    const salt = bcrypt.genSaltSync(12);
    const hashedPass=bcrypt.hashSync(password, salt);
    const createUser= await User.create({
        email,
        password: hashedPass,
    })
    const objectUser = createUser.toOject()
    delete objectUser.password
    req.session.currentUser = createUser
    console.log("req.session.currentUser", req.session.currentUser)
    res.redirect("/auth/signin")
}catch(e){
    console.log(e)
}
})
router.get('/signin', (req, res) =>{
    res.render("auth/signin")
})
router.post("/signin", async (req, res) =>{
    const { email, password } = req.body
    if (!email || !password) {
		return res.render("auth/signin", {
			errorMessage: "Please provide an email and a password",
		})
	}
try {
    const findUser = await User.findOne({ email })
    if (!findUser){
        return res.render("auth/signin", {
            errorMessage: "Wrong credentials",
        })
    }
    const checkPass = bcrypt.compareSync (password, findUser.password)
if (!checkPass){
    res.render ("auth/signin", {
        errorMessage:"Wrong credentials",
    })
}
const objectUser = findUser.toOject()
delete objectUser.password
req.session.currentUser =objectUser

return res.redirect("/")
} 
catch (error) {
    next (error)
}
})
router.get("/logout", (req, res, next) => {
    req.session.destroy();
    res.redirect("/auth/signin");
  });

module.exports = router