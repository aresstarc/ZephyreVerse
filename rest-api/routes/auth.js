const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

router.post("/register",async (req,res)=>{   
    try{
        //hashing the password using bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        
        //creating a user and assigning the hashed pass
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        //saving the user and responding 
        const user = await newUser.save()
        res.status(200).json()
    } catch(err){
        res.status(500).json(err)
    }
})

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong passowrd")

        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
})
  
router.get("/users", (req,res)=>{
    res.send("Auth USERS page")
})

module.exports = router