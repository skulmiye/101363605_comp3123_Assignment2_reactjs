const express = require('express');
const UserModel = require('../models/user.js');

const router = express.Router();

// Route to allow user to create a new account
// http://localhost:8082/api/v1/user/signup
router.post("/signup", async (req, res) => {
    try {
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save(); // Save the new user

        res.status(201).send(newUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Route to allow user to login with either email or username
// http://localhost:8082/api/v1/user/login
router.post("/login", async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
    
        const isEmail = usernameOrEmail.includes('@');
    
        let user;
        if (isEmail) {
            user = await UserModel.findOne({ email: usernameOrEmail });
        } else {
            user = await UserModel.findOne({ username: usernameOrEmail });
        }
    
        if (!user) {
            console.log('User not found for:', usernameOrEmail);
            res.status(401).json({ message: 'User not found' });
            return;
        }
    
        const isPasswordValid = user.password === password; // Adjust this based on your password storage mechanism
    
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
    
        const response = {
            status: true,
            username: user.username,
            message: "User logged in successfully"
        };
    
        res.status(200).json(response);
        } catch (error) {
        console.error(error);
        let errorMessage = "Internal server error";
    
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            errorMessage = 'Invalid Username/Email or password';
        }
    
        const response = {
            status: false,
            message: errorMessage
        };
        res.status(500).json(response);

        console.log('Received usernameOrEmail:', usernameOrEmail);
        console.log('Received password:', password);
      
    }
  });
  


module.exports = router;
