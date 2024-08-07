const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")

// router.get("/users", (req,res)=>{
//     res.send("USERS page")
// })

//update user
router.put("/:id", async (req,res)=>{
    if(req.body.userId===req.params.id || req.user.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }catch (err){
                return res.status(500).json(err)
            }
        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id ,{
                $set: req.body
            })
            res.status(200).json("account updated")
        }catch (err){
            return res.status(500).json(err)
        }

    } else{
        return res.status(403).json("You can only update your acc!")
    }
})

//delete a user
router.delete("/:id", async( req,res)=>{
    if(req.body.userId===req.params.id || req.user.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("account has been deleted")
        } catch (err){
            return res.status(500).json(err)
        }
    }
})

//get user
router.get("/" , async(req,res)=>{
    const userId = req.query.userId
    const username = req.query.username
    try{
        const user = userId  ? await User.findById(userId) : await User.findOne({username: username})
        const {password,updatedAt, ...other} = user._doc

        res.status(200).json(other) 
    } catch(err){
        return res.status(500).json(err)
    }
})

//get followings of user
router.get("/followings/:userId", async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId)
        const followings = await Promise.all(
            user.following.map((followingId)=>{
                return User.findById(followingId)
            })
        )
        let followingList = []
        followings.map(following=>{
            const {_id, username, profilePicture} = following
            followingList.push({_id, username, profilePicture})
        })
        res.status(200).json(followingList)
    }catch(err){
        return res.status(500).json(err)
    }
} )


//follow user
router.put("/:id/follow" , async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: { followers: req.body.userId}})
                await currentUser.updateOne({$push: { following: req.params.id}})
                res.status(200).json("User has been followed")
            }else{
                res.status(403).json("you already follow this user")
            }

        } catch(err){
            res.status(500).json(err)
        }
    } else{
        res.status(403).json("you can't follow yourself")
    }
})

//unfollow user

router.put("/:id/unfollow" ,async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser =await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}})
                await currentUser.updateOne({$pull: {following: req.params.id}})
                res.status(200).json("User has been unfollowed")
            }else{
                res.status(403).json("you don't follow this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You can't unfollow yourself")
    }
})
  


module.exports = router