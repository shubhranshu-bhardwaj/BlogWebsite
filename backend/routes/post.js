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
        const newPost=new Post(req.body)
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// Update
router.put("/:id",verifyToken, async(req,res)=>{
    try{
        const updatedPost=await Post.findByIdAndUpdate(req.params.id, 
            {$set:req.body},
            {new:true}
            )
            res.status(200).json(updatedPost)
    }
    catch{
        console.log(err)
        res.status(500).json(err)
    }
})

//Delete
router.delete("/:id",verifyToken, async(req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({PostId:req.params.id})

        res.status(200).json("Post has been deleted")
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// Get post detail

router.get("/:id", async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// Get post

router.get("/", async (req, res) => {
    try {
        const searchFilter = {
            title: { $regex: req.query.search, $options: "i" }
        };
        const posts = await Post.find(req.query.search ? searchFilter : {});
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get user post
router.get("/user/:userid",async(req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userid})
        res.status(200).json(posts)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports=router