const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register

router.post('/register', async (req, res) => {
    try{
        
        const newUser = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString(),
        })
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})

// Login
router.post('/login', async (req, res) => {
    const {email, password } = req.body;

    if(!email || !password) return res.status(400).json("All fields are required")
    
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(400).json("Wrong credentials");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        )
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(OriginalPassword !== req.body.password){
            console.log(OriginalPassword, req.body.password)
            return res.status(400).json("Wrong credentials")
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
        );
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;