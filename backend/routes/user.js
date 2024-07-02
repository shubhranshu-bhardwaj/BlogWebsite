const express=require('express');
const router=express.Router();
const User=require('../modals/User');
const bcrypt=require('bcrypt');
const Post=require('../modals/Post');
const Comment =require('../modals/Comment');
const verifyToken=require('../verifyToken')


//Update

router.put("/:id",verifyToken,async(req,res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hashSync(req.body.password,salt);

        }
        const updatedUser=await User.findByIDAndUpdate(req.params.id,
            {$set:req.body},
            {new:true}
            );
            res.status(200).json(updatedUser)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// Delete

router.delete("/:id", verifyToken, async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted")
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// Get user

router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password, ...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports=router