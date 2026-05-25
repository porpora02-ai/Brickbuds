const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const User = require("./User");

router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            username: username
        });

        if (existingUser) {

            return res.json({
                success: false,
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({
            success: true,
            message: "Account created!"
        });

    } catch (err) {

        console.log(err);

        res.json({
            success: false,
            message: "Server error"
        });
    }
});

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({
            username: username
        });

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {

            return res.json({
                success: false,
                message: "Wrong password"
            });
        }

        res.json({
            success: true,
            message: "Login successful!"
        });

    } catch (err) {

        console.log(err);

        res.json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = router;