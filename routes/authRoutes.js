require('dotenv').config();
const express = require('express');
const bcrypt = require("bcrypt");
const User = require('../models/User')

const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth");


const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    try {
    // Taking username and password send from client side
     const { username, password } = req.body;

     const hashedPassword = await bcrypt.hash(password, 10);

     const user = new User({
        username,
        password: hashedPassword
     })

     await user.save() // This will save the 'user' into our DB

     res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.get("/", (_, res)=> {
    res.send("Auth Routes Working...")
})

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Retrieving that certain user from DB
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;

// Simple Note
    // Some routes should be accessible only if logged in

    // Token is sent in headers