const express=require('express');
const router=express.Router();
const User=require('../modals/User');
const bcrypt=require('bcrypt');
const Post=require('../modals/Post');
const Comment =require('../modals/Comment');
const verifyToken=require('../verifyToken');
const { route } = require('./auth');


// Create

router.post("/create",verifyToken, async(req,res)=>{
    try{
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// Update
router.put("/:id",verifyToken, async(req,res)=>{
    try{
        const updatedComment=await Comment.findByIdAndUpdate(req.params.id, 
            {$set:reqbody},
            {new:true}
            )
            res.status(200).json(updatedComment)
    }
    catch{
        console.log(err)
        res.status(500).json(err)
    }
})

//Delete
router.delete("/:id",verifyToken, async(req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment has been deleted")
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// Get comment

router.get("/post/:postId", async(req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(comments)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports=router