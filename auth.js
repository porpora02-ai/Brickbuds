const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./User");

// REGISTER
router.post("/register", async (req,res)=>{

    const { username, email, password } = req.body;

    const exists = await User.findOne({ username });

    if(exists){
        return res.json({
            success:false,
            message:"Username already taken"
        });
    }

    const hashed = await bcrypt.hash(password,10);

    const user = new User({
        username,
        email,
        password: hashed
    });

    await user.save();

    res.json({
        success:true,
        message:"Account created"
    });
});

// LOGIN
router.post("/login", async (req,res)=>{

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user){
        return res.json({
            success:false,
            message:"User not found"
        });
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        return res.json({
            success:false,
            message:"Wrong password"
        });
    }

    res.json({
        success:true,
        message:"Login successful"
    });
});

module.exports = router;
