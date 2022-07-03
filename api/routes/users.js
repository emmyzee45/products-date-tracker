const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');
const { 
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");
// Update

router.put('/:id', async (req, res) => {
    
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            res.status(200).json(updatedUser);

        } catch(err){

            res.status(500).json(err);
        } 
    } else{
        res.status(401).json("You can update only your account")
    }
    
});

// Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted");
            } catch(err){
                console.log(err)
                res.status(500).json(err);
            } 
        } catch(err){
            res.status(404).json("User not found!")
        }
        
    } else{
        res.status(401).json("You can delete only your account")
    }
    
});

// Get User
 router.get('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others);
    } catch(err){
        res.status(500).json(err);
    }
 })

// Get Users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try{
        const users = query 
            ? await User.find().sort({ _id: -1 }).limit(5) 
            : await User.find();
        const {password,...others} = users._doc;
        res.status(200).json(others);
    } catch(err){
        res.status(500).json(err);
    }
 });

 // Get User Stats

 router.get("/stats", verifyTokenAndAdmin, async (req, res) =>{
    const date = new Date();
    const lastYear = new Date(data.setFullYear(data.getFullYear() - 1));

    try {
        const data =  await User.aggregate([
            { $match: { createdAt: { $gte: lastYear }}},
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json(err);
    }
 })


module.exports = router;